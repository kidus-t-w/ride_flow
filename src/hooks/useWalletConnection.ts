'use client';

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { useState } from 'react';
import { formatUnits } from 'viem';

export function useWalletConnection() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);

  // Fetch balance for the connected address
  const { data: balanceData } = useBalance({ address });

  const balance = balanceData ? formatUnits(balanceData.value, balanceData.decimals) : undefined;
  const symbol = balanceData?.symbol;

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      const connector = connectors.find((c) => c.id === 'injected');
      if (connector) connect({ connector });
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
    balance,
    symbol,
    connectWallet,
    disconnectWallet,
  };
}