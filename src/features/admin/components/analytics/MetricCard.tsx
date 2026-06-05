interface MetricCardProps {
    label: string;
    value: string | number;
    subtext?: string;
  }
  
  export const MetricCard = ({ label, value, subtext }: MetricCardProps) => (
    <div className="bg-admin-surface border border-admin-border p-6">
      <div className="text-admin-label text-brand-muted uppercase">{label}</div>
      <div className="text-3xl font-bold text-brand-ink mt-2">{value}</div>
      {subtext && <div className="text-xs text-brand-muted mt-1">{subtext}</div>}
    </div>
  );