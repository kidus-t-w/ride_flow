import type { DashboardCryptoAsset } from '@/features/dashboard/types';

interface AllowanceSidebarProps {
  selectedCrypto: DashboardCryptoAsset;
}

export const AllowanceSidebar = ({ selectedCrypto }: AllowanceSidebarProps) => (
  <div className="lg:col-span-5 bg-admin-surface-muted border border-admin-border p-6 space-y-6 rounded-none">
    <h3 className="text-admin-tab text-brand-muted uppercase">
      Available Running Allowances
    </h3>
    <div className="space-y-4">
      <div className="bg-admin-surface p-6 border border-admin-border flex justify-between items-center rounded-none">
        <div>
          <span className="text-admin-body-sm text-brand-muted uppercase block mb-1">
            Deposit Balance
          </span>
          <span
            className="font-bold text-brand-ink"
            style={{ fontSize: 'var(--text-dashboard-balance-lg)' }}
          >
            0.00 {selectedCrypto}
          </span>
        </div>
      </div>

      <div className="bg-admin-surface p-6 border border-admin-border flex justify-between items-center rounded-none">
        <div>
          <span className="text-admin-body-sm text-brand-muted uppercase block mb-1">
            Pre-approved Limit
          </span>
          <span
            className="font-bold text-brand-ink"
            style={{ fontSize: 'var(--text-dashboard-balance-md)' }}
          >
            $5,000.00 USD
          </span>
        </div>
        <span className="text-admin-body-sm text-brand-success bg-brand-success/10 px-2 py-0.5 font-bold uppercase tracking-wider">
          Active
        </span>
      </div>
    </div>
  </div>
);
