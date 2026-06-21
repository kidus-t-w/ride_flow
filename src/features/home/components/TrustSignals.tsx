'use client';

import { Clock, Car, Headset } from 'lucide-react';

export default function FeatureShowcase() {
  const cards = [
    {
      title: 'CURBSIDE PICKUP & DROPOFF',
      description: 'No counters. No chaos. Just a premium ride waiting for you immediately upon your arrival.',
      icon: Clock,
    },
    {
      title: 'PREMIUM VEHICLES',
      description: 'Explore our first-class collection of engineering marvels from BMW, Mercedes, Cadillac and more.',
      icon: Car,
    },
    {
      title: 'PERSONAL CONCIERGE, ON CALL',
      description: 'Need something mid-journey? Simply message us inside the RideFlow digital application for instant support.',
      icon: Headset,
    },
  ];

  return (
    <section className="relative min-h-[90vh] w-full flex flex-col justify-between overflow-hidden bg-[#0A1215]">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/car-1.webp" 
          alt="RideFlow Premium Handover Experience" 
          className="w-full h-full object-cover object-center brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0A1215] via-transparent to-[#0A1215]/40" />
      </div>

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 flex flex-col items-start text-left">
        <span className="text-[#CDE5ED] uppercase tracking-[1.5px] text-[13px] font-bold mb-3">
          RideFlow First
        </span>
        <h2 className="text-white text-4xl md:text-[54px] font-bold tracking-normal leading-[1.1] max-w-2xl mb-8 uppercase">
          Effortless arrivals. <br />
          No matter the forecast.
        </h2>
      </div>

      <div className="relative z-10 w-full bg-linear-to-t from-[#0A1215] via-[#0A1215]/90 to-transparent pt-12 pb-16 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div 
                key={index}
                className="relative bg-[#0A1215]/70 backdrop-blur-md p-6 lg:p-8 border-l-2 border-[#0B5E96] flex flex-col items-start justify-between min-h-[200px] transition-all duration-200 hover:bg-[#0A1215]/95"
              >
                <div className="flex flex-col items-start gap-4 w-full">
                  <div className="p-2 bg-[#0B5E96]/20 text-[#6CCCD5]">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white text-[18px] font-bold tracking-normal leading-[1.3] uppercase">
                    {card.title}
                  </h3>
                </div>
                <p className="text-[#CDE5ED]/80 font-light text-[14px] leading-[1.55] mt-4 max-w-sm">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}