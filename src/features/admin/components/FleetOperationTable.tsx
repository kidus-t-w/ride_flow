import { AdminDataTable } from '@/features/admin/components/AdminDataTable';
import { VehicleStatusBadge } from '@/features/admin/components/VehicleStatusBadge';
import type { VehicleAsset } from '@/features/admin/types';

const HEADERS = [
  'Asset ID',
  'Vehicle Specification',
  'Plate Number',
  'Energy Index',
  'Position Matrix',
  'State',
] as const;

interface FleetOperationTableProps {
  fleet: VehicleAsset[];
}

export const FleetOperationTable = ({ fleet }: FleetOperationTableProps) => (
  <AdminDataTable headers={[...HEADERS]}>
    {fleet.map((vehicle) => (
      <tr
        key={vehicle.id}
        className="border-b border-admin-border last:border-none hover:bg-admin-surface-muted/50 transition-colors"
      >
        <td className="p-4 font-mono font-bold text-[13px]">{vehicle.id}</td>
        <td className="p-4 text-brand-ink-emphasis font-medium">{vehicle.modelName}</td>
        <td className="p-4 font-mono text-[13px] text-brand-secondary">
          {vehicle.plateNumber}
        </td>
        <td className="p-4 text-brand-secondary font-mono">{vehicle.batteryOrFuel}</td>
        <td className="p-4 text-brand-secondary">{vehicle.currentLocation}</td>
        <td className="p-4">
          <VehicleStatusBadge status={vehicle.status} />
        </td>
      </tr>
    ))}
  </AdminDataTable>
);
