"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, Shield, Layers, BarChart3, Wallet, ArrowRightLeft, Sparkles, Zap, LineChart, CircleDollarSign, Boxes, PieChart, Cpu, Globe, Activity, BarChart, Diamond, Database, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import DotPattern from "@/components/ui/dot-pattern"
import DisplayCards from "@/components/ui/display-cards"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black overflow-hidden">
      {/* Header */}
      <header className="border-b border-[#1A1A1A] bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-polkadot-pink to-polkadot-purple glow-border-pink relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 cyber-grid-small"></div>
              <span className="text-lg font-bold text-white relative z-10">OY</span>
            </div>
            <span className="text-xl font-bold text-white glow-text-pink">ORBIT<span className="text-polkadot-cyan glow-text">YIELD</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-polkadot-cyan transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-polkadot-cyan transition-colors">
              How It Works
            </Link>
            <Link href="#benefits" className="text-sm font-medium text-gray-300 hover:text-polkadot-cyan transition-colors">
              Tokenomics
            </Link>
            <Link href="#faq" className="text-sm font-medium text-gray-300 hover:text-polkadot-cyan transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-md border-[#1a1a1a] bg-black/60 text-polkadot-cyan hover:bg-black/80 hover:border-polkadot-cyan transition-all">
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="rounded-md bg-gradient-to-r from-polkadot-pink to-polkadot-purple hover:opacity-90 text-white relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-polkadot-cyan to-polkadot-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center">Connect Wallet <Wallet className="ml-2 h-4 w-4" /></span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="web3-dark-gradient py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 hexagon-pattern opacity-40"></div>
        <div className="absolute w-full h-full cyber-grid opacity-20"></div>
        <div className="absolute top-1/3 left-1/4 w-1/3 h-64 bg-polkadot-cyan/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1/3 h-64 bg-polkadot-pink/20 rounded-full blur-[120px]"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-polkadot-cyan/30 bg-gradient-to-r from-black/40 to-polkadot-cyan/10 text-xs font-medium text-polkadot-cyan glow-text mb-2">
                <Cpu className="mr-1 h-3 w-3" /> Web3 Native Yield Optimizer
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-white">The World's First</span> <span className="text-polkadot-cyan glow-text">Web3-Native</span> <span className="text-polkadot-pink glow-text-pink">Yield Platform</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                Built to track every click, every conversion, and every user - even on privacy-conscious blockchains.
              </p>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col items-center border border-[#1a1a1a] bg-black/40 backdrop-blur-sm rounded-lg p-3 glow-border">
                  <div className="text-polkadot-cyan glow-text font-mono text-2xl font-bold">25%+</div>
                  <div className="text-xs text-gray-400 mt-1">Higher APY</div>
                </div>
                <div className="flex flex-col items-center border border-[#1a1a1a] bg-black/40 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-polkadot-pink glow-text-pink font-mono text-2xl font-bold">10+</div>
                  <div className="text-xs text-gray-400 mt-1">Blockchains</div>
                </div>
                <div className="flex flex-col items-center border border-[#1a1a1a] bg-black/40 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-white font-mono text-2xl font-bold">100k+</div>
                  <div className="text-xs text-gray-400 mt-1">Active Users</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/dashboard">
                  <Button className="w-full sm:w-auto web3-button bg-gradient-to-r from-polkadot-pink/20 to-polkadot-purple/20 border-polkadot-pink/30 hover:border-polkadot-pink group">
                    <span className="relative z-10 flex items-center font-medium">Connect Wallet <Wallet className="ml-2 h-4 w-4 text-polkadot-pink group-hover:text-polkadot-cyan transition-colors" /></span>
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" className="w-full sm:w-auto web3-button text-gray-300 hover:text-white">
                    <span className="relative z-10 flex items-center">Learn More <ChevronRight className="ml-1 h-4 w-4" /></span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-[450px] glow-border rounded-lg overflow-hidden p-1 backdrop-blur-sm">
                <div className="absolute -left-4 top-1/3 w-8 h-8 bg-polkadot-cyan rounded-full blur-xl opacity-60"></div>
                <div className="absolute -right-4 top-2/3 w-8 h-8 bg-polkadot-pink rounded-full blur-xl opacity-60"></div>
                
                <div className="w-full h-full bg-black/80 rounded-lg overflow-hidden relative border border-[#1a1a1a]">
                  {/* Cyber grid background */}
                  <div className="absolute inset-0 cyber-grid opacity-20"></div>
                  
                  {/* Analytics dashboard */}
                  <div className="absolute inset-0 flex flex-col p-6">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-polkadot-pink to-polkadot-purple flex items-center justify-center">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">OrbitYield Protocol</div>
                          <div className="text-sm font-bold text-white">Advanced Analytics</div>
                        </div>
                      </div>
                      
                      <div className="bg-green-500/20 text-green-500 text-xs rounded-full px-2 py-1 flex items-center">
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></div> Network Active
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-black/60 backdrop-blur-sm border border-[#1a1a1a] rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Total Value Locked</div>
                        <div className="text-2xl font-bold text-white flex items-end">
                          $87.5M <span className="text-xs text-green-400 ml-2 mb-1">+12.4%</span>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Polkadot</span>
                            <span>42%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                            <div className="h-full bg-polkadot-pink glow-effect-pink rounded-full" style={{ width: "42%" }}></div>
                          </div>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Ethereum</span>
                            <span>38%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                            <div className="h-full bg-polkadot-purple glow-effect rounded-full" style={{ width: "38%" }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-black/60 backdrop-blur-sm border border-[#1a1a1a] rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-1">Average APY Rate</div>
                        <div className="text-2xl font-bold text-polkadot-cyan glow-text flex items-end">
                          24.8% <span className="text-xs text-green-400 ml-2 mb-1">+3.2%</span>
                        </div>
                        <div className="mt-3">
                          <div className="relative h-16">
                            {/* Simplified chart */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end">
                              <div className="flex-1 h-[30%] bg-gradient-to-t from-polkadot-pink/50 to-transparent rounded-sm mx-0.5"></div>
                              <div className="flex-1 h-[45%] bg-gradient-to-t from-polkadot-pink/50 to-transparent rounded-sm mx-0.5"></div>
                              <div className="flex-1 h-[40%] bg-gradient-to-t from-polkadot-pink/50 to-transparent rounded-sm mx-0.5"></div>
                              <div className="flex-1 h-[60%] bg-gradient-to-t from-polkadot-pink/50 to-transparent rounded-sm mx-0.5"></div>
                              <div className="flex-1 h-[75%] bg-gradient-to-t from-polkadot-cyan/50 to-transparent rounded-sm mx-0.5"></div>
                              <div className="flex-1 h-[65%] bg-gradient-to-t from-polkadot-cyan/50 to-transparent rounded-sm mx-0.5"></div>
                              <div className="flex-1 h-[80%] bg-gradient-to-t from-polkadot-cyan/50 to-transparent rounded-sm mx-0.5"></div>
                              <div className="flex-1 h-[90%] bg-gradient-to-t from-polkadot-cyan/50 to-transparent rounded-sm mx-0.5"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-black/60 backdrop-blur-sm border border-[#1a1a1a] rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs text-gray-400">Connected Wallet</div>
                        <div className="font-mono text-xs bg-[#1a1a1a] px-2 py-1 rounded-md">0x1a2b...3f4b</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <div className="p-2 bg-gradient-to-br from-[#1a1a1a] to-black border border-[#333] rounded-lg">
                            <Image src="/polkadot-logo.png" alt="Polkadot" width={24} height={24} />
                          </div>
                          <div className="p-2 bg-gradient-to-br from-[#1a1a1a] to-black border border-[#333] rounded-lg">
                            <Image src="/eth-logo.png" alt="Ethereum" width={24} height={24} />
                          </div>
                          <div className="p-2 bg-gradient-to-br from-[#1a1a1a] to-black border border-[#333] rounded-lg">
                            <Image src="/cosmos-logo.png" alt="Cosmos" width={24} height={24} />
                          </div>
                          <div className="text-gray-500 text-sm">+7 more</div>
                        </div>
                        
                        <Link href="/dashboard">
                          <Button className="bg-gradient-to-r from-polkadot-pink to-polkadot-purple hover:opacity-90 text-white text-xs">
                            View Dashboard
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-80 bg-polkadot-purple/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-80 bg-polkadot-pink/10 rounded-full blur-[100px]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="relative mx-auto max-w-max mb-6">
              <span className="absolute inset-0 rounded-full blur-md bg-polkadot-pink/20"></span>
              <span className="relative block rounded-full bg-polkadot-pink/20 px-3 py-1 text-sm font-medium text-polkadot-pink">
                <Sparkles className="inline-block h-4 w-4 mr-1" />Powerful Features
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-polkadot-pink mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              OrbitYield brings powerful features to help you maximize your yield farming returns
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="polkadot-card flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-polkadot-pink/10 flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-polkadot-pink" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cross-Chain Yield Optimization</h3>
              <p className="text-muted-foreground">
                Automatically identifies and allocates funds to the best yield opportunities across blockchains.
              </p>
            </div>
            <div className="polkadot-card flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-polkadot-pink/10 flex items-center justify-center mb-4">
                <ArrowRightLeft className="h-6 w-6 text-polkadot-pink" />
              </div>
              <h3 className="text-xl font-bold mb-2">Auto-Rebalancing Strategies</h3>
              <p className="text-muted-foreground">
                Dynamically moves funds based on real-time APY changes to maximize your returns.
              </p>
            </div>
            <div className="polkadot-card flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-polkadot-pink/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-polkadot-pink" />
              </div>
              <h3 className="text-xl font-bold mb-2">Risk Assessment Scoring</h3>
              <p className="text-muted-foreground">
                AI-powered evaluation of liquidity pools to help mitigate risks and protect your assets.
              </p>
            </div>
            <div className="polkadot-card flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-polkadot-pink/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-polkadot-pink" />
              </div>
              <h3 className="text-xl font-bold mb-2">LP Token Staking & Rewards</h3>
              <p className="text-muted-foreground">
                Earn extra yield through staking your LP tokens for additional rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted relative overflow-hidden">
        <DotPattern width={30} height={30} cx={15} cy={15} cr={1} className="opacity-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="relative mx-auto max-w-max mb-6">
              <span className="absolute inset-0 rounded-full blur-md bg-polkadot-purple/20"></span>
              <span className="relative block rounded-full bg-polkadot-purple/20 px-3 py-1 text-sm font-medium text-polkadot-purple">
                <Zap className="inline-block h-4 w-4 mr-1" />Simple Process
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-polkadot-pink mb-4">How OrbitYield Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform simplifies yield farming across multiple blockchains
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 border border-border relative">
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-polkadot-pink text-white flex items-center justify-center font-bold text-lg">1</div>
              <h3 className="text-xl font-bold mb-4 mt-2">Deposit Assets</h3>
              <p className="text-muted-foreground mb-4">
                Connect your wallet and deposit your assets into OrbitYield's smart contracts.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-polkadot-pink" />
                  <span>Multiple blockchain support</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-polkadot-pink" />
                  <span>Support for various tokens</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-polkadot-pink" />
                  <span>Secure transaction processing</span>
                </li>
              </ul>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border relative">
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-polkadot-pink text-white flex items-center justify-center font-bold text-lg">2</div>
              <h3 className="text-xl font-bold mb-4 mt-2">Auto-Allocation</h3>
              <p className="text-muted-foreground mb-4">
                Our platform automatically allocates your funds to the highest-yielding opportunities.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-polkadot-pink" />
                  <span>AI-powered decision making</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-polkadot-pink" />
                  <span>Real-time APY tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-polkadot-pink" />
                  <span>Risk-adjusted yield optimization</span>
                </li>
              </ul>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border relative">
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-polkadot-pink text-white flex items-center justify-center font-bold text-lg">3</div>
              <h3 className="text-xl font-bold mb-4 mt-2">Earn & Withdraw</h3>
              <p className="text-muted-foreground mb-4">
                Earn yield across multiple chains and withdraw your assets with earned returns at any time.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-polkadot-pink" />
                  <span>Track your portfolio growth</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-polkadot-pink" />
                  <span>Flexible withdrawal options</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-polkadot-pink" />
                  <span>Compound or claim rewards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-96 bg-polkadot-pink/10 rounded-full blur-[120px]"></div>
        <DotPattern width={40} height={40} cx={20} cy={20} cr={1} className="opacity-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="relative mx-auto max-w-max mb-6">
              <span className="absolute inset-0 rounded-full blur-md bg-polkadot-pink/20"></span>
              <span className="relative block rounded-full bg-polkadot-pink/20 px-3 py-1 text-sm font-medium text-polkadot-pink">
                <LineChart className="inline-block h-4 w-4 mr-1" />Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-polkadot-pink mb-4">Why Choose OrbitYield?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Built on Polkadot's powerful interoperability framework, OrbitYield offers unique advantages for DeFi users.
            </p>
          </div>
          
          <DisplayCards cards={[
            {
              icon: <CircleDollarSign className="size-4 text-polkadot-pink" />,
              title: "Higher Returns",
              description: "Earn more with optimized strategies",
              date: "Up to 25% APY",
              iconClassName: "text-polkadot-pink",
              titleClassName: "text-polkadot-pink",
              className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[40%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0"
            },
            {
              icon: <Shield className="size-4 text-polkadot-purple" />,
              title: "Enhanced Security",
              description: "Risk assessment and mitigation",
              date: "Industry-leading protocols",
              iconClassName: "text-polkadot-purple",
              titleClassName: "text-polkadot-purple",
              className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[40%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0"
            },
            {
              icon: <ArrowRightLeft className="size-4 text-polkadot-cyan" />,
              title: "Cross-Chain Ease",
              description: "Seamless asset management",
              date: "Multiple blockchains",
              iconClassName: "text-polkadot-cyan",
              titleClassName: "text-polkadot-cyan",
              className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10"
            }
          ]} />
          
          <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-polkadot-pink mb-4">Why Choose OrbitYield?</h2>
              <p className="text-lg text-muted-foreground">
                Built on Polkadot's powerful interoperability framework, OrbitYield offers unique advantages for DeFi users.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-polkadot-pink text-white flex items-center justify-center mt-1">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold">Seamless Cross-Chain Experience</h3>
                    <p className="text-sm text-muted-foreground">
                      No need to manually bridge assets or monitor multiple DeFi platforms across different chains.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-polkadot-pink text-white flex items-center justify-center mt-1">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold">Lower Transaction Costs</h3>
                    <p className="text-sm text-muted-foreground">
                      Leverage Polkadot's scalable architecture to minimize gas fees and transaction costs.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-polkadot-pink text-white flex items-center justify-center mt-1">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold">Enhanced Security Model</h3>
                    <p className="text-sm text-muted-foreground">
                      Built with Polkadot's robust security framework, ensuring your assets are protected across all chains.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-polkadot-pink text-white flex items-center justify-center mt-1">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold">Smart Risk Management</h3>
                    <p className="text-sm text-muted-foreground">
                      AI-powered risk assessment helps protect your investments from high-risk protocols.
                    </p>
                  </div>
                </li>
              </ul>
              <Link href="/dashboard">
                <Button className="mt-4 rounded-full bg-polkadot-pink text-white hover:bg-polkadot-purple transition-all">
                  Start Earning Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 polkadot-gradient opacity-10 rounded-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="w-full max-w-md bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-polkadot-pink/20">
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold">Yield Comparison</h3>
                        <p className="text-sm text-muted-foreground">Average APY comparison</p>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-polkadot-pink"></div>
                              <span className="font-medium">OrbitYield Optimized</span>
                            </div>
                            <span className="font-bold">12.8%</span>
                          </div>
                          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-polkadot-pink rounded-full" style={{ width: "100%" }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-polkadot-purple"></div>
                              <span className="font-medium">Polkadot Average</span>
                            </div>
                            <span className="font-bold">8.3%</span>
                          </div>
                          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-polkadot-purple rounded-full" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-polkadot-cyan"></div>
                              <span className="font-medium">Ethereum Average</span>
                            </div>
                            <span className="font-bold">5.1%</span>
                          </div>
                          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-polkadot-cyan rounded-full" style={{ width: "40%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-polkadot-pink/10 border border-polkadot-pink/20">
                        <p className="text-sm">
                          <span className="font-bold">OrbitYield advantage:</span> Earn up to 148% more yield compared to single-chain strategies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="polkadot-gradient py-20 text-white relative overflow-hidden">
        <DotPattern width={15} height={15} cx={7.5} cy={7.5} cr={1} className="opacity-20" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-32 bg-polkadot-pink/30 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/2 h-32 bg-polkadot-purple/30 rounded-full blur-[80px]"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="relative mx-auto border border-white/10 rounded-2xl backdrop-blur-sm bg-white/5 p-8 md:p-12 max-w-4xl">
            <div className="absolute -left-2 -top-2 h-4 w-4 bg-polkadot-pink text-white rounded-full shadow-lg shadow-polkadot-pink/50"></div>
            <div className="absolute -bottom-2 -left-2 h-4 w-4 bg-polkadot-pink text-white rounded-full shadow-lg shadow-polkadot-pink/50"></div>
            <div className="absolute -right-2 -top-2 h-4 w-4 bg-polkadot-pink text-white rounded-full shadow-lg shadow-polkadot-pink/50"></div>
            <div className="absolute -bottom-2 -right-2 h-4 w-4 bg-polkadot-pink text-white rounded-full shadow-lg shadow-polkadot-pink/50"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Ready to Maximize Your DeFi Returns?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 text-center">
              Join thousands of users who are already benefiting from OrbitYield's cross-chain yield optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button className="w-full sm:w-auto rounded-full bg-white text-polkadot-pink hover:bg-opacity-90 transition-all px-8 py-6 text-lg">
                  Launch App
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12 relative overflow-hidden">
        <DotPattern width={30} height={30} cx={15} cy={15} cr={0.8} className="opacity-5" />
        <div className="absolute bottom-0 right-0 w-1/3 h-40 bg-polkadot-purple/5 rounded-full blur-[80px]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-polkadot-pink">
                  <span className="text-lg font-bold text-white">OY</span>
                </div>
                <span className="text-xl font-bold">ORBITYIELD</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A cross-chain yield optimizer built on Polkadot, maximizing your DeFi returns across multiple blockchains.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-polkadot-pink transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-polkadot-pink transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-polkadot-pink transition-colors">
                    Yield Farms
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-polkadot-pink transition-colors">
                    Risk Analysis
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-polkadot-pink transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-polkadot-pink transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-polkadot-pink transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-polkadot-pink transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-polkadot-pink transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-polkadot-pink transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-polkadot-pink transition-colors">
                    Telegram
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-polkadot-pink transition-colors">
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <div className="flex justify-center space-x-4 mb-4">
              <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center border border-border hover:border-polkadot-pink hover:text-polkadot-pink transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </div>
              <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center border border-border hover:border-polkadot-pink hover:text-polkadot-pink transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </div>
              <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center border border-border hover:border-polkadot-pink hover:text-polkadot-pink transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><circle cx="17.5" cy="6.5" r="1.5"></circle></svg>
              </div>
              <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center border border-border hover:border-polkadot-pink hover:text-polkadot-pink transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12"></path><path d="M4 14h9"></path><path d="M4 18h9"></path><path d="M18 15v-2"></path><path d="M18 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M21 10a2 2, 0 0 1-2 2h-2a2 2 0 0 1-2-2"></path><path d="M21 6v8a5 5 0 0 1-5 5H4"></path></svg>
              </div>
            </div>
            <p>© 2025 OrbitYield. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
