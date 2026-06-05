interface BookingStatusGridProps {
    statuses: Record<string, number>;
  }
  
  export const BookingStatusGrid = ({ statuses }: BookingStatusGridProps) => (
    <div className="bg-admin-surface border border-admin-border p-6">
      <h3 className="text-admin-heading-sm font-bold text-brand-ink uppercase mb-4">Booking Status</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statuses).map(([status, count]) => (
          <div key={status}>
            <div className="text-admin-label text-brand-muted uppercase">{status}</div>
            <div className="text-2xl font-bold text-brand-ink">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );