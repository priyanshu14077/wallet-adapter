import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { Settings as SettingsIcon, Info, Globe, Zap, Shield, Copy, Check, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const networkInfo = {
  name: 'Solana Mainnet',
  rpc: 'mainnet.helius-rpc.com',
  chainId: 101,
  explorer: 'https://solscan.io',
};

const appInfo = {
  version: '1.0.0',
  build: '2024.04.18',
  framework: 'Bun + React 19',
};

export function Settings() {
  const { publicKey } = useWallet();
  const [copied, setCopied] = useState(false);

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-emerald-400 via-white to-violet-400 bg-clip-text text-transparent">
            Settings
          </span>
        </h1>
        <p className="text-white/60 text-lg">
          Configure your wallet preferences and view network details
        </p>
      </motion.div>

      {/* Wallet Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="relative overflow-hidden border-white/10 bg-white/[0.02] backdrop-blur-sm mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-violet-600/10 opacity-50" />
          
          <CardHeader className="relative">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-violet-600/20">
                <SettingsIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-white">Connected Wallet</CardTitle>
                <CardDescription className="text-white/60">
                  Your active wallet connection
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-4">
            {publicKey ? (
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div>
                  <p className="text-sm text-white/60 mb-1">Wallet Address</p>
                  <p className="font-mono text-white">{shortenAddress(publicKey.toString())}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyAddress}
                  className="h-8"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <Info className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-sm text-amber-200">
                  No wallet connected. Connect your wallet to see details.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Network Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="relative overflow-hidden border-white/10 bg-white/[0.02] backdrop-blur-sm mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-emerald-600/10 opacity-50" />
          
          <CardHeader className="relative">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/20 to-emerald-600/20">
                <Globe className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <CardTitle className="text-white">Network</CardTitle>
                <CardDescription className="text-white/60">
                  Current blockchain network
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-white/60">Network Name</span>
              <span className="text-white font-medium">{networkInfo.name}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-white/60">RPC Endpoint</span>
              <span className="text-white font-mono text-sm">{networkInfo.rpc}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-white/60">Chain ID</span>
              <span className="text-white">{networkInfo.chainId}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-white/60">Block Explorer</span>
              <a 
                href={networkInfo.explorer} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
              >
                Solscan
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* App Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="relative overflow-hidden border-white/10 bg-white/[0.02] backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-600/10 opacity-50" />
          
          <CardHeader className="relative">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-600/20">
                <Info className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <CardTitle className="text-white">Application Info</CardTitle>
                <CardDescription className="text-white/60">
                  Version and system information
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-white/60">Version</span>
              <span className="text-white font-mono">{appInfo.version}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-white/60">Build Date</span>
              <span className="text-white">{appInfo.build}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-white/60">Framework</span>
              <span className="text-white">{appInfo.framework}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card className="border-white/5 bg-transparent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2" />
              <div className="text-sm text-white/50">
                <p className="font-medium text-white/70 mb-1">Fast Transactions</p>
                <p>Sub-second confirmation times on Solana.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-white/5 bg-transparent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-violet-500 mt-2" />
              <div className="text-sm text-white/50">
                <p className="font-medium text-white/70 mb-1">Low Fees</p>
                <p>Average transaction fee ~0.000005 SOL.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-white/5 bg-transparent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-amber-500 mt-2" />
              <div className="text-sm text-white/50">
                <p className="font-medium text-white/70 mb-1">Secure</p>
                <p>Non-custodial. Your keys, your crypto.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-white/5 bg-transparent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-blue-500 mt-2" />
              <div className="text-sm text-white/50">
                <p className="font-medium text-white/70 mb-1">Open Source</p>
                <p>Transparent and verifiable code.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Settings;