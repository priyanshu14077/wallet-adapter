import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { LayoutDashboard, Send, Signature, Zap, Home, Settings, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/portfolio', label: 'Portfolio', icon: LayoutDashboard },
  { path: '/send', label: 'Send', icon: Send },
  { path: '/sign', label: 'Sign', icon: Signature },
  { path: '/docs', label: 'Docs', icon: BookOpen },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Layout({ children }: LayoutProps) {
  const { publicKey } = useWallet();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <NavLink to="/portfolio" className="flex items-center gap-2 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-violet-600 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500 to-violet-600 blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
                SolanaKit
              </span>
            </NavLink>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                      isActive 
                        ? "text-white" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Wallet Button */}
            <div className="flex items-center gap-4">
              {!publicKey ? (
                <WalletMultiButton />
              ) : (
                <WalletDisconnectButton />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
