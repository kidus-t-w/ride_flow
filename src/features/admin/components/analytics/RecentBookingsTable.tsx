interface RecentBooking {
    id: string;
    user: { firstName: string; lastName: string };
    vehicle: { make: string; model: string } | null;
    startDate: string;
    endDate: string;
    status: string;
    totalPrice: number;
    currency: string;
  }
  
  interface RecentBookingsTableProps {
    bookings: RecentBooking[];
  }
  
  export const RecentBookingsTable = ({ bookings }: RecentBookingsTableProps) => (
    <div className="bg-admin-surface border border-admin-border p-6">
      <h3 className="text-admin-heading-sm font-bold text-brand-ink uppercase mb-4">Recent Bookings</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-admin-border">
            <tr>
              <th className="py-2 text-admin-label text-brand-muted uppercase">ID</th>
              <th className="py-2 text-admin-label text-brand-muted uppercase">Customer</th>
              <th className="py-2 text-admin-label text-brand-muted uppercase">Vehicle</th>
              <th className="py-2 text-admin-label text-brand-muted uppercase">Dates</th>
              <th className="py-2 text-admin-label text-brand-muted uppercase">Status</th>
              <th className="py-2 text-admin-label text-brand-muted uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-admin-border/50">
                <td className="py-2 font-mono text-brand-ink">{b.id}</td>
                <td className="py-2 text-brand-ink">{b.user.firstName} {b.user.lastName}</td>
                <td className="py-2 text-brand-muted">
                  {b.vehicle ? `${b.vehicle.make} ${b.vehicle.model}` : 'N/A'}
                 </td>
                <td className="py-2 text-xs text-brand-muted">
                  {b.startDate.slice(0,10)} → {b.endDate.slice(0,10)}
                 </td>
                <td className="py-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 uppercase rounded-none ${
                    b.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {b.status}
                  </span>
                 </td>
                <td className="py-2 font-mono text-brand-ink">{b.totalPrice} {b.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );