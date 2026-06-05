'use client';

import { useCallback, useState } from 'react';
import {
  connectWallet,
  disconnectWallet,
  getDepositAddress,
} from '@/features/dashboard/services/dashboardService';
import type { DashboardCryptoAsset } from '@/features/dashboard/types';

export const useWalletConnection = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<DashboardCryptoAsset>('USDC');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [linkedAddress, setLinkedAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectCrypto = useCallback(
    (asset: DashboardCryptoAsset) => {
      setSelectedCrypto(asset);
      if (isWalletConnected) {
        setLinkedAddress(
          asset === 'SOL' ? 'BwZ8vK74m...7xYp' : '0x9E2a4C8F...75D4'
        );
      }
    },
    [isWalletConnected]
  );

  const handleWalletToggle = useCallback(async () => {
    if (isWalletConnected) {
      try {
        await disconnectWallet();
        setIsWalletConnected(false);
        setLinkedAddress(null);
      } catch {
        setError('Failed to disconnect wallet.');
      }
      return;
    }

    setIsConnecting(true);
    setError(null);
    try {
      const { address } = await connectWallet(selectedCrypto);
      setIsWalletConnected(true);
      setLinkedAddress(address);
    } catch {
      setError('Failed to connect wallet.');
    } finally {
      setIsConnecting(false);
    }
  }, [isWalletConnected, selectedCrypto]);

  const copyDepositAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getDepositAddress(selectedCrypto));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy address.');
    }
  }, [selectedCrypto]);

  return {
    selectedCrypto,
    isWalletConnected,
    isConnecting,
    linkedAddress,
    copied,
    error,
    selectCrypto,
    handleWalletToggle,
    copyDepositAddress,
    depositAddress: getDepositAddress(selectedCrypto),
  };
};
