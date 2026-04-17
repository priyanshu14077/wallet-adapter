import { motion } from 'framer-motion';
import { BookOpen, Send, Signature, Wallet, Shield, Zap, Globe, Code, FileText, ArrowRight, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const docsSections = [
  {
    icon: Wallet,
    title: 'Connect Wallet',
    description: 'Learn how to connect your Solana wallet to the application.',
    href: '/portfolio',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Send,
    title: 'Send Transactions',
    description: 'Send SOL to any Solana wallet address with minimal fees.',
    href: '/send',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Signature,
    title: 'Sign Messages',
    description: 'Cryptographically sign messages to prove ownership.',
    href: '/sign',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: Settings,
    title: 'Settings',
    description: 'View network details and application information.',
    href: '/settings',
    color: 'from-amber-500 to-orange-600',
  },
];

const faqs = [
  {
    question: 'What is SolanaKit?',
    answer: 'SolanaKit is a Web3 wallet interface that allows you to interact with the Solana blockchain. You can send SOL, sign messages, and view your portfolio balance.',
  },
  {
    question: 'Is my wallet secure?',
    answer: 'Yes. SolanaKit is non-custodial, meaning your private keys never leave your wallet. All transactions are signed locally on your device.',
  },
  {
    question: 'What are the transaction fees?',
    answer: 'Solana transactions are extremely cheap, typically costing around 0.000005 SOL (fractions of a cent) per transaction.',
  },
  {
    question: 'How fast are transactions?',
    answer: 'Solana is one of the fastest blockchains, with most transactions confirming in under 1 second.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No. Simply connect your existing Solana wallet (like Phantom, Solflare, or Backpack) to get started. No registration required.',
  },
];

export function Docs() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-emerald-400 via-white to-violet-400 bg-clip-text text-transparent">
            Documentation
          </span>
        </h1>
        <p className="text-white/60 text-lg">
          Learn how to use SolanaKit to interact with the Solana blockchain
        </p>
      </motion.div>

      {/* Quick Start */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Zap className="w-6 h-6 text-emerald-400" />
          Quick Start Guide
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">1</span>
              <h3 className="text-white font-semibold">Connect Wallet</h3>
            </div>
            <p className="text-white/60 text-sm">
              Click the "Connect Wallet" button and select your preferred Solana wallet (Phantom, Solflare, etc.).
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">2</span>
              <h3 className="text-white font-semibold">View Portfolio</h3>
            </div>
            <p className="text-white/60 text-sm">
              Once connected, you can view your SOL balance, transaction history, and network stats.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">3</span>
              <h3 className="text-white font-semibold">Send SOL</h3>
            </div>
            <p className="text-white/60 text-sm">
              Navigate to the Send page, enter recipient address and amount, then confirm the transaction.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">4</span>
              <h3 className="text-white font-semibold">Sign Messages</h3>
            </div>
            <p className="text-white/60 text-sm">
              Use the Sign page to create cryptographic signatures for authentication or verification.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Features Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-violet-400" />
          Features
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {docsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Link key={section.title} to={section.href}>
                <Card className="h-full border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1 group-hover:text-emerald-400 transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-white/60 text-sm">{section.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <FileText className="w-6 h-6 text-amber-400" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
              <p className="text-white/60 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Technical Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Code className="w-6 h-6 text-blue-400" />
          Technical Information
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-white/10 bg-white/[0.02]">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-medium">Network</span>
              </div>
              <p className="text-white/60 text-sm">Solana Mainnet</p>
              <p className="text-white/40 text-xs mt-1">Chain ID: 101</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/[0.02]">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-white font-medium">Avg. Confirmation</span>
              </div>
              <p className="text-white/60 text-sm">~400ms</p>
              <p className="text-white/40 text-xs mt-1">Sub-second finality</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/[0.02]">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-violet-400" />
                <span className="text-white font-medium">Avg. Fee</span>
              </div>
              <p className="text-white/60 text-sm">~0.000005 SOL</p>
              <p className="text-white/40 text-xs mt-1">Less than $0.001</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}

export default Docs;