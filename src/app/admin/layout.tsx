'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { AdminDashboardShell } from '@/features/admin/components/AdminDashboardShell';
import { TabNav } from '@/components/ui/TabNav';

const adminRoutes = [
  { id: 'FLEET OVERVIEW', path: '/admin/fleet', label: 'FLEET OVERVIEW' },
  { id: 'FLEET MANAGEMENT', path: '/admin/vehicles', label: 'FLEET MANAGEMENT' },
  { id: 'BLOG PUBLISHER', path: '/admin/blog', label: 'BLOG PUBLISHER' },
  { id: 'BOOKING', path: '/admin/reservations', label: 'BOOKING' },
  { id: 'USER MANAGEMENT', path: '/admin/users', label: 'USER MANAGEMENT' },
  { id: 'PROFILE', path: '/admin/profile', label: 'PROFILE' },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = adminRoutes.find((route) => pathname === route.path)?.id || 'FLEET OVERVIEW';

  const handleTabChange = (tabId: string) => {
    const route = adminRoutes.find((r) => r.id === tabId);
    if (route) router.push(route.path);
  };

  const tabsForNav = adminRoutes.map(({ id, label }) => ({ id, label }));

  return (
    <AdminDashboardShell>
      <div className="mb-8">
        <TabNav tabs={tabsForNav} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      {children}
    </AdminDashboardShell>
  );
}