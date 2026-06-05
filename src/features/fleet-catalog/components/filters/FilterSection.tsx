import type { ReactNode } from 'react';

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

export const FilterSection = ({ title, children }: FilterSectionProps) => (
  <div className="space-y-3">
    <h3 className="text-admin-body-sm font-bold text-brand-muted uppercase tracking-wide">
      {title}
    </h3>
    {children}
  </div>
);
