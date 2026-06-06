'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'Fleet Catalog', href: '#Hero_section' },
    { name: 'Blog Insights', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <footer className="w-full bg-[#01192D] text-white pt-12 pb-6 px-4 md:px-8 border-t border-[#043A5F]/40">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-[#043A5F]/60">
          {/* Left column: Logo */}
          <div className="flex justify-center md:justify-start">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="RideFlow Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Middle column: Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {publicLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#CDE5ED]/80 hover:text-white text-sm font-light transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right column: Description */}
          <div className="text-center md:text-right">
            <p className="text-[#CDE5ED]/70 text-sm font-light max-w-sm mx-auto md:mx-0">
              Premium vehicle rentals powered by global on-chain logistics.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-[#9BA3A8] text-xs font-light">
          &copy; {new Date().getFullYear()} RideFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}