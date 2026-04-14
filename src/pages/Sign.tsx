import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { ed25519 } from '@noble/curves/ed25519.js';
import { Signature, AlertCircle, CheckCircle, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import bs58 from 'bs58';

export function Sign() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSign = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    if (!signMessage) {
      alert('Your wallet does not support message signing');
      return;
    }

    if (!message.trim()) {
      alert('Please enter a message to sign');
      return;
    }

    setLoading(true);
    setSignature(null);
    setVerified(false);

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const sig = await signMessage(encodedMessage);

      // Verify signature
      const isValid = ed25519.verify(sig, encodedMessage, publicKey.toBytes());
      
      if (!isValid) {
        alert('Message signature verification failed!');
        setLoading(false);
        return;
      }

      setSignature(bs58.encode(sig));
      setVerified(true);
    } catch (error) {
      alert('Error signing message: ' + (error as Error).message);
      console.error('Signing error:', error);
    } finally {
      setLoading(false);
    }
  };

  const copySignature = () => {
    if (signature) {
      navigator.clipboard.writeText(signature);
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
            Sign Message
          </span>
        </h1>
        <p className="text-white/60 text-lg">
          Cryptographically sign a message with your wallet
        </p>
      </motion.div>

      {/* Signing Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="relative overflow-hidden border-white/10 bg-white/[0.02] backdrop-blur-sm">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-emerald-600/10 opacity-50" />
          
          {/* Glow effect on success */}
          {verified && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-violet-600/5"
            />
          )}
          
          <CardHeader className="relative">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/20 to-emerald-600/20">
                <Signature className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <CardTitle className="text-white">Message Signing</CardTitle>
                <CardDescription className="text-white/60">
                  Create a verifiable signature
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-6">
            {!publicKey && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-sm text-amber-200">
                  Please connect your wallet to sign messages
                </p>
              </div>
            )}

            {/* Message Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Message to Sign
              </label>
              <Textarea
                placeholder="Enter your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-violet-500/50 focus:ring-violet-500/20 resize-none"
              />
              <p className="text-xs text-white/40">
                This message will be signed using your wallet's private key
              </p>
            </div>

            {/* Submit Button */}
            <Button
              variant="glow"
              size="lg"
              className="w-full h-12 text-base font-semibold"
              onClick={handleSign}
              disabled={!publicKey || loading || !message.trim()}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Signature className="w-4 h-4" />
                  Sign Message
                </span>
              )}
            </Button>

            {/* Signature Result */}
            {signature && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Message signed successfully!</span>
                </div>
                
                <div className="relative">
                  <div className="p-4 rounded-lg bg-black/30 border border-emerald-500/20 font-mono text-xs text-white/80 break-all">
                    {signature}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copySignature}
                    className="absolute top-2 right-2 h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-xs text-white/40 text-center">
                  Signature has been verified against your public key
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card className="border-white/5 bg-transparent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-violet-500 mt-2" />
              <div className="text-sm text-white/50">
                <p className="font-medium text-white/70 mb-1">Ed25519 Signing</p>
                <p>
                  Uses the Ed25519 elliptic curve for fast, secure digital signatures.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-white/5 bg-transparent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2" />
              <div className="text-sm text-white/50">
                <p className="font-medium text-white/70 mb-1">Verification</p>
                <p>
                  Anyone can verify your signature using your public wallet address.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
