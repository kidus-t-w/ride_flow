// This file does one job: export noindex metadata for all /dashboard/* routes.
// It is imported by a server-side wrapper around the client layout.
// You do not need to render this component — the metadata export is enough.

import type { Metadata } from 'next'

export const dashboardMetadata: Metadata = {
  title:  'Dashboard | RideFlow',
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