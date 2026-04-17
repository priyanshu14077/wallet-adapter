import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';

import { Layout } from '@/components/Layout';
import { Background } from '@/components/Background';
import { Home } from '@/pages/Home';
import { Portfolio } from '@/pages/Portfolio';
import { Send } from '@/pages/Send';
import { Sign } from '@/pages/Sign';
import { Settings as SettingsPage } from '@/pages/Settings';
import { Docs } from '@/pages/Docs';

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
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/send" element={<Send />} />
                <Route path="/sign" element={<Sign />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/docs" element={<Docs />} />
              </Routes>
            </Layout>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </BrowserRouter>
  );
}

export default App;
