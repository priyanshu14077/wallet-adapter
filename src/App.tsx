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
import { clusterApiUrl, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

export function App() {

  const endpoint = "https://mainnet.helius-rpc.com/?api-key=24c9eb0e-10ff-4b9f-8557-6bbb47da2ee5";  //slight-security issue


 



  return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  <Topbar />
                  <Portfolio/>
                  <Send/>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

function Send() {
const { publicKey , sendTransaction } = useWallet();
const { connection } = useConnection();
return <div>
    <input id ="recipient" type="text" placeholder="wallet address" />
    <input id ="amount" type="number" placeholder="Amount" />
    <button onClick={async () => {
      const recipientValue = (document.getElementById("recipient") as HTMLInputElement).value;
      const amountValue = (document.getElementById("amount") as HTMLInputElement).value;
      
      if (!recipientValue || !amountValue) {
        alert("Please enter both recipient address and amount");
        return;
      }
      
      try {
        const recipient = new PublicKey(recipientValue);
        const lamports = parseInt(amountValue) * LAMPORTS_PER_SOL;
        
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey!,
            toPubkey: recipient,
            lamports: lamports,
          })
        );


        if (publicKey && sendTransaction) {
            sendTransaction(transaction, connection);
        }
      } catch (error) {
        alert("Invalid recipient address or amount");
        console.error("Transaction error:", error);
      }
    }}>Send</button>
</div>
  


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
