import { AdminMetricCard } from '@/features/admin/components/AdminMetricCard';
import type { FleetAnalytics } from '@/features/admin/types';

interface FleetDispositionGridProps {
  analytics: FleetAnalytics;
}

export const FleetDispositionGrid = ({ analytics }: FleetDispositionGridProps) => (
  <div className="grid grid-cols-2 md:grid-cols-5 border-t border-l border-admin-border">
    <AdminMetricCard
      label="Total Assets Tracked"
      labelClassName="text-brand-muted"
      value={analytics.totalAssets}
      caption="Active Registry Units"
    />
    <AdminMetricCard
      label="Available Fleet"
      labelClassName="text-brand-success"
      valueClassName="text-brand-success"
      value={analytics.countAvailable}
      caption="Deployable Right Now"
    />
    <AdminMetricCard
      label="On Rental Load"
      labelClassName="text-brand-primary"
      valueClassName="text-brand-primary"
      value={analytics.countOnRental}
      caption="Active Commits Out"
    />
    <AdminMetricCard
      label="Under Maintenance"
      labelClassName="text-brand-danger"
      valueClassName="text-brand-danger"
      value={analytics.countMaintenance}
      caption="Workshop Maintenance"
    />
    <AdminMetricCard
      className="col-span-2 md:col-span-1 bg-admin-surface-muted"
      label="Mean Fleet Charge"
      value={`${analytics.averageEnergy}%`}
      caption="Energy Provision Index"
      captionClassName="text-brand-muted"
    />
  </div>
);
