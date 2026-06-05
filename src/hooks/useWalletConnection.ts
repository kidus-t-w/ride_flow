'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';

export function useWalletConnection() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      const connector = connectors.find((c) => c.id === 'injected');
      if (connector) {
        connect({ connector });
      } else {
        console.error('No injected connector found');
        alert('No wallet detected. Please install MetaMask.');
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return {
    address,
    isConnected,
    isConnecting: isPending || isConnecting,
    connectWallet,
    disconnectWallet,
  };
}