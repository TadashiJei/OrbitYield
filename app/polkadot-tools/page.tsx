"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PalletInterface } from "@/components/polkadot/pallet-interface";
import { XcmInterface } from "@/components/polkadot/xcm-interface";
import { PalletTestSuite } from "@/components/polkadot/pallet-test-suite";
import { usePolkadot } from "@/hooks/use-polkadot";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, Info } from "lucide-react";

export default function PolkadotToolsPage() {
  const { isConnected, api, selectedAccount, error: connectionError } = usePolkadot();
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainInfo, setChainInfo] = useState<{name: string} | null>(null);
  const [activeTab, setActiveTab] = useState("pallet");
  const [connectionMessage, setConnectionMessage] = useState<string | null>(null);

  useEffect(() => {
    // Set connecting state
    setIsConnecting(!isConnected && !connectionError);
    
    // Try to get chain info when connected
    const getChainInfo = async () => {
      if (isConnected && api) {
        try {
          const chain = await api.rpc.system.chain();
          setChainInfo({ name: chain.toString() });
        } catch (err) {
          console.error("Error getting chain info:", err);
        }
      }
    };
    
    getChainInfo();
  }, [isConnected, api, connectionError]);

  useEffect(() => {
    if (isConnecting) {
      setConnectionMessage("Connecting to Polkadot network...");
    } else if (connectionError) {
      setConnectionMessage(`Connection error: ${connectionError.message}`);
    } else if (isConnected && api && chainInfo) {
      setConnectionMessage(`Connected to ${chainInfo.name}`);
    } else {
      setConnectionMessage("Not connected to any Polkadot network");
    }
  }, [isConnecting, isConnected, connectionError, api, chainInfo]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Polkadot Tools</h1>
        <p className="text-muted-foreground">
          Tools for interacting with Polkadot pallets, testing, and XCM integration
        </p>
        
        {connectionMessage && (
          <div className="flex items-center space-x-2 mt-2">
            {isConnecting ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : isConnected ? (
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                Not Connected
              </Badge>
            )}
            <span className="text-sm text-muted-foreground">{connectionMessage}</span>
          </div>
        )}

        {connectionError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{connectionError.message}</AlertDescription>
          </Alert>
        )}
        
        {isConnected && selectedAccount && (
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm text-muted-foreground">Active Account:</span>
            <Badge variant="outline" className="font-mono text-xs">
              {selectedAccount.address ? 
                `${selectedAccount.address.slice(0, 6)}...${selectedAccount.address.slice(-6)}` : 
                "Unknown Address"}
            </Badge>
          </div>
        )}

        {!isConnected && !isConnecting && (
          <Alert className="mt-2">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Please connect to a Polkadot network using the wallet connection button in the header to fully utilize these tools.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="pallet">Pallet Interface</TabsTrigger>
          <TabsTrigger value="xcm">XCM Interface</TabsTrigger>
          <TabsTrigger value="tests">Test Suite</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="pallet">
            <PalletInterface />
          </TabsContent>
          
          <TabsContent value="xcm">
            <XcmInterface />
          </TabsContent>
          
          <TabsContent value="tests">
            <PalletTestSuite />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
