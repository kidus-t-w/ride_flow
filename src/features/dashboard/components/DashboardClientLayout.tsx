'use client'

import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { DashboardShell } from '@/features/dashboard/components/DashboardShell'
import { TabNav } from '@/components/ui/TabNav'
import { DASHBOARD_TABS } from '@/features/dashboard/types'

const dashboardRoutes = {
  BOOKINGS:        '/dashboard/bookings',
  ACCOUNT:         '/dashboard/account',
} as const

const tabsForNav = DASHBOARD_TABS.map((tab) => ({
  id:    tab,
  label: tab,
}))

export function DashboardClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()

  const activeTab = (
    Object.entries(dashboardRoutes).find(
      ([, route]) => pathname === route
    )?.[0] ?? 'BOOKINGS'
  ) as (typeof DASHBOARD_TABS)[number]

  const handleTabChange = (tabId: string) => {
    const route = dashboardRoutes[tabId as keyof typeof dashboardRoutes]
    if (route) router.push(route)
  }

  return (
    <DashboardShell>
      <TabNav
        tabs={tabsForNav}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className="mb-dashboard-nav-bottom"
        tabClassName="leading-[1.3]"
      />
      {children}
    </DashboardShell>
  )
}