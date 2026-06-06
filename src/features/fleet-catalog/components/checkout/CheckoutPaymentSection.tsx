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
  depositAddress: string;
  copied: boolean;
  onCopyAddress: () => void;
}

export const CheckoutPaymentSection = ({
  selectedCrypto,
  setSelectedCrypto,
  cryptoAmount,
  depositAddress,
  copied,
  onCopyAddress,
}: CheckoutPaymentSectionProps) => (
  <div className="border-t border-admin-border pt-6">
    <div className="border border-admin-border p-6 bg-admin-surface space-y-6">
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

      <div className="pt-2 space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-admin-body-sm font-bold text-brand-muted uppercase tracking-wide">
            Deposit Address
          </label>
          <button
            type="button"
            onClick={onCopyAddress}
            className="text-admin-label font-bold text-brand-primary hover:underline uppercase tracking-wide bg-transparent border-none cursor-pointer"
          >
            {copied ? '✓ Copied' : '📄 Copy Address'}
          </button>
        </div>
        <div className="w-full h-11 px-4 bg-admin-surface-muted border border-admin-border text-brand-muted text-[13px] font-mono flex items-center select-all overflow-x-auto rounded-none">
          {depositAddress}
        </div>
        <p className="text-xs text-brand-muted mt-1">
          Send the exact amount shown above to this address. After sending, click “I have sent the payment” to notify the admin.
        </p>
      </div>
    </div>
  </div>
);