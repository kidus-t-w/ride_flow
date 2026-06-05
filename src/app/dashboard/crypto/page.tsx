'use client';

import { useState, useCallback } from 'react';
import { CryptoAssetSelector } from '@/features/dashboard/components/crypto/CryptoAssetSelector';
import { WalletConnectionBar } from '@/features/dashboard/components/crypto/WalletConnectionBar';
import { DepositAddressBlock } from '@/features/dashboard/components/crypto/DepositAddressBlock';
import { AllowanceSidebar } from '@/features/dashboard/components/crypto/AllowanceSidebar';
import {
  getDepositAddress,
  getLinkedWalletAddress,
  connectWallet,
  disconnectWallet,
} from '@/features/dashboard/services/dashboardService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { DashboardCryptoAsset } from '@/features/dashboard/types';

export default function CryptoWalletPage() {
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
        setLinkedAddress(getLinkedWalletAddress(asset));
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

  return (
    <div className="animate-in fade-in duration-150">
      <h1 className="text-dashboard-hero text-brand-ink mb-2">CRYPTO WALLET HUB</h1>
      <p className="text-dashboard-lead text-brand-muted mb-12">
        Link a multi-chain decentralized Web3 vault for automated daily rental stream
        allowances or invoice balances.
      </p>

      {error && <ErrorBanner message={error} />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 border border-admin-border p-6 bg-admin-surface space-y-8 rounded-none">
          <CryptoAssetSelector selected={selectedCrypto} onSelect={selectCrypto} />

          <WalletConnectionBar
            isConnecting={isConnecting}
            isWalletConnected={isWalletConnected}
            linkedAddress={linkedAddress}
            onToggle={handleWalletToggle}
          />

          <DepositAddressBlock
            address={getDepositAddress(selectedCrypto)}
            copied={copied}
            onCopy={copyDepositAddress}
          />
        </div>

        <AllowanceSidebar selectedCrypto={selectedCrypto} />
      </div>
    </div>
  );
}