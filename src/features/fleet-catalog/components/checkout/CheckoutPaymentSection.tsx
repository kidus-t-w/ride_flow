'use client';

import { getCryptoRateLabel } from '@/features/fleet-catalog/lib/fleetCatalogPricing';
import type { CheckoutCryptoAsset } from '@/features/fleet-catalog/types';

const CRYPTO_OPTIONS = [
  { code: 'USDC' as const, name: 'USD Coin', icon: '💵' },
  { code: 'BTC' as const, name: 'Bitcoin', icon: '₿' },
  { code: 'ETH' as const, name: 'Ethereum', icon: 'Ξ' },
  { code: 'SOL' as const, name: 'Solana', icon: '☀️' },
];

interface CheckoutPaymentSectionProps {
  selectedCrypto: CheckoutCryptoAsset;
  setSelectedCrypto: (asset: CheckoutCryptoAsset) => void;
  cryptoAmount: string;
  isWalletConnected: boolean;
  isConnecting: boolean;
  walletAddress: string | null;
  copied: boolean;
  depositAddress: string;
  onWalletConnect: () => void;
  onCopyAddress: () => void;
}

export const CheckoutPaymentSection = ({
  selectedCrypto,
  setSelectedCrypto,
  cryptoAmount,
  isWalletConnected,
  isConnecting,
  walletAddress,
  copied,
  depositAddress,
  onWalletConnect,
  onCopyAddress,
}: CheckoutPaymentSectionProps) => (
  <div className="border-t border-admin-border pt-10">
    <h2 className="text-[24px] font-bold uppercase text-brand-ink tracking-normal mb-2">
      Payment Method
    </h2>
    <p className="text-admin-body font-light text-brand-muted mb-6">
      Connect your decentralized Web3 asset wallet or select direct token invoice distribution
      settlement.
    </p>

    <div className="border border-admin-border p-6 bg-admin-surface rounded-none space-y-6">
      <div className="space-y-2">
        <label className="text-admin-body-sm font-bold text-brand-muted uppercase tracking-wide">
          Select Crypto Asset
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CRYPTO_OPTIONS.map((crypto) => {
            const isTarget = selectedCrypto === crypto.code;
            return (
              <button
                key={crypto.code}
                type="button"
                onClick={() => setSelectedCrypto(crypto.code)}
                className={`h-14 px-3 flex flex-col justify-center items-center border transition-all rounded-none ${
                  isTarget
                    ? 'border-brand-primary bg-admin-surface-muted'
                    : 'border-admin-border hover:border-admin-border-strong bg-admin-surface'
                }`}
              >
                <span className="text-dashboard-field font-bold text-brand-ink flex items-center gap-1.5">
                  <span className="text-admin-body">{crypto.icon}</span> {crypto.code}
                </span>
                <span className="text-admin-label font-light text-brand-muted uppercase mt-0.5">
                  {crypto.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-[#f7f7f7] border-l-2 border-brand-primary p-4 flex justify-between items-center">
        <div className="space-y-0.5">
          <span className="text-admin-body-sm font-light text-brand-muted block uppercase">
            Converted Countervalue
          </span>
          <span className="text-[18px] font-bold text-brand-ink">
            {cryptoAmount} {selectedCrypto}
          </span>
        </div>
        <div className="text-admin-body-sm font-light text-brand-muted text-right">
          1 {selectedCrypto} ≈ {getCryptoRateLabel(selectedCrypto)}
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <button
          type="button"
          onClick={onWalletConnect}
          disabled={isConnecting}
          className={`h-12 px-6 font-bold text-admin-tab uppercase tracking-wide border transition-colors rounded-none whitespace-nowrap ${
            isWalletConnected
              ? 'bg-transparent border-brand-ink text-brand-ink hover:bg-admin-surface-muted'
              : 'bg-brand-ink border-brand-ink text-admin-surface hover:bg-brand-secondary'
          }`}
        >
          {isConnecting
            ? 'Initializing...'
            : isWalletConnected
              ? 'Disconnect Wallet'
              : 'Connect Web3 Wallet'}
        </button>

        <div className="flex-1 flex items-center justify-between h-12 px-4 bg-admin-surface-muted border border-admin-border rounded-none">
          <span className="text-admin-tab font-light text-brand-secondary">
            Status:{' '}
            <span
              className={`font-bold uppercase tracking-wide text-[11px] px-1.5 py-0.5 rounded-none ml-1 ${
                isWalletConnected
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isWalletConnected ? 'Connected' : 'Vault Standby'}
            </span>
          </span>
          {isWalletConnected && walletAddress ? (
            <span className="text-admin-tab font-normal text-brand-muted">
              Address: {walletAddress}
            </span>
          ) : null}
        </div>
      </div>

      <div className="pt-2 space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-admin-body-sm font-bold text-brand-muted uppercase tracking-wide">
            Or Deposit Directly to Fleet Invoice Address
          </label>
          <button
            type="button"
            onClick={onCopyAddress}
            className="text-admin-label font-bold text-brand-primary hover:underline uppercase tracking-wide bg-transparent border-none cursor-pointer"
          >
            {copied ? '✓ Copied' : '📄 Copy Invoice Address'}
          </button>
        </div>
        <div className="w-full h-11 px-4 bg-admin-surface-muted border border-admin-border text-brand-muted text-[13px] font-mono flex items-center select-all overflow-x-auto rounded-none">
          {depositAddress}
        </div>
      </div>
    </div>
  </div>
);
