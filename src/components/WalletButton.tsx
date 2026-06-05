'use client';

import { useWalletConnection } from '@/hooks/useWalletConnection';
import { useBalance } from 'wagmi';
import { ChevronDown, Wallet } from 'lucide-react';
import { useState } from 'react';
import { formatUnits } from 'viem';

export const WalletButton = () => {
  const { address, isConnected, connectWallet, disconnectWallet, isConnecting } = useWalletConnection();
  const { data: balance } = useBalance({ address });
  const [isOpen, setIsOpen] = useState(false);

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const formatBalance = (value?: bigint, decimals?: number) => {
    if (!value || decimals === undefined) return '0';
    const formatted = formatUnits(value, decimals);
    const num = parseFloat(formatted);
    if (isNaN(num)) return '0';
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    });
  };

  if (!isConnected) {
    return (
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="flex items-center gap-2 px-3 py-1.5 border border-admin-border hover:border-brand-ink transition-colors text-[13px] font-medium text-brand-ink bg-admin-surface"
      >
        <Wallet className="w-4 h-4" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  const formattedBalance = formatBalance(balance?.value, balance?.decimals);
  const symbol = balance?.symbol || 'ETH';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 border border-brand-primary bg-brand-primary/5 text-brand-primary font-medium text-[13px]"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="px-2 py-0.5 rounded text-[11px] text-brand-ink">
          {formattedBalance} {symbol}
        </span>
        <ChevronDown className="w-3 h-3" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-admin-surface border border-admin-border shadow-lg z-50">
          <div className="p-4 border-b border-admin-border">
            <p className="text-[11px] text-brand-muted uppercase tracking-wide">Connected Wallet</p>
            <p className="text-sm font-mono break-all mt-1">{address}</p>
            <div className="mt-3 pt-2 border-t border-admin-border">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-brand-muted uppercase">Total Balance</span>
                <span className="text-xl font-bold text-brand-ink">
                  {formattedBalance} {symbol}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              disconnectWallet();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-sm text-brand-danger hover:bg-admin-surface-muted transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};