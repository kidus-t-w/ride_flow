'use client';

interface DepositAddressBlockProps {
  address: string;
  copied: boolean;
  onCopy: () => void;
}

export const DepositAddressBlock = ({
  address,
  copied,
  onCopy,
}: DepositAddressBlockProps) => (
  <div className="space-y-2 pt-2">
    <div className="flex justify-between items-center">
      <label className="text-admin-label text-brand-muted uppercase">
        Unique Portfolio Funding Address
      </label>
      <button
        type="button"
        onClick={onCopy}
        className="text-dashboard-link text-brand-primary hover:underline uppercase bg-transparent border-none cursor-pointer p-0"
      >
        {copied ? '✓ Copied' : 'Copy Address'}
      </button>
    </div>
    <div className="w-full h-12 px-4 bg-admin-surface-muted border border-admin-border text-brand-ink font-mono text-[13px] flex items-center select-all overflow-x-auto rounded-none">
      {address}
    </div>
  </div>
);
