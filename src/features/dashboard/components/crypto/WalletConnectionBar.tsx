'use client';

import { Button } from '@/components/ui/Button';

interface WalletConnectionBarProps {
  isConnecting: boolean;
  isWalletConnected: boolean;
  linkedAddress: string | null;
  onToggle: () => void;
}

export const WalletConnectionBar = ({
  isConnecting,
  isWalletConnected,
  linkedAddress,
  onToggle,
}: WalletConnectionBarProps) => (
  <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
    <Button
      variant="outline"
      label={
        isConnecting
          ? 'Initializing Context...'
          : isWalletConnected
            ? 'Disconnect Wallet'
            : 'Connect Web3 Wallet'
      }
      onClick={onToggle}
      disabled={isConnecting}
      connected={isWalletConnected}
    />

    <div className="text-dashboard-field flex-1 flex items-center justify-between h-12 px-4 bg-admin-surface-muted border border-admin-border">
      <span className="text-brand-muted">
        State:{' '}
        <span
          className={`text-admin-body-sm uppercase tracking-wider px-2 py-0.5 ml-1 ${
            isWalletConnected
              ? 'bg-brand-success/10 text-brand-success'
              : 'bg-warning/10 text-warning'
          }`}
        >
          {isWalletConnected ? 'Linked' : 'Disconnected'}
        </span>
      </span>
      {isWalletConnected && linkedAddress ? (
        <span className="font-mono text-brand-ink font-bold">{linkedAddress}</span>
      ) : null}
    </div>
  </div>
);
