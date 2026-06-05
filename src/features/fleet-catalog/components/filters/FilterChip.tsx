'use client';

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const FilterChip = ({
  label,
  isActive,
  onClick,
  icon,
  className = '',
}: FilterChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`h-9 px-[14px] text-admin-body-sm font-normal tracking-wide transition-colors border rounded-none flex items-center gap-2 ${
      isActive
        ? 'bg-brand-ink border-brand-ink text-admin-surface'
        : 'bg-admin-surface border-admin-border-strong text-brand-ink hover:bg-admin-surface-muted'
    } ${className}`}
  >
    {icon ? <span>{icon}</span> : null}
    {label}
  </button>
);
