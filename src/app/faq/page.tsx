// ─── NO 'use client' here — this is a Server Component ───────────────────────
// The accordion interaction is moved to a separate Client Component below.
// This allows Google to read all FAQ content directly from the HTML.

import type { Metadata } from 'next'
import FAQAccordion from '@/features/home/components/FAQAccordion'
// 🔧 Move the FAQAccordionItem 'use client' logic into that separate file
//    See the FAQAccordion component code at the bottom of this file.

// ─── FAQ Page Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'FAQ - Rentals, Crypto Payments & Blockchain Explained',

  description:
    'Answers to your top questions about renting vehicles on RideFlow, paying with ETH via MetaMask, cancellation policy and how our blockchain payment system works.',

  alternates: {
    canonical: '/faq',
  },

  openGraph: {
    type: 'website',
    url: '/faq',
    title: 'FAQ - Rentals, Crypto Payments & Blockchain | RideFlow',
    description:
      'Everything you need to know about renting and buying vehicles on RideFlow - including crypto payments, cancellation policy and how to get started.',
    images: [
      {
        url: 'https://i.postimg.cc/mrc7BDv7/faq.jpg',
        width: 1200,
        height: 630,
        alt: 'RideFlow FAQ - Vehicle Rental & Blockchain Payment Questions',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Rentals, Crypto Payments & Blockchain | RideFlow',
    description:
      'Answers about renting vehicles, paying with ETH, cancellations and our blockchain payment system.',
    images: ['https://i.postimg.cc/mrc7BDv7/faq.jpg'],
  },
}

// ─── FAQ Content ──────────────────────────────────────────────────────────────
// ⚠️  Content rewritten in plain human language.
// Original jargon ("Energy Matrix Capacity", "dispatch blocks", "fleet taxonomy")
// gets zero searches. These questions and answers match real search queries.
// The FAQPage schema below is built from this same array — keep them in sync.

const rentalFaqs = [
  {
    question: 'How do I rent a vehicle on RideFlow?',
    answer:
      'Browse our full fleet on the Vehicles page, select the vehicle you want and choose your rental dates on the availability calendar. Once you confirm the dates you will be taken to checkout where you can review the total price before payment. The whole process takes under 3 minutes. Your booking confirmation and receipt are sent to your email immediately after payment.',
  },
  {
    question: 'What types of vehicles are available to rent?',
    answer:
      'Our fleet includes SUVs, sedans, electric vehicles, luxury cars, hatchbacks and pickup trucks. You can filter by vehicle type, fuel type, transmission and price range on the fleet catalog page to find exactly what you need.',
  },
  {
    question: 'How do I filter and compare vehicles?',
    answer:
      'On the fleet catalog page, use the filter panel to narrow results by vehicle type, fuel type, transmission and price range. To compare specific vehicles, click the Compare button on any vehicle card - you can compare up to 3 vehicles side by side, seeing their specs, fuel type, seat count and daily price in one table.',
  },
  {
    question: 'Do I need an account to rent a vehicle?',
    answer:
      'Yes, you need a RideFlow account to complete a booking. Registration is free and takes less than 2 minutes - you only need your name, email address and a password. Once registered, all your bookings, receipts and payment history are saved in your customer dashboard.',
  },
]

const paymentFaqs = [
  {
    question: 'How do I pay with cryptocurrency?',
    answer:
      'After confirming your booking details, click Pay with Crypto on the payment page. You will be prompted to connect your MetaMask wallet. Once connected, approve the ETH transaction in MetaMask and the payment is processed on the Ethereum network. Your transaction hash is saved with your booking as permanent proof of payment.',
  },
  {
    question: 'Which cryptocurrencies do you accept?',
    answer:
      'We currently accept ETH (Ethereum) for all bookings, processed on the Ethereum Sepolia network. We chose Ethereum because it offers fast transaction confirmation, wide wallet support and a publicly verifiable transaction record. If you prefer not to pay with crypto, please contact our team for alternative payment options.',
  },
  {
    question: 'Is my crypto payment secure?',
    answer:
      'Yes. Every payment is processed directly on the Ethereum blockchain - cryptographically secured, permanently recorded and publicly verifiable using your transaction hash. We never store your wallet private key or seed phrase. Your transaction hash is saved to your booking record so you have verifiable proof of payment at all times.',
  },
  {
    question: 'What is a transaction hash and where do I find it?',
    answer:
      'A transaction hash is a unique identifier assigned to every blockchain transaction - it starts with 0x and is 66 characters long. Think of it as your payment receipt on the blockchain. After payment, your transaction hash is displayed on the confirmation page and stored permanently in your booking details under My Bookings.',
  },
]

const cancellationFaqs = [
  {
    question: 'What is the cancellation policy?',
    answer:
      'You can cancel a booking up to 24 hours before your rental start date for a full refund. Cancellations made within 24 hours of the start date are subject to a 50% cancellation fee. To cancel, go to My Bookings in your customer dashboard, select the booking and click Cancel. Crypto refunds are processed back to your original wallet address within 5 to 7 business days.',
  },
  {
    question: 'Can I modify my booking dates after confirming?',
    answer:
      'Yes, booking dates can be modified up to 48 hours before the rental start date, subject to vehicle availability on the new dates. Go to My Bookings, select your booking and choose Edit Dates. If the new dates result in a different total price you will be prompted to pay the difference or receive a partial refund.',
  },
]

// ─── FAQPage JSON-LD Schema ───────────────────────────────────────────────────
// This is what makes Google show expandable Q&A answers directly in search results.
// Rules: plain text answers only - no HTML, no lists, no markdown inside the text.
// Google selects 2-3 of these to show as rich results based on relevance.

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ...rentalFaqs,
    ...paymentFaqs,
    ...cancellationFaqs,
  ].map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

// ─── BreadcrumbList Schema ────────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rideflow.com'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',  item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'FAQ',   item: `${SITE_URL}/faq` },
  ],
}

// ─── Page Component ───────────────────────────────────────────────────────────
// Server Component - all FAQ text is in the initial HTML that Google reads.
// The accordion open/close animation is handled by FAQAccordion (Client Component).

export default function FAQPage() {
  return (
    <>
      {/* JSON-LD schemas — Google reads these and shows rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, breadcrumbSchema]),
        }}
      />

      <div className="w-full min-h-screen bg-admin-surface text-brand-ink pt-8 pb-24 px-4 md:px-12">
        <div className="max-w-[768px] mx-auto">

          {/* ── Page Header ─────────────────────────────────────────────── */}
          <div className="border-b-2 border-brand-ink pb-6 mb-12">
            {/* H1 — one per page, contains primary keyword */}
            <h1 className="text-[32px] font-bold tracking-tight uppercase text-brand-ink">
              Frequently Asked Questions
            </h1>
            <p className="text-sm font-normal text-brand-muted mt-2">
              Everything you need to know about renting vehicles, paying with
              cryptocurrency and how our blockchain payment system works.
            </p>
          </div>

          {/* ── Rental Process ──────────────────────────────────────────── */}
          {/* H2 tags are SEO section signals — keep them keyword-relevant */}
          <section className="mb-12" aria-labelledby="faq-rental">
            <h2
              id="faq-rental"
              className="text-xs font-bold tracking-wide text-brand-muted uppercase block mb-4 border-b border-admin-border pb-2"
            >
              Rental Process
            </h2>
            {/* FAQAccordion is the Client Component that handles open/close */}
            <FAQAccordion items={rentalFaqs} />
          </section>

          {/* ── Crypto & Blockchain Payments ────────────────────────────── */}
          <section className="mb-12" aria-labelledby="faq-payments">
            <h2
              id="faq-payments"
              className="text-xs font-bold tracking-wide text-brand-muted uppercase block mb-4 border-b border-admin-border pb-2"
            >
              Crypto & Blockchain Payments
            </h2>
            <FAQAccordion items={paymentFaqs} />
          </section>

          {/* ── Cancellation Policy ─────────────────────────────────────── */}
          <section aria-labelledby="faq-cancellation">
            <h2
              id="faq-cancellation"
              className="text-xs font-bold tracking-wide text-brand-muted uppercase block mb-4 border-b border-admin-border pb-2"
            >
              Cancellation & Modifications
            </h2>
            <FAQAccordion items={cancellationFaqs} />
          </section>

        </div>
      </div>
    </>
  )
}