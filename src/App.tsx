import { useEffect, useState } from "react";
import React, { type FC, useMemo } from 'react';
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

export function App() {

  const endpoint = "https://mainnet.helius-rpc.com/?api-key=24c9eb0e-10ff-4b9f-8557-6bbb47da2ee5";  //slight-security issue


 



  return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  <Topbar />
                  <Portfolio/>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

function Topbar() {
  const { publicKey } = useWallet();
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!publicKey && <WalletMultiButton /> }
            {publicKey && <WalletDisconnectButton />}
        </div>
    );
}

function Portfolio() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<null | number>(null);

  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then((balance) => {
        setBalance(balance);
      });
    }
  }, [publicKey])



  return (
    <div>
      {publicKey?.toString() }
     <br/>
     {balance}
    </div>
  );
}

export default App;
