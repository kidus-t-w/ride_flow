import type { ReactNode } from 'react';

interface DashboardShellProps {
  children: ReactNode;
}

export const DashboardShell = ({ children }: DashboardShellProps) => (
  <div className="selection-admin w-full min-h-screen bg-admin-surface text-brand-ink pt-admin-page-top pb-admin-page-bottom px-admin-page-x md:px-admin-page-x-md">
    <div className="mx-auto max-w-admin-container">
      {children}
    </div>
  </div>
);
