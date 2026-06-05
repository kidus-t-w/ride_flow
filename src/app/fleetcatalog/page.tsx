// ─── Server Component — NO 'use client' ──────────────────────────────────────
// FleetCatalogClient handles all interactivity. This file owns metadata + schemas.

import type { Metadata } from 'next'
import { Suspense } from 'react'
import FleetCatalogClient from './FleetCatalogClient'

// ─── Site URL ─────────────────────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000/'

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Rent a Vehicle — Browse Our Full Fleet | RideFlow',

  description:
    'Browse SUVs, sedans, electric vehicles, luxury cars, and pickup trucks available to rent. Filter by type, fuel, and price. Pay with ETH via MetaMask. Book in under 3 minutes.',



  alternates: {
    canonical: '/fleet',
  },

  
  openGraph: {
    type: 'website',
    url: '/fleet',
    siteName: 'RideFlow',
    locale: 'en_US',
    title: 'Browse Our Full Vehicle Fleet — Rent with Crypto | RideFlow',
    description:
      'SUVs, sedans, EVs, luxury cars, and more. Filter by type, fuel, and price range. Pay securely with ETH via MetaMask. Instant booking confirmation.',
    images: [
      {
        url: 'https://i.postimg.cc/Bnz1Y3jP/fleet.jpg', // host on your own domain
        width: 1200,
        height: 630,
        alt: 'RideFlow vehicle fleet — cars available to rent with crypto',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@RideFlow',    // ← replace with your actual handle
    creator: '@RideFlow', // ← replace with your actual handle
    title: 'Browse & Rent Vehicles — Pay with ETH | RideFlow',
    description:
      'Filter SUVs, EVs, luxury cars and more. Pay with MetaMask. Book in under 3 minutes.',
    images: {
      url: 'https://i.postimg.cc/Bnz1Y3jP/fleet.jpg',
      alt: 'RideFlow fleet catalog — vehicles available to rent',
    },
  },
}

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

// ItemList schema — tells Google this is a catalog/listing page.
// Google can show individual vehicle entries as rich results.
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'RideFlow Vehicle Fleet',
  description: 'Browse all vehicles available to rent on RideFlow, including SUVs, sedans, electric vehicles, luxury cars, hatchbacks, and pickup trucks.',
  url: `${SITE_URL}/fleet`,
}

// Service schema — describes what RideFlow offers on this page.
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Vehicle Rental with Crypto Payment',
  provider: {
    '@type': 'Organization',
    name: 'RideFlow',
    url: SITE_URL,
  },
  serviceType: 'Vehicle Rental',
  description:
    'Rent SUVs, sedans, electric vehicles, luxury cars, hatchbacks, and pickup trucks. Pay securely with ETH via MetaMask on the Ethereum network.',
  areaServed: {
    '@type': 'Country',
    name: 'US', // ← update to your actual service area
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'ETH',
    availability: 'https://schema.org/InStock',
    url: `${SITE_URL}/fleet`,
  },
}

// Breadcrumb schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',  item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Fleet', item: `${SITE_URL}/fleet` },
  ],
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function FleetCatalogPage() {
  return (
    <>
      {/* JSON-LD — parsed by Google before JS executes */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([itemListSchema, serviceSchema, breadcrumbSchema]),
        }}
      />

      <Suspense fallback={<div className="p-8 text-center">Loading fleet catalog...</div>}>
        <FleetCatalogClient />
      </Suspense>
    </>
  )
}