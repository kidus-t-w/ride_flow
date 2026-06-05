import type { VehicleStatus } from '@/features/admin/types';

interface VehicleStatusBadgeProps {
  status: VehicleStatus;
}

const statusStyles: Record<VehicleStatus, string> = {
  Available: 'bg-brand-success/10 text-brand-success',
  'On Rental': 'bg-brand-primary/10 text-brand-primary',
  Maintenance: 'bg-brand-danger/10 text-brand-danger',
};

export const VehicleStatusBadge = ({ status }: VehicleStatusBadgeProps) => (
  <span
    className={`text-admin-label px-2.5 py-1 uppercase inline-block ${statusStyles[status]}`}
  >
    {status}
  </span>
);
