interface MostBookedVehicle {
    vehicle: { make: string; model: string } | null;
    totalBookings: number;
    totalRevenue: number;
    currency: string;
  }
  
  interface MostBookedTableProps {
    vehicles: MostBookedVehicle[];
  }
  
  export const MostBookedTable = ({ vehicles }: MostBookedTableProps) => (
    <div className="bg-admin-surface border border-admin-border p-6">
      <h3 className="text-admin-heading-sm font-bold text-brand-ink uppercase mb-4">Most Booked Vehicles</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-admin-border">
            <tr>
              <th className="py-2 text-admin-label text-brand-muted uppercase">Vehicle</th>
              <th className="py-2 text-admin-label text-brand-muted uppercase">Bookings</th>
              <th className="py-2 text-admin-label text-brand-muted uppercase">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((item, idx) => (
              <tr key={idx} className="border-b border-admin-border/50">
                <td className="py-2 text-brand-ink">
                  {item.vehicle ? `${item.vehicle.make} ${item.vehicle.model}` : 'Vehicle unavailable'}
                </td>
                <td className="py-2 text-brand-muted">{item.totalBookings}</td>
                <td className="py-2 text-brand-ink font-medium">
                  {item.currency} {item.totalRevenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );