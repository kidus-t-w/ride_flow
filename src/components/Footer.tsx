'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  const corporateLinks = [
    { name: 'About RideFlow', href: '#about' },
    { name: 'Premium Fleet', href: '#fleet' },
    { name: 'Crypto Logistics', href: '#logistics' },
    { name: 'Careers', href: '#careers' },
  ];

  return (
    <footer className="w-full bg-[#01192D] text-white pt-16 pb-8 px-4 md:px-8 border-t border-[#043A5F]/40">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-12 border-b border-[#043A5F]/60">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 h-10 w-25">
              <Image
                src="/logo.png" 
                alt="RideFlow Logo"
                width={150}
                height={150}
                className="object-contain"
              />
          
            </div>
            <p className="text-[#CDE5ED]/70 font-light text-[14px] leading-relaxed max-w-sm">
              Premium vehicle rentals powered by global on-chain logistics. Secure your luxury travel experience with decentralized receipts instantly.
            </p>
            <div className="flex gap-2 pt-2 items-center text-[11px] font-bold tracking-wider text-[#72A8CE] uppercase">
              <span className="bg-[#043A5F] px-2 py-1">BTC</span>
              <span className="bg-[#043A5F] px-2 py-1">ETH</span>
              <span className="bg-[#043A5F] px-2 py-1">USDT</span>
              <span className="bg-[#043A5F] px-2 py-1">SOL</span>
            </div>
          </div>

          <div>
            <h4 className="text-[14px] font-bold tracking-[1px] uppercase mb-4 text-[#72A8CE]">
              Company
            </h4>
            <ul className="space-y-2.5">
              {corporateLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-[#CDE5ED] hover:text-white font-light text-[14px] transition-colors duration-150"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[14px] font-bold tracking-[1px] uppercase mb-4 text-[#72A8CE]">
              Newsletter
            </h4>
            <p className="text-[#CDE5ED]/70 font-light text-[13px] mb-4">
              Subscribe to unlock private luxury fleet distributions.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full h-11 bg-[#043A5F]/40 border border-[#587A85]/40 px-4 text-[14px] font-light text-white placeholder-[#587A85] focus:outline-none focus:border-[#6CCCD5]"
                style={{ borderRadius: '0px' }}
                required
              />
              <button 
                type="submit"
                className="w-full h-11 bg-[#0B5E96] hover:bg-[#1382CC] text-white text-[13px] font-bold tracking-[0.5px] uppercase transition-colors duration-150"
                style={{ borderRadius: '0px' }}
              >
                Join Network
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[12px] font-light text-[#9BA3A8]">
          <div>
            &copy; {new Date().getFullYear()} RideFlow Global Logistics Inc. All rights reserved on-chain.
          </div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Charter</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Protocol</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}