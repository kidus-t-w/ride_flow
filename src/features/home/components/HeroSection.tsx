'use client';

import { CarSearchWidget } from './CarSearchWidget';

export default function Hero() {
  return (
    <section id="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-bg.webp')" }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 py-12 flex flex-col items-center text-center">
        <span className="text-[#bbbbbb] uppercase tracking-[1.5px] text-[13px] font-bold mb-4">
          Premium Car Rentals
        </span>
        <h1 className="text-white text-4xl md:text-6xl font-bold tracking-normal leading-[1.05] max-w-4xl mb-6">
          RIDEFLOW LUXURY PERFORMANCE
        </h1>
        <p className="text-[#bbbbbb] font-light text-base md:text-lg max-w-2xl mb-8 leading-[1.55]">
          Experience precision engineering on your own terms. Access our exclusive fleet with transparent corporate rates and seamless digital booking.
        </p>

        <div className="w-full mt-8 md:mt-12">
          <CarSearchWidget />
        </div>
      </div>
    </section>
  );
}