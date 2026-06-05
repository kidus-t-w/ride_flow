'use client';

import { AdminDataTable } from '@/features/admin/components/AdminDataTable';
import { InlineEditActions } from '@/features/admin/components/InlineEditActions';
import type { VehicleAsset, VehicleStatus } from '@/features/admin/types';

const HEADERS = [
  'Asset ID',
  'Specification Model',
  'Plate Code',
  'Status Matrix',
  'Actions Context',
] as const;

const inputClass =
  'w-full bg-admin-surface border border-admin-border-strong px-2 py-1 focus:outline-none focus:border-brand-ink rounded-none text-admin-body';

interface FleetManagementTableProps {
  fleet: VehicleAsset[];
  editingVehicleId: string | null;
  vehicleEditForm: VehicleAsset | null;
  onEditFormChange: (form: VehicleAsset) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  onNavigateEdit: (id: string) => void;
}

export const FleetManagementTable = ({
  fleet,
  editingVehicleId,
  vehicleEditForm,
  onEditFormChange,
  onSave,
  onCancel,
  onDelete,
  onNavigateEdit,
}: FleetManagementTableProps) => (
  <AdminDataTable headers={[...HEADERS]} headClassName="text-admin-table-head">
    {fleet.map((v) => {
      const isEditing = editingVehicleId === v.id;
      return (
        <tr
          key={v.id}
          className={`border-b border-admin-border last:border-none transition-colors ${
            isEditing ? 'bg-admin-surface-muted' : ''
          }`}
        >
          <td className="p-4 font-mono font-bold">{v.id}</td>
          <td className="p-4 font-medium">
            {isEditing && vehicleEditForm ? (
              <input
                type="text"
                className={inputClass}
                value={vehicleEditForm.modelName}
                onChange={(e) =>
                  onEditFormChange({ ...vehicleEditForm, modelName: e.target.value })
                }
              />
            ) : (
              v.modelName
            )}
          </td>
          <td className="p-4 font-mono text-brand-secondary">
            {isEditing && vehicleEditForm ? (
              <input
                type="text"
                className={`${inputClass} font-mono uppercase`}
                value={vehicleEditForm.plateNumber}
                onChange={(e) =>
                  onEditFormChange({ ...vehicleEditForm, plateNumber: e.target.value })
                }
              />
            ) : (
              v.plateNumber
            )}
          </td>
          <td className="p-4 text-admin-body-sm font-bold text-brand-muted">
            {isEditing && vehicleEditForm ? (
              <select
                className={`${inputClass} text-[13px] font-bold`}
                value={vehicleEditForm.status}
                onChange={(e) =>
                  onEditFormChange({
                    ...vehicleEditForm,
                    status: e.target.value as VehicleStatus,
                  })
                }
              >
                <option value="Available">AVAILABLE</option>
                <option value="On Rental">ON RENTAL</option>
                <option value="Maintenance">MAINTENANCE</option>
              </select>
            ) : (
              v.status.toUpperCase()
            )}
          </td>
          <td className="p-4">
            {isEditing ? (
              <InlineEditActions onSave={onSave} onCancel={onCancel} />
            ) : (
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => onNavigateEdit(v.id)}
                  className="text-admin-action text-brand-ink bg-transparent border-none p-0 cursor-pointer uppercase hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(v.id)}
                  className="text-admin-action text-brand-danger bg-transparent border-none p-0 cursor-pointer uppercase hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </td>
        </tr>
      );
    })}
  </AdminDataTable>
);
