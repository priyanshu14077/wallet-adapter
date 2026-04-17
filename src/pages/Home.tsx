import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { Wallet, Send, Signature, Zap, Shield, Bolt, Globe, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Send,
    title: 'Send SOL',
    description: 'Transfer SOL to any Solana wallet address instantly with minimal fees.',
    href: '/send',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Signature,
    title: 'Sign Messages',
    description: 'Cryptographically sign messages to prove wallet ownership.',
    href: '/sign',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: Wallet,
    title: 'Portfolio',
    description: 'Track your SOL balance and transaction history in real-time.',
    href: '/portfolio',
    color: 'from-amber-500 to-orange-600',
  },
];

const benefits = [
  {
    icon: Bolt,
    title: 'Lightning Fast',
    description: 'Transactions confirm in under 1 second on Solana network.',
  },
  {
    icon: Shield,
    title: 'Secure',
    description: 'Your private keys never leave your wallet. Fully non-custodial.',
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Access from anywhere in the world. No KYC required.',
  },
  {
    icon: Zap,
    title: 'Low Fees',
    description: 'Send SOL for fractions of a cent. Average fee ~0.000005 SOL.',
  },
];

export function Home() {
  const { publicKey } = useWallet();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white/70">Powered by Solana Blockchain</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 via-white to-violet-400 bg-clip-text text-transparent">
                Web3 Wallet Made Simple
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10">
              Connect your Solana wallet to send, receive, and sign transactions. 
              Fast, secure, and built for the future of finance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {publicKey ? (
                <Button variant="glow" size="lg" asChild>
                  <Link to="/portfolio">
                    View Portfolio
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              ) : (
                <Button variant="glow" size="lg" asChild>
                  <Link to="/portfolio">
                    Connect Wallet
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="lg" asChild>
                <Link to="/docs">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Full control over your digital assets with a beautifully designed interface.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={feature.href}>
                    <Card className="h-full border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all group">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-white/60">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                Why Choose SolanaKit
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/60 text-sm">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-violet-500/10 p-12 text-center"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                Connect your wallet and start exploring the world of Web3.
              </p>
              <Button variant="glow" size="lg" asChild>
                <Link to="/portfolio">
                  Connect Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;