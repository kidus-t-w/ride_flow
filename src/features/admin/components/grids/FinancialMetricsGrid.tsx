import { AdminMetricCard } from '@/features/admin/components/AdminMetricCard';
import { formatUsd } from '@/features/admin/lib/adminAnalytics';
import type { FleetAnalytics, HistoricalEarnings } from '@/features/admin/types';

interface FinancialMetricsGridProps {
  analytics: FleetAnalytics;
  historicalEarnings: HistoricalEarnings;
}

export const FinancialMetricsGrid = ({
  analytics,
  historicalEarnings,
}: FinancialMetricsGridProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-l border-admin-border">
    <AdminMetricCard
      className="bg-admin-surface-muted"
      label="Cleared Gross Revenue"
      value={`$${formatUsd(analytics.totalGrossRevenue)}`}
      caption="Settled Ledger Matrix"
    />
    <AdminMetricCard
      label="Pending Pipeline Inflow"
      labelClassName="text-brand-primary"
      valueClassName="text-brand-primary"
      value={`$${formatUsd(analytics.pendingVolumeUSD)}`}
      caption="Awaiting On-Chain Verification"
    />
    <AdminMetricCard
      label="Crypto Balance Split"
      labelClassName="text-brand-muted"
      valueSizeClass="text-xl block mt-1"
      value={
        <>
          ${formatUsd(historicalEarnings.cryptoSettledUSD, 0)}{' '}
          <span className="text-[12px] font-normal text-brand-muted font-sans">
            USDC/BTC
          </span>
        </>
      }
      caption={`Fiat Split: $${formatUsd(historicalEarnings.fiatWireVolumeUSD, 0)}`}
      captionClassName="text-brand-subtle mt-0.5"
    />
  </div>
);
