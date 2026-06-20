import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'
import { Web3Provider } from './providers'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

// 🔧 REPLACE: set your production domain here
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ride-floww.vercel.app/'
const SITE_NAME = 'RideFlow'

// ─── Root Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // metadataBase is REQUIRED — without it all relative OG image URLs break silently
  metadataBase: new URL(SITE_URL),

  title: {
    // This is the homepage title
    default: `${SITE_NAME} — Browse, Rent & Buy Vehicles. Pay with Crypto`,
    // Every other page uses this template: "About RideFlow | RideFlow"
    template: `%s | ${SITE_NAME}`,
  },

  description:
    'RideFlow is a blockchain-enabled vehicle rental and sales platform. Browse SUVs, sedans, electric and luxury vehicles. Pay securely with ETH via MetaMask. Book in under 3 minutes.',

  keywords: [
    'vehicle rental',
    'car rental',
    'rent car with crypto',
    'blockchain car rental',
    'pay car rental with ETH',
    'MetaMask vehicle booking',
    'buy car online',
    'vehicle marketplace',
    'electric car rental',
    'luxury car rental',
    'SUV rental',
    'crypto payment car',
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Canonical ────────────────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  // 🔧 REPLACE: add a real 1200x630px OG image to /public/og-default.jpg
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Browse, Rent & Buy Vehicles. Pay with Crypto`,
    description:
      'Blockchain-enabled vehicle rental and sales. Browse our full fleet, compare models and pay with ETH via MetaMask. Book in under 3 minutes.',
    images: [
      {
        url: 'https://i.postimg.cc/FKBzFVyR/home.jpg',
        width: 1200,
        height: 630,
        alt: 'RideFlow - Decentralized Rides, Seamless Flow',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  // 🔧 REPLACE: swap @rideflow for your real Twitter handle
  twitter: {
    card: 'summary_large_image',
    site: '@rideflow',
    creator: '@rideflow',
    title: `${SITE_NAME} - Rent & Buy Vehicles. Pay with Crypto`,
    description:
      'Browse SUVs, sedans, electric and luxury vehicles. Pay with ETH via MetaMask. Secure blockchain payments.',
    images: ['https://i.postimg.cc/FKBzFVyR/home.jpg'],
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  // 🔧 REPLACE: add these files to /public
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // ── Manifest ─────────────────────────────────────────────────────────────
  manifest: '/site.webmanifest',

  // ── Google Search Console verification ───────────────────────────────────
  // 🔧 REPLACE: paste your real verification code from GSC
  verification: {
    google: 'PASTE_YOUR_GSC_VERIFICATION_CODE_HERE',
  },

  // ── App metadata ─────────────────────────────────────────────────────────
  applicationName: SITE_NAME,
  category: 'automotive',
}

// ─── LocalBusiness + AutoRental JSON-LD Schema ───────────────────────────────
// This tells Google exactly what RideFlow is and where it operates.
// 🔧 REPLACE: fill in address, phone, email and social links below.
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['AutoRental', 'LocalBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  description:
    'Blockchain-enabled vehicle rental and sales platform. Browse, compare, rent and purchase vehicles with secure ETH crypto payments via MetaMask.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-default.jpg`,
  telephone: '+1-800-000-0000',          // 🔧 REPLACE
  email: 'hello@rideflow.com',           // 🔧 REPLACE
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Example Street', // 🔧 REPLACE
    addressLocality: 'Addis Ababa',      // 🔧 REPLACE
    addressCountry: 'ET',                // 🔧 REPLACE — ISO 3166-1 alpha-2
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.005401,   // 🔧 REPLACE
    longitude: 38.763611, // 🔧 REPLACE
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',
    ],
    opens: '08:00',
    closes: '20:00',
  },
  paymentAccepted: 'Cash, Credit Card, Cryptocurrency (ETH)',
  currenciesAccepted: 'USD, ETH',
  priceRange: '$$',
  sameAs: [
    'https://twitter.com/rideflow',   // 🔧 REPLACE
    'https://instagram.com/rideflow', // 🔧 REPLACE
    'https://linkedin.com/company/rideflow', // 🔧 REPLACE
  ],
}

// ─── Root Layout ────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-white`}>
        <Web3Provider>
          <SessionProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
          </SessionProvider>
        </Web3Provider>
      </body>
    </html>
  )
}
