interface RevenueRow {
    month: string;
    bookings: number;
    revenue: number;
  }
  
  interface RevenueTableProps {
    rows: RevenueRow[];
    currency: string;
  }
  
  export const RevenueTable = ({ rows, currency }: RevenueTableProps) => (
    <div className="bg-admin-surface border border-admin-border p-6">
      <h3 className="text-admin-heading-sm font-bold text-brand-ink uppercase mb-4">Monthly Revenue</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-admin-border">
            <tr>
              <th className="py-2 text-admin-label text-brand-muted uppercase">Month</th>
              <th className="py-2 text-admin-label text-brand-muted uppercase">Bookings</th>
              <th className="py-2 text-admin-label text-brand-muted uppercase">Revenue ({currency})</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.month} className="border-b border-admin-border/50">
                <td className="py-2 font-mono text-brand-ink">{item.month}</td>
                <td className="py-2 text-brand-muted">{item.bookings}</td>
                <td className="py-2 text-brand-ink font-medium">{item.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );