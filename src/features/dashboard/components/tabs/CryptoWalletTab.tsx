'use client';

import { AllowanceSidebar } from '@/features/dashboard/components/crypto/AllowanceSidebar';
import { CryptoAssetSelector } from '@/features/dashboard/components/crypto/CryptoAssetSelector';
import { DepositAddressBlock } from '@/features/dashboard/components/crypto/DepositAddressBlock';
import { WalletConnectionBar } from '@/features/dashboard/components/crypto/WalletConnectionBar';
import type { DashboardCryptoAsset } from '@/features/dashboard/types';

interface CryptoWalletTabProps {
  selectedCrypto: DashboardCryptoAsset;
  isWalletConnected: boolean;
  isConnecting: boolean;
  linkedAddress: string | null;
  copied: boolean;
  depositAddress: string;
  onSelectCrypto: (asset: DashboardCryptoAsset) => void;
  onWalletToggle: () => void;
  onCopyAddress: () => void;
}

export const CryptoWalletTab = ({
  selectedCrypto,
  isWalletConnected,
  isConnecting,
  linkedAddress,
  copied,
  depositAddress,
  onSelectCrypto,
  onWalletToggle,
  onCopyAddress,
}: CryptoWalletTabProps) => (
  <div className="animate-in fade-in duration-150">
    <h1 className="text-dashboard-hero text-brand-ink mb-2">CRYPTO WALLET HUB</h1>
    <p className="text-dashboard-lead text-brand-muted mb-12">
      Link a multi-chain decentralized Web3 vault for automated daily rental stream
      allowances or invoice balances.
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      <div className="lg:col-span-7 border border-admin-border p-6 bg-admin-surface space-y-8 rounded-none">
        <CryptoAssetSelector selected={selectedCrypto} onSelect={onSelectCrypto} />

        <WalletConnectionBar
          isConnecting={isConnecting}
          isWalletConnected={isWalletConnected}
          linkedAddress={linkedAddress}
          onToggle={onWalletToggle}
        />

        <DepositAddressBlock
          address={depositAddress}
          copied={copied}
          onCopy={onCopyAddress}
        />
      </div>

      <AllowanceSidebar selectedCrypto={selectedCrypto} />
    </div>
  </div>
);
