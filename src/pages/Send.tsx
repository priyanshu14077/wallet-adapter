import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { ArrowRight, Wallet, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Send() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMax = async () => {
    if (!publicKey) return;
    try {
      const balance = await connection.getBalance(publicKey);
      // Reserve a small amount for fees
      const maxAmount = Math.max(0, (balance - 5000) / LAMPORTS_PER_SOL);
      setAmount(maxAmount.toFixed(4));
    } catch (error) {
      console.error('Failed to get balance:', error);
    }
  };

  const handleSend = async () => {
    if (!publicKey || !sendTransaction) {
      alert('Please connect your wallet first');
      return;
    }

    if (!recipient || !amount) {
      alert('Please enter both recipient address and amount');
      return;
    }

    setLoading(true);

    try {
      const recipientPubkey = new PublicKey(recipient);
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports: lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      alert(`Transaction sent! Signature: ${signature}`);
      
      // Reset form
      setRecipient('');
      setAmount('');
    } catch (error) {
      alert('Transaction failed: ' + (error as Error).message);
      console.error('Transaction error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-emerald-400 via-white to-violet-400 bg-clip-text text-transparent">
            Send SOL
          </span>
        </h1>
        <p className="text-white/60 text-lg">
          Transfer SOL to any Solana wallet address
        </p>
      </motion.div>

      {/* Transaction Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="relative overflow-hidden border-white/10 bg-white/[0.02] backdrop-blur-sm">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-violet-600/10 opacity-50" />
          
          <CardHeader className="relative">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-violet-600/20">
                <Wallet className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-white">New Transaction</CardTitle>
                <CardDescription className="text-white/60">
                  Enter recipient details below
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-6">
            {!publicKey && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-sm text-amber-200">
                  Please connect your wallet to send transactions
                </p>
              </div>
            )}

            {/* Recipient Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Recipient Address
              </label>
              <Input
                placeholder="Enter Solana wallet address..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:ring-emerald-500/20"
              />
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/80">
                  Amount (SOL)
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMax}
                  disabled={!publicKey}
                  className="h-6 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                >
                  MAX
                </Button>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  step="0.001"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:ring-emerald-500/20 pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/40 font-medium">
                  SOL
                </span>
              </div>
              <p className="text-xs text-white/40">
                Network fee: ~0.000005 SOL
              </p>
            </div>

            {/* Submit Button */}
            <Button
              variant="glow"
              size="lg"
              className="w-full h-12 text-base font-semibold"
              onClick={handleSend}
              disabled={!publicKey || loading || !recipient || !amount}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Send Transaction
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6"
      >
        <Card className="border-white/5 bg-transparent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2" />
              <div className="text-sm text-white/50">
                <p className="mb-1">
                  Transactions on Solana are fast and cheap, typically confirming in under 1 second.
                </p>
                <p>
                  Always double-check the recipient address before sending.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
