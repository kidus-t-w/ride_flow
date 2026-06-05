import type { ReactNode } from 'react';

interface AdminSectionHeaderProps {
  title: string;
  titleClassName?: string;
  action?: ReactNode;
}

export const AdminSectionHeader = ({
  title,
  titleClassName = 'text-admin-page-title',
  action,
}: AdminSectionHeaderProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <h2 className={`${titleClassName} text-brand-ink uppercase`}>{title}</h2>
    {action}
  </div>
);
