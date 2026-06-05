'use client';

import type { CryptoAssetOption, DashboardCryptoAsset } from '@/features/dashboard/types';

const CRYPTO_OPTIONS: CryptoAssetOption[] = [
  { ticker: 'USDC', chain: 'ERC-20' },
  { ticker: 'BTC', chain: 'Native' },
  { ticker: 'ETH', chain: 'Mainnet' },
  { ticker: 'SOL', chain: 'SPL Token' },
];

interface CryptoAssetSelectorProps {
  selected: DashboardCryptoAsset;
  onSelect: (asset: DashboardCryptoAsset) => void;
}

export const CryptoAssetSelector = ({
  selected,
  onSelect,
}: CryptoAssetSelectorProps) => (
  <div className="space-y-3">
    <label className="text-admin-tab text-brand-muted uppercase block">
      Select Primary Settling Token
    </label>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {CRYPTO_OPTIONS.map((asset) => {
        const isSelected = selected === asset.ticker;
        return (
          <button
            key={asset.ticker}
            type="button"
            onClick={() => onSelect(asset.ticker)}
            className={`p-4 flex flex-col items-center justify-center border transition-all rounded-none bg-admin-surface cursor-pointer ${
              isSelected
                ? 'border-2 border-brand-primary bg-admin-surface-muted'
                : 'border-admin-border hover:border-admin-border-strong'
            }`}
          >
            <span className="text-dashboard-field font-bold text-brand-ink">
              {asset.ticker}
            </span>
            <span className="text-admin-body-sm font-normal text-brand-muted uppercase mt-1 tracking-wide">
              {asset.chain}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);
