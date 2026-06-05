import type { ReactNode } from 'react';

interface FleetCatalogShellProps {
  children: ReactNode;
}

export const FleetCatalogShell = ({ children }: FleetCatalogShellProps) => (
  <main className="selection-admin w-full bg-admin-surface min-h-screen py-20 px-4 md:px-8 relative overflow-x-hidden">
    <div className="max-w-admin-container mx-auto">{children}</div>
  </main>
);
