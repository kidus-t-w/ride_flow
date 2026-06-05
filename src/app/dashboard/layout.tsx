// ─── SERVER COMPONENT ─────────────────────────────────────────────────────────
// No 'use client' — this is a Server Component so metadata is reliably exported.
// The interactive tab navigation is inside DashboardClientLayout below.

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DashboardClientLayout } from '@/features/dashboard/components/DashboardClientLayout'

// ─── Metadata ─────────────────────────────────────────────────────────────────
// noindex here cascades to ALL child routes automatically:
//   /dashboard, /dashboard/bookings, /dashboard/account,
//   /dashboard/crypto, /dashboard/help
// You do NOT need to add noindex to each individual dashboard page.
export const metadata: Metadata = {
  // Generic title — tabs change the visible heading, not the document title
  title: 'My Dashboard | RideFlow',

  // Block ALL dashboard routes from Google
  robots: {
    index:   false,
    follow:  false,
    nocache: true,
    googleBot: {
      index:  false,
      follow: false,
    },
  },
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Thin server shell — all logic is inside DashboardClientLayout
  return <DashboardClientLayout>{children}</DashboardClientLayout>
}