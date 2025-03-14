const axios = require('axios');
const { ethers } = require('ethers');
const ProtocolAdapter = require('./ProtocolAdapter');
const logger = require('../../config/logger');
const apyCalculationService = require('../../utils/apyCalculationService');

// Compound contract ABIs (simplified versions)
const cTokenABI = [
  "function mint(uint256 mintAmount) external returns (uint256)",
  "function redeem(uint256 redeemTokens) external returns (uint256)",
  "function redeemUnderlying(uint256 redeemAmount) external returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function exchangeRateCurrent() external returns (uint256)",
  "function exchangeRateStored() external view returns (uint256)",
  "function supplyRatePerBlock() external view returns (uint256)",
  "function borrowRatePerBlock() external view returns (uint256)",
  "function underlying() external view returns (address)"
];

const comptrollerABI = [
  "function markets(address cToken) external view returns (bool isListed, uint256 collateralFactorMantissa, bool isComped)",
  "function getAccountLiquidity(address account) external view returns (uint256 error, uint256 liquidity, uint256 shortfall)",
  "function claimComp(address holder) external",
  "function compAccrued(address holder) external view returns (uint256)"
];

const erc20ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

// Chain providers configuration
const chainProviders = {
  '1': 'https://eth-mainnet.alchemyapi.io/v2/YOUR_ALCHEMY_KEY', // Ethereum
  '137': 'https://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY', // Polygon
  '42161': 'https://arb-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY' // Arbitrum
};

// Compound addresses for different chains
const compoundAddresses = {
  '1': {
    comptroller: '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B',
    // cTokens will be fetched from the API
  },
  // Compound is primarily on Ethereum mainnet, but we can add other chains as they expand
};

// API endpoints for Compound data
const compoundApiEndpoints = {
  markets: 'https://api.compound.finance/api/v2/ctoken'
};

// Blocks per day for different chains (approximate)
const blocksPerDay = {
  '1': 6570, // Ethereum (13s block time)
  '137': 43200, // Polygon (2s block time)
  '42161': 175000 // Arbitrum (0.5s block time)
};

/**
 * Compound Protocol Adapter
 * Provides integration with Compound lending protocol
 */
class CompoundAdapter extends ProtocolAdapter {
  /**
   * Constructor
   * @param {Object} config - Configuration for the adapter
   */
  constructor(config = {}) {
    super(config);
    this.name = 'CompoundAdapter';
    this.supportedChains = ['1']; // Primarily Ethereum
    this.compoundVersion = config.version || 'v2';
    this.cTokens = {}; // Cache for cToken addresses
  }

  /**
   * Gets a provider for the specified chain
   * @param {string} chainId - Chain ID
   * @returns {ethers.providers.JsonRpcProvider} - Provider for the chain
   * @private
   */
  _getProvider(chainId) {
    if (!this.supportsChain(chainId)) {
      throw new Error(`Chain ${chainId} not supported by Compound adapter`);
    }

    const providerUrl = chainProviders[chainId];
    return new ethers.providers.JsonRpcProvider(providerUrl);
  }

  /**
   * Gets the comptroller contract for a specific chain
   * @param {string} chainId - Chain ID
   * @returns {ethers.Contract} - Comptroller contract
   * @private
   */
  _getComptrollerContract(chainId) {
    const provider = this._getProvider(chainId);
    const comptrollerAddress = compoundAddresses[chainId].comptroller;
    
    return new ethers.Contract(comptrollerAddress, comptrollerABI, provider);
  }

  /**
   * Gets a cToken contract instance
   * @param {string} chainId - Chain ID
   * @param {string} cTokenAddress - cToken address
   * @returns {ethers.Contract} - cToken contract
   * @private
   */
  _getCTokenContract(chainId, cTokenAddress) {
    const provider = this._getProvider(chainId);
    return new ethers.Contract(cTokenAddress, cTokenABI, provider);
  }

  /**
   * Fetches cToken data from Compound API
   * @param {string} chainId - Chain ID
   * @returns {Promise<Array>} - Array of cToken data
   * @private
   */
  async _fetchCTokenData(chainId) {
    try {
      // Only Ethereum is fully supported by the official API
      if (chainId !== '1') {
        throw new Error(`Compound API does not support chain ${chainId}`);
      }

      const response = await axios.get(compoundApiEndpoints.markets);
      
      // Update cToken cache
      const cTokens = response.data.cToken;
      this.cTokens[chainId] = {};
      
      for (const cToken of cTokens) {
        this.cTokens[chainId][cToken.underlying_symbol] = {
          address: cToken.token_address,
          underlyingAddress: cToken.underlying_address,
          symbol: cToken.symbol,
          decimals: parseInt(cToken.decimals)
        };
      }
      
      return cTokens;
    } catch (error) {
      logger.error(`Error fetching Compound cToken data for chain ${chainId}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Calculates APY from supply rate per block
   * @param {string} supplyRatePerBlock - Supply rate per block (as BigNumber string)
   * @param {string} chainId - Chain ID
   * @returns {number} - Annual Percentage Yield
   * @private
   */
  _calculateApyFromSupplyRate(supplyRatePerBlock, chainId) {
    try {
      const supplyRatePerBlockBN = ethers.BigNumber.from(supplyRatePerBlock);
      const blocksPerYear = blocksPerDay[chainId] * 365;
      
      // Convert to ethers.js fraction with 18 decimals
      const supplyRatePerBlockDecimal = parseFloat(
        ethers.utils.formatUnits(supplyRatePerBlockBN, 18)
      );
      
      // Calculate APY using the compound interest formula
      // APY = (1 + rate per block)^blocks per year - 1
      return apyCalculationService.calculateApy(supplyRatePerBlockDecimal, blocksPerYear);
    } catch (error) {
      logger.error(`Error calculating APY from supply rate: ${error.message}`);
      return 0;
    }
  }

  /**
   * Gets yield opportunities from Compound
   * @param {string} chainId - Chain ID to query
   * @returns {Promise<Array>} - Array of yield opportunities
   */
  async getYieldOpportunities(chainId) {
    try {
      if (!this.supportsChain(chainId)) {
        return [];
      }

      // Fetch cToken data from API
      const cTokenData = await this._fetchCTokenData(chainId);
      const comptroller = this._getComptrollerContract(chainId);
      
      const opportunities = [];
      
      for (const cToken of cTokenData) {
        try {
          // Skip non-listed markets or markets with issues
          if (cToken.supply_rate.value === "0") {
            continue;
          }
          
          // Get on-chain market data
          const cTokenContract = this._getCTokenContract(chainId, cToken.token_address);
          const marketData = await comptroller.markets(cToken.token_address);
          
          if (!marketData.isListed) {
            continue;
          }
          
          // Create yield opportunity object
          const opportunity = {
            name: `Compound ${cToken.underlying_symbol} Supply`,
            asset: cToken.underlying_address || ethers.constants.AddressZero, // For CETH, use AddressZero
            assetName: cToken.underlying_name,
            assetSymbol: cToken.underlying_symbol,
            assetDecimals: parseInt(cToken.underlying_decimals),
            assetAddress: cToken.underlying_address || ethers.constants.AddressZero,
            chainId,
            apy: {
              current: parseFloat(cToken.supply_rate.value) * 100, // Convert from decimal to percentage
              min7d: 0,
              max7d: 0,
              mean7d: 0
            },
            tvlUsd: parseFloat(cToken.total_supply.value) * parseFloat(cToken.underlying_price.value),
            riskLevel: 'low', // Compound is generally considered low risk
            strategyType: 'lending',
            implementationDetails: {
              contractAddress: cToken.token_address,
              approvalAddress: cToken.token_address,
              adapter: this.name,
              methodName: 'mint',
              withdrawMethodName: 'redeem',
              extraData: {
                version: this.compoundVersion,
                collateralFactor: ethers.utils.formatUnits(marketData.collateralFactorMantissa, 18),
                isComped: marketData.isComped
              }
            },
            depositFee: 0, // Compound doesn't charge deposit fees
            withdrawalFee: 0, // Compound doesn't charge withdrawal fees
            harvestable: marketData.isComped, // If market is comped, COMP rewards can be harvested
            compoundable: true, // Interest automatically compounds
            autocompounding: true,
            tags: ['lending', 'supply', 'compound', this.compoundVersion],
            liquidityProfile: {
              lockTime: 0, // No lock time for Compound deposits
              withdrawalWindow: 'anytime',
              unlockTime: null
            },
            status: 'active'
          };
          
          opportunities.push(opportunity);
        } catch (error) {
          logger.error(`Error processing Compound market ${cToken.symbol}: ${error.message}`);
          // Continue with next cToken
        }
      }
      
      return opportunities;
    } catch (error) {
      logger.error(`Error getting Compound yield opportunities for chain ${chainId}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Gets APY data for a specific Compound opportunity
   * @param {Object} opportunity - Yield opportunity object
   * @returns {Promise<Object>} - APY data
   */
  async getApyData(opportunity) {
    try {
      const { chainId, implementationDetails } = opportunity;
      
      // Get cToken contract
      const cTokenContract = this._getCTokenContract(chainId, implementationDetails.contractAddress);
      
      // Get current supply rate per block (on-chain)
      const supplyRatePerBlock = await cTokenContract.supplyRatePerBlock();
      
      // Calculate current APY
      const currentApy = this._calculateApyFromSupplyRate(supplyRatePerBlock, chainId);
      
      // For historical APY, we would ideally fetch from an API or database
      // Here we're estimating based on current rate
      
      return {
        current: currentApy,
        min7d: currentApy * 0.9, // Approximate based on current rate
        max7d: currentApy * 1.1,
        mean7d: currentApy,
        min30d: currentApy * 0.85,
        max30d: currentApy * 1.15,
        mean30d: currentApy
      };
    } catch (error) {
      logger.error(`Error getting Compound APY data: ${error.message}`);
      throw error;
    }
  }

  /**
   * Gets TVL for a specific Compound opportunity
   * @param {Object} opportunity - Yield opportunity object
   * @returns {Promise<number>} - TVL in USD
   */
  async getTvl(opportunity) {
    try {
      const { chainId, asset, implementationDetails } = opportunity;
      
      // Get cToken contract
      const cTokenContract = this._getCTokenContract(chainId, implementationDetails.contractAddress);
      
      // Get total supply of cTokens
      const totalSupply = await cTokenContract.totalSupply();
      
      // Get exchange rate
      const exchangeRateStored = await cTokenContract.exchangeRateStored();
      
      // Calculate total underlying
      const totalUnderlying = totalSupply.mul(exchangeRateStored).div(ethers.BigNumber.from(10).pow(18));
      
      // Get underlying price (would need a price oracle in a real implementation)
      // For simplicity, we're using a placeholder price of $1 for all assets
      const price = 1;
      
      return parseFloat(ethers.utils.formatUnits(totalUnderlying, opportunity.assetDecimals)) * price;
    } catch (error) {
      logger.error(`Error getting Compound TVL: ${error.message}`);
      throw error;
    }
  }

  /**
   * Deposits assets into a Compound market
   * @param {Object} opportunity - Yield opportunity object
   * @param {Object} params - Deposit parameters
   * @returns {Promise<Object>} - Transaction data
   */
  async deposit(opportunity, params) {
    try {
      const { chainId, asset, assetDecimals, implementationDetails } = opportunity;
      const { amount, userAddress, privateKey, gasPrice, gasLimit } = params;
      
      // Initialize provider and signer
      const provider = this._getProvider(chainId);
      const wallet = new ethers.Wallet(privateKey, provider);
      
      // Get cToken contract with signer
      const cTokenContract = new ethers.Contract(
        implementationDetails.contractAddress,
        cTokenABI,
        wallet
      );
      
      // For ETH (cETH), handle differently
      if (asset === ethers.constants.AddressZero) {
        // Direct deposit with ETH
        const mintTx = await cTokenContract.mint(
          { value: amount, gasPrice, gasLimit: gasLimit || 250000 }
        );
        
        // Wait for transaction to be mined
        const receipt = await mintTx.wait();
        
        return {
          transactionHash: receipt.transactionHash,
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed.toString(),
          status: receipt.status === 1 ? 'success' : 'failed'
        };
      }
      
      // For ERC20 tokens, we need to approve first
      const tokenContract = new ethers.Contract(
        asset,
        erc20ABI,
        wallet
      );
      
      // Check if approval is needed
      const allowance = await tokenContract.allowance(userAddress, implementationDetails.contractAddress);
      if (allowance.lt(amount)) {
        const approvalTx = await tokenContract.approve(
          implementationDetails.contractAddress,
          ethers.constants.MaxUint256,
          { gasPrice, gasLimit: gasLimit || 100000 }
        );
        await approvalTx.wait();
        logger.info(`Approved Compound cToken for asset ${opportunity.assetSymbol}`);
      }
      
      // Deposit into the cToken contract
      const mintTx = await cTokenContract.mint(
        amount,
        { gasPrice, gasLimit: gasLimit || 250000 }
      );
      
      // Wait for transaction to be mined
      const receipt = await mintTx.wait();
      
      return {
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: receipt.status === 1 ? 'success' : 'failed'
      };
    } catch (error) {
      logger.error(`Error depositing to Compound: ${error.message}`);
      throw error;
    }
  }

  /**
   * Withdraws assets from a Compound market
   * @param {Object} investment - Investment object
   * @param {Object} params - Withdrawal parameters
   * @returns {Promise<Object>} - Transaction data
   */
  async withdraw(investment, params) {
    try {
      const { opportunity, walletAddress } = investment;
      const { amount, privateKey, gasPrice, gasLimit, redeemType = 'underlying' } = params;
      const { chainId, implementationDetails } = opportunity;
      
      // Initialize provider and signer
      const provider = this._getProvider(chainId);
      const wallet = new ethers.Wallet(privateKey, provider);
      
      // Get cToken contract with signer
      const cTokenContract = new ethers.Contract(
        implementationDetails.contractAddress,
        cTokenABI,
        wallet
      );
      
      let withdrawTx;
      
      if (redeemType === 'underlying') {
        // Withdraw exact amount of underlying token
        withdrawTx = await cTokenContract.redeemUnderlying(
          amount,
          { gasPrice, gasLimit: gasLimit || 250000 }
        );
      } else {
        // Withdraw by cToken amount
        withdrawTx = await cTokenContract.redeem(
          amount,
          { gasPrice, gasLimit: gasLimit || 250000 }
        );
      }
      
      // Wait for transaction to be mined
      const receipt = await withdrawTx.wait();
      
      return {
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: receipt.status === 1 ? 'success' : 'failed'
      };
    } catch (error) {
      logger.error(`Error withdrawing from Compound: ${error.message}`);
      throw error;
    }
  }

  /**
   * Gets current balance of a Compound investment
   * @param {Object} investment - Investment object
   * @returns {Promise<Object>} - Balance data
   */
  async getBalance(investment) {
    try {
      const { opportunity, walletAddress } = investment;
      const { chainId, assetDecimals, implementationDetails } = opportunity;
      
      // Get cToken contract
      const cTokenContract = this._getCTokenContract(chainId, implementationDetails.contractAddress);
      
      // Get cToken balance
      const cTokenBalance = await cTokenContract.balanceOf(walletAddress);
      
      // Get current exchange rate
      const exchangeRateStored = await cTokenContract.exchangeRateStored();
      
      // Calculate underlying amount
      const underlyingBalance = cTokenBalance
        .mul(exchangeRateStored)
        .div(ethers.BigNumber.from(10).pow(18));
      
      // Format underlying balance
      const formattedBalance = ethers.utils.formatUnits(underlyingBalance, assetDecimals);
      
      // Calculate USD value (would need a price oracle in a real implementation)
      const price = 1; // Placeholder price in USD
      const balanceUsd = parseFloat(formattedBalance) * price;
      
      return {
        cTokenBalance: cTokenBalance.toString(),
        amount: underlyingBalance.toString(),
        amountFormatted: formattedBalance,
        amountUsd: balanceUsd
      };
    } catch (error) {
      logger.error(`Error getting Compound investment balance: ${error.message}`);
      throw error;
    }
  }

  /**
   * Harvests COMP rewards from an investment
   * @param {Object} investment - Investment object
   * @returns {Promise<Object>} - Harvest transaction data
   */
  async harvest(investment) {
    try {
      const { opportunity, walletAddress } = investment;
      const { chainId, implementationDetails } = opportunity;
      
      // Check if the market is comped (eligible for COMP rewards)
      if (!implementationDetails.extraData.isComped) {
        return {
          status: 'not_applicable',
          message: 'This market is not eligible for COMP rewards'
        };
      }
      
      // Initialize provider and signer
      const provider = this._getProvider(chainId);
      const wallet = new ethers.Wallet(investment.privateKey, provider);
      
      // Get comptroller contract with signer
      const comptroller = new ethers.Contract(
        compoundAddresses[chainId].comptroller,
        comptrollerABI,
        wallet
      );
      
      // Check accrued COMP rewards
      const compAccrued = await comptroller.compAccrued(walletAddress);
      
      if (compAccrued.eq(0)) {
        return {
          status: 'no_rewards',
          message: 'No COMP rewards available to claim'
        };
      }
      
      // Claim COMP rewards
      const claimTx = await comptroller.claimComp(walletAddress);
      const receipt = await claimTx.wait();
      
      return {
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: receipt.status === 1 ? 'success' : 'failed',
        compClaimed: ethers.utils.formatUnits(compAccrued, 18) // COMP has 18 decimals
      };
    } catch (error) {
      logger.error(`Error harvesting COMP rewards: ${error.message}`);
      throw error;
    }
  }

  /**
   * Compounds yield for a Compound investment (not applicable as interest compounds automatically)
   * @param {Object} investment - Investment object
   * @returns {Promise<Object>} - Compound transaction data
   */
  async compound(investment) {
    try {
      // For Compound, compounding is not necessary since interest compounds automatically
      logger.info(`Compounding not needed for Compound as interest compounds automatically`);
      return {
        status: 'not_applicable',
        message: 'Compound interest compounds automatically, no manual compounding needed'
      };
    } catch (error) {
      logger.error(`Error in Compound compound operation: ${error.message}`);
      throw error;
    }
  }

  /**
   * Gets transaction status
   * @param {string} chainId - Chain ID
   * @param {string} txHash - Transaction hash
   * @returns {Promise<Object>} - Transaction status
   */
  async getTransactionStatus(chainId, txHash) {
    try {
      const provider = this._getProvider(chainId);
      const tx = await provider.getTransaction(txHash);
      
      if (!tx) {
        return { status: 'not_found' };
      }
      
      if (!tx.blockNumber) {
        return { status: 'pending' };
      }
      
      const receipt = await provider.getTransactionReceipt(txHash);
      
      return {
        status: receipt.status === 1 ? 'success' : 'failed',
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        confirmations: tx.confirmations
      };
    } catch (error) {
      logger.error(`Error getting transaction status: ${error.message}`);
      throw error;
    }
  }

  /**
   * Validates an investment address
   * @param {Object} opportunity - Yield opportunity object
   * @param {string} address - Address to validate
   * @returns {Promise<boolean>} - True if address is valid for this protocol
   */
  async validateAddress(opportunity, address) {
    try {
      // Check if address is a valid Ethereum address
      return ethers.utils.isAddress(address);
    } catch (error) {
      logger.error(`Error validating address: ${error.message}`);
      return false;
    }
  }

  /**
   * Gets gas cost estimate for a transaction
   * @param {string} chainId - Chain ID
   * @param {string} methodName - Contract method name
   * @param {Array} params - Method parameters
   * @returns {Promise<Object>} - Gas estimate data
   */
  async estimateGas(chainId, methodName, params) {
    try {
      const provider = this._getProvider(chainId);
      
      // Get cToken contract
      const cTokenContract = this._getCTokenContract(chainId, params.cTokenAddress);
      
      let gasEstimate;
      
      switch (methodName) {
        case 'mint':
          if (params.asset === ethers.constants.AddressZero) {
            // For ETH (cETH)
            gasEstimate = await cTokenContract.estimateGas.mint({
              value: params.amount
            });
          } else {
            // For ERC20 tokens
            gasEstimate = await cTokenContract.estimateGas.mint(params.amount);
          }
          break;
        case 'redeem':
          gasEstimate = await cTokenContract.estimateGas.redeem(params.amount);
          break;
        case 'redeemUnderlying':
          gasEstimate = await cTokenContract.estimateGas.redeemUnderlying(params.amount);
          break;
        default:
          throw new Error(`Method ${methodName} not supported for gas estimation`);
      }
      
      // Get current gas price
      const gasPrice = await provider.getGasPrice();
      
      // Calculate cost in ETH
      const costWei = gasEstimate.mul(gasPrice);
      const costEth = ethers.utils.formatEther(costWei);
      
      return {
        gasEstimate: gasEstimate.toString(),
        gasPrice: gasPrice.toString(),
        costWei: costWei.toString(),
        costEth
      };
    } catch (error) {
      logger.error(`Error estimating gas: ${error.message}`);
      throw error;
    }
  }
}

module.exports = CompoundAdapter;
