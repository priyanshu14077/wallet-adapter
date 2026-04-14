import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Wallet, TrendingUp, ArrowUpRight, Activity, Clock, History, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock transaction data for demo
interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  timestamp: Date;
  address: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', type: 'receive', amount: 1.5, timestamp: new Date(Date.now() - 1000 * 60 * 30), address: '7xKXtg2...9wzL' },
  { id: '2', type: 'send', amount: 0.5, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), address: '3xJmP8k...2vQr' },
  { id: '3', type: 'receive', amount: 2.0, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), address: '9nKxW5m...7pSt' },
  { id: '4', type: 'send', amount: 0.1, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), address: '4yLpN9v...5wXy' },
];

// Price history for chart
const priceHistory = [18.5, 19.2, 19.8, 20.1, 19.5, 20.0, 20.5, 20.2, 20.8, 21.0, 20.4, 20.0];

export function Portfolio() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const bal = await connection.getBalance(publicKey);
          setBalance(bal / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error('Failed to fetch balance:', error);
        }
      } else {
        setBalance(null);
      }
      setLoading(false);
    };

    fetchBalance();
    
    // Refresh balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, [publicKey, connection]);

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', padding: '48px 0' }}
        >
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            marginBottom: '16px',
            background: 'linear-gradient(90deg, #34d399, #ffffff, #a78bfa)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Wallet Overview
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.125rem', maxWidth: '42rem', margin: '0 auto' }}>
            Track your Solana portfolio in real-time with live balance updates
          </p>
        </motion.div>

        {/* Live Status Indicator */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          borderRadius: '9999px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}>
          <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
            <span style={{
              position: 'absolute',
              display: 'inline-flex',
              height: '100%',
              width: '100%',
              borderRadius: '50%',
              background: '#34d399',
              opacity: 0.75,
              animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
            }} />
            <span style={{
              position: 'relative',
              display: 'inline-flex',
              borderRadius: '50%',
              height: '8px',
              width: '8px',
              background: '#10b981',
            }} />
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#34d399' }}>Live</span>
        </div>
      </div>

      {/* Main Balance Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 15, 15, 0.6)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 40px rgba(16, 185, 129, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Animated gradient border */}
        <motion.div 
          animate={{
            background: [
              'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, transparent 50%, rgba(139, 92, 246, 0.3) 100%)',
              'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, transparent 50%, rgba(16, 185, 129, 0.3) 100%)',
              'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, transparent 50%, rgba(139, 92, 246, 0.3) 100%)',
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            padding: '1px',
            opacity: 0.5,
          }}
        />
          
        {/* Card Header */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              padding: '8px', 
              borderRadius: '8px', 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(139, 92, 246, 0.2))' 
            }}>
              <Wallet style={{ width: '20px', height: '20px', color: '#34d399' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#ffffff' }}>Total Balance</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
                {publicKey ? shortenAddress(publicKey.toString()) : 'Connect wallet to view'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Card Content */}
        <div style={{ padding: '24px' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ height: '64px', width: '192px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <div style={{ height: '24px', width: '128px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
            </div>
          ) : publicKey ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '3rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.025em' }}>
                  {balance?.toFixed(4) || '0.0000'}
                </span>
                <span style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>SOL</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.6)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>≈</span>
                  <span style={{ fontWeight: 500 }}>${(balance ? balance * 20 : 0).toFixed(2)}</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>USD</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#34d399' }}>
                  <TrendingUp style={{ width: '16px', height: '16px' }} />
                  <span style={{ fontWeight: 500 }}>+2.4%</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>Connect your wallet to view your portfolio</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px' 
      }}>
        <StatCard 
          label="Network" 
          value="Mainnet" 
          icon={<Activity style={{ width: '16px', height: '16px', color: '#60a5fa' }} />}
          color="#60a5fa"
          delay={0.2}
        />
        <StatCard 
          label="Transaction Speed" 
          value="~400ms" 
          icon={<ArrowUpRight style={{ width: '16px', height: '16px', color: '#34d399' }} />}
          color="#34d399"
          delay={0.3}
        />
        <StatCard 
          label="Avg Fee" 
          value="~0.000005 SOL" 
          icon={<TrendingUp style={{ width: '16px', height: '16px', color: '#a78bfa' }} />}
          color="#a78bfa"
          delay={0.4}
        />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ display: 'flex', gap: '16px', justifyContent: 'center', paddingTop: '16px' }}
      >
        <Button variant="glow" size="lg" asChild>
          <a href="/send" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpRight style={{ width: '16px', height: '16px' }} />
            Send SOL
          </a>
        </Button>
      </motion.div>

      {/* Price Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 15, 15, 0.4)',
          backdropFilter: 'blur(12px)',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <BarChart3 style={{ width: '20px', height: '20px', color: '#34d399' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#ffffff' }}>Price Chart (24h)</h3>
        </div>
        <PriceChart data={priceHistory} />
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        style={{
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 15, 15, 0.4)',
          backdropFilter: 'blur(12px)',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <History style={{ width: '20px', height: '20px', color: '#a78bfa' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#ffffff' }}>Recent Transactions</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {mockTransactions.map((tx, index) => (
            <TransactionRow key={tx.id} transaction={tx} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function PriceChart({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  return (
    <div style={{ height: '120px', display: 'flex', alignItems: 'flex-end', gap: '4px', padding: '8px 0' }}>
      {data.map((value, index) => {
        const height = ((value - min) / range) * 80 + 20;
        const isUp = index > 0 && value >= data[index - 1];
        return (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            style={{
              flex: 1,
              background: isUp 
                ? 'linear-gradient(to top, #10b981, #34d399)' 
                : 'linear-gradient(to top, #ef4444, #f87171)',
              borderRadius: '2px',
              opacity: 0.8,
            }}
          />
        );
      })}
    </div>
  );
}

function TransactionRow({ transaction, index }: { transaction: Transaction; index: number }) {
  const isReceive = transaction.type === 'receive';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
      whileHover={{
        background: 'rgba(255, 255, 255, 0.06)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          padding: '8px',
          borderRadius: '8px',
          background: isReceive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
        }}>
          <ArrowUpRight 
            style={{ 
              width: '16px', 
              height: '16px', 
              color: isReceive ? '#34d399' : '#f87171',
              transform: isReceive ? 'rotate(180deg)' : 'none',
            }} 
          />
        </div>
        <div>
          <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#ffffff' }}>
            {isReceive ? 'Received' : 'Sent'} SOL
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
            {transaction.address}
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ 
          fontSize: '0.875rem', 
          fontWeight: 600, 
          color: isReceive ? '#34d399' : '#f87171' 
        }}>
          {isReceive ? '+' : '-'}{transaction.amount} SOL
        </p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock style={{ width: '12px', height: '12px' }} />
          {formatTimeAgo(transaction.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

function StatCard({ label, value, icon, color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(15, 15, 15, 0.4)',
        backdropFilter: 'blur(8px)',
        padding: '24px',
        transition: 'all 0.3s ease',
      }}
      whileHover={{
        borderColor: 'rgba(255, 255, 255, 0.15)',
        boxShadow: `0 0 20px ${color}20`,
        y: -2,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ 
          padding: '8px', 
          borderRadius: '8px', 
          background: `${color}20`,
        }}>
          {icon}
        </div>
        <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>{label}</span>
      </div>
      <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#ffffff' }}>{value}</p>
    </motion.div>
  );
}
