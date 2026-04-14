import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';

import { Layout } from '@/components/Layout';
import { Background } from '@/components/Background';
import { Portfolio } from '@/pages/Portfolio';
import { Send } from '@/pages/Send';
import { Sign } from '@/pages/Sign';

const endpoint = "https://mainnet.helius-rpc.com/?api-key=24c9eb0e-10ff-4b9f-8557-6bbb47da2ee5";

const wallets = [
  new UnsafeBurnerWalletAdapter(),
];

export function App() {
  return (
    <BrowserRouter>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Background />
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/portfolio" replace />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/send" element={<Send />} />
                <Route path="/sign" element={<Sign />} />
              </Routes>
            </Layout>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </BrowserRouter>
  );
}

export default App;
