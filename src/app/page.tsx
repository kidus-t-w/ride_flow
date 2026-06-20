import type { Metadata } from 'next'
import HeroSection from '@/features/home/components/HeroSection'
import HowItWorks from '@/features/home/components/HowItWorks'
import TrustSignals from '@/features/home/components/TrustSignals'
import Testimonials from '@/features/home/components/Testimonials'
import PromoOffers from '@/features/home/components/PromoOffers'
import HomeBlogSection from '@/features/home/components/HomeBlogSection'
import Footer from '@/components/Footer'

// ─── Homepage Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'RideFlow - Browse, Rent & Buy Vehicles. Pay with Crypto',

  description:
    'Discover, compare, rent and purchase premium vehicles with secure blockchain payments. Browse SUVs, sedans, electric and luxury cars. Pay with ETH via MetaMask. Book in under 3 minutes - no hidden fees.',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: '/',
    title: 'RideFlow - Browse, Rent & Buy Vehicles. Pay with Crypto',
    description:
      'Blockchain-enabled vehicle rental and sales. Browse our full fleet, compare models side by side and pay securely with ETH via MetaMask.',
    images: [
      {
        url: 'https://i.postimg.cc/FKBzFVyR/home.jpg',
        width: 1200,
        height: 630,
        alt: 'RideFlow - Browse, Rent & Buy Vehicles. Decentralized Rides, Seamless Flow.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'RideFlow - Rent & Buy Vehicles. Pay with Crypto',
    description:
      'Browse SUVs, sedans, electric and luxury vehicles. Pay with ETH via MetaMask. Secure blockchain payment on every booking.',
    images: ['https://i.postimg.cc/FKBzFVyR/home.jpg'],
  },
}

// ─── Homepage JSON-LD Schemas ─────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ride-floww.vercel.app/'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'RideFlow',
  url: SITE_URL,
  description:
    'Blockchain-enabled vehicle rental and sales platform. Browse, compare, rent and purchase vehicles with secure ETH crypto payments.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/fleetcatalog?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-US',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ],
}

// ─── Homepage Component ───────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ── JSON-LD: WebSite + BreadcrumbList ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeroSection />
      <HowItWorks />
      <PromoOffers />
      <TrustSignals />
      <HomeBlogSection />
      <Testimonials />
      <Footer />
    </>
  )
}
