import type { ReactNode } from 'react';

interface AdminMetricCardProps {
  label: string;
  value: ReactNode;
  caption: string;
  labelClassName?: string;
  valueClassName?: string;
  valueSizeClass?: string;
  captionClassName?: string;
  className?: string;
}

export const AdminMetricCard = ({
  label,
  value,
  caption,
  labelClassName = 'text-brand-ink',
  valueClassName = 'text-brand-ink',
  valueSizeClass = 'text-3xl',
  captionClassName = 'text-brand-subtle',
  className = 'bg-admin-surface',
}: AdminMetricCardProps) => (
  <div
    className={`p-admin-metric border-b border-r border-admin-border ${className}`}
  >
    <span className={`text-admin-label ${labelClassName} block mb-1 uppercase`}>
      {label}
    </span>
    <span
      className={`font-mono font-bold tracking-tight ${valueSizeClass} ${valueClassName}`}
    >
      {value}
    </span>
    <span
      className={`text-admin-caption ${captionClassName} block mt-1 uppercase font-mono`}
    >
      {caption}
    </span>
  </div>
);
