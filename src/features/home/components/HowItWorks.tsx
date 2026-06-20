'use client';

import { Search, Wallet, ShieldCheck, Zap } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Search',
      desc: 'Find your vehicle by type, date, location',
      icon: Search,
      isActive: false,
    },
    {
      num: '02',
      title: 'Connect Wallet',
      desc: 'Link MetaMask, WalletConnect, or Coinbase Wallet',
      icon: Wallet,
      isActive: true,
    },
    {
      num: '03',
      title: 'Book & Pay',
      desc: 'Confirm on-chain, get blockchain receipt',
      icon: ShieldCheck,
      isActive: false,
    },
    {
      num: '04',
      title: 'Drive',
      desc: 'Pick up your verified, confirmed vehicle',
      icon: Zap,
      isActive: false,
    },
  ];

  return (
    <section className="w-full bg-[#EDEFF0] py-24 px-4 md:px-8 border-b border-[#C2C9CC]/40">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16 md:mb-20 max-w-2xl text-left">
          <span className="text-brand-primary uppercase tracking-[2px] text-[13px] font-bold block mb-3">
            Seamless Execution
          </span>
          <h2 className="text-brand-ink text-4xl md:text-[44px] font-bold tracking-tight uppercase leading-none mb-4">
            How It Works
          </h2>
          <p className="text-brand-secondary text-base md:text-lg font-light leading-relaxed">
            From search to driveway - your crypto car rental journey in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-admin-surface border border-[#C2C9CC]/30 p-6 flex flex-col justify-between min-h-[220px] transition-all hover:shadow-xl group"
              >
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-[#C2C9CC]/50 z-10" />
                )}

                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-brand-muted tracking-wider uppercase opacity-60">
                      Step
                    </span>
                    <span
                      className={`text-[28px] font-bold leading-none mt-0.5 ${
                        step.isActive ? 'text-brand-primary' : 'text-brand-ink'
                      }`}
                    >
                      {step.num}
                    </span>
                  </div>

                  <div
                    className={`p-3 transition-colors ${
                      step.isActive
                        ? 'bg-[#E6EFF6] text-brand-primary'
                        : 'bg-[#EDEFF0] text-brand-ink'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-brand-ink text-lg font-bold tracking-tight uppercase mb-2">
                    {step.title}
                  </h3>
                  <p className="text-brand-muted text-sm font-light leading-normal max-w-[240px]">
                    {step.desc}
                  </p>
                </div>

                <div
                  className={`absolute bottom-0 left-0 h-1 transition-all w-0 group-hover:w-full ${
                    step.isActive ? 'bg-brand-primary w-full' : 'bg-[#72A8CE]'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}