import type { Metadata } from 'next'
import HeroSection from '@/features/home/components/HeroSection'
import HowItWorks from '@/features/home/components/HowItWorks'
import TrustSignals from '@/features/home/components/TrustSignals'
import Testimonials from '@/features/home/components/Testimonials'
import PromoOffers from '@/features/home/components/PromoOffers'
import HomeBlogSection from '@/features/home/components/HomeBlogSection'
import Footer from '@/components/Footer'

// ─── Homepage Metadata ────────────────────────────────────────────────────────
// This OVERRIDES the defaults set in layout.tsx specifically for the homepage.
// The title here does NOT use the template — homepage gets its own full title.
export const metadata: Metadata = {
  title: 'RideFlow — Browse, Rent & Buy Vehicles. Pay with Crypto',

  description:
    'Discover, compare, rent, and purchase premium vehicles with secure blockchain payments. Browse SUVs, sedans, electric and luxury cars. Pay with ETH via MetaMask. Book in under 3 minutes — no hidden fees.',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: '/',
    title: 'RideFlow — Browse, Rent & Buy Vehicles. Pay with Crypto',
    description:
      'Blockchain-enabled vehicle rental and sales. Browse our full fleet, compare models side by side, and pay securely with ETH via MetaMask.',
    images: [
      {
        url: 'https://i.postimg.cc/FKBzFVyR/home.jpg', // 🔧 Create a 1200x630px hero image for the homepage
        width: 1200,
        height: 630,
        alt: 'RideFlow — Browse, Rent & Buy Vehicles. Decentralized Rides, Seamless Flow.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'RideFlow — Rent & Buy Vehicles. Pay with Crypto',
    description:
      'Browse SUVs, sedans, electric and luxury vehicles. Pay with ETH via MetaMask. Secure blockchain payment on every booking.',
    images: ['https://i.postimg.cc/FKBzFVyR/home.jpg'],
  },
}

// ─── Homepage JSON-LD Schemas ─────────────────────────────────────────────────
// Two schemas on the homepage:
//   1. WebSite — enables Google Sitelinks Search Box in search results
//   2. ItemList — tells Google the homepage showcases a list of vehicles

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000/'

// WebSite schema — enables the search box that appears under your result in Google
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'RideFlow',
  url: SITE_URL,
  description:
    'Blockchain-enabled vehicle rental and sales platform. Browse, compare, rent, and purchase vehicles with secure ETH crypto payments.',
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

// BreadcrumbList for homepage — signals to Google this is the root of the site
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

// ─── Homepage Component 
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <PromoOffers/>
      <TrustSignals />
      <HomeBlogSection/>
      <Testimonials />
      <Footer/>
    </main>
  )
}