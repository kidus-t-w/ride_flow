// ─── SERVER COMPONENT — no 'use client' here ─────────────────────────────────
// This file owns all SEO. The interactive blog UI is in BlogClient below.
// Google reads this file's HTML directly. No JavaScript required.

import type { Metadata } from 'next'
import BlogClient from '@/features/blog/components/BlogClient'

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Blog - Vehicle Rental Tips, Crypto Payments & Web3 Guides',

  description:
    'The RideFlow blog covers how to rent vehicles with cryptocurrency, pay with ETH via MetaMask, compare cars, understand blockchain payments and more. New articles weekly.',

  alternates: {
    canonical: '/blog',
  },

  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Blog - Vehicle Rental Tips, Crypto Payments & Web3 Guides | RideFlow',
    description:
      'Guides on renting vehicles, paying with ETH via MetaMask, comparing cars and understanding blockchain payments. Read the RideFlow blog.',
    images: [
      {
        url: 'https://i.postimg.cc/FRWpG8XG/blog.jpg', // 🔧 1200x630px blog OG image in /public
        width: 1200,
        height: 630,
        alt: 'RideFlow Blog - Vehicle Rental & Crypto Payment Guides',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'RideFlow Blog - Rental Guides & Crypto Payment Tips',
    description:
      'How to rent with crypto, MetaMask guides, vehicle comparisons and blockchain payment explainers.',
    images: ['https://i.postimg.cc/FRWpG8XG/blog.jpg'],
  },
}

// ─── Force dynamic — blog posts come from a live API ─────────────────────────
// Without this Next.js may cache a stale page with no articles.
export const dynamic = 'force-dynamic'

// ─── Structured Data ──────────────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ride-floww.vercel.app/'

// Blog schema — registers this as a blog listing page with Google
const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog`,
  name: 'The RideFlow Blog',
  description:
    'Guides on vehicle rentals, crypto payments, blockchain transactions and smart mobility. Published by the RideFlow team.',
  url: `${SITE_URL}/blog`,
  publisher: {
    '@type': 'Organization',
    name: 'RideFlow',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
    },
  },
}

// BreadcrumbList schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
  ],
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function BlogPage() {
  return (
    <>
      {/* JSON-LD schemas — read by Google from the initial HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogSchema, breadcrumbSchema]),
        }}
      />

      {/*
        ── SEO text block ────────────────────────────────────────────────────
        This is the ONLY human-readable text Google sees before JavaScript
        loads. It must contain your primary and secondary keywords.
        Rendered server-side — guaranteed to be in the HTML source.

        The H1 here matches the title in the BlogClient header below.
        They must say the same thing for consistency.
      */}
      <div className="max-w-[1440px] mx-auto px-4 pt-12">
        <div className="border-b border-admin-border pb-6">
          <h1 className="text-[42px] font-bold uppercase text-brand-ink tracking-tight">
            The RideFlow Blog
          </h1>
          <p className="text-sm font-light text-brand-muted mt-2 max-w-2xl">
            Guides on renting vehicles with cryptocurrency, paying with ETH via
            MetaMask, comparing cars side by side and understanding how
            blockchain payments protect your booking.
          </p>
        </div>
      </div>

      {/*
        BlogClient handles everything interactive:
        — fetching articles from fetchPublicBlogs()
        — filter state (ALL / INSIGHTS / ENGINEERING / ANNOUNCEMENTS)
        — featured post + grid rendering
        — loading and error states
      */}
      <BlogClient />
    </>
  )
}
