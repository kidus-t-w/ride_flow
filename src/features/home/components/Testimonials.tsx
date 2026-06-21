'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      quote: "RideFlow is the only rental company I've never had an issue with. Seriously... they've turned me into a lifelong client.",
      author: "P.",
      location: "Los Angeles",
      bgImage: "/images/testimonials/car-5.webp"
    },
    {
      quote: "The vehicle was handed over pristine, fully configured, with absolute zero terminal counter friction. True premium utility engineering.",
      author: "M.",
      location: "Munich",
      bgImage: "/images/testimonials/car-5.webp"
    },
    {
      quote: "Uncompromising fleet choices paired with flawless on-demand digital concierge access. They understand what luxury logistics mean.",
      author: "Sarah K.",
      location: "Atlanta",
      bgImage: "/images/testimonials/car-5.webp"
    }
  ];

  return (
    <section className="w-full py-12 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto relative h-[480px] overflow-hidden bg-[#0A1215] rounded-none">
        <div className="absolute inset-0 z-0">
          <img 
            src={reviews[activeIndex].bgImage} 
            alt="RideFlow Cinematic In-Car Experience View" 
            className="w-full h-full object-cover object-center brightness-[0.4] transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0A1215]/60 via-transparent to-[#0A1215]/60" />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 md:px-24">
          <div className="max-w-3xl space-y-4">
            <p className="text-white text-lg md:text-[24px] font-normal leading-[1.4] tracking-normal drop-shadow-sm select-none">
              “{reviews[activeIndex].quote}”
            </p>
            <div className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#6CCCD5] pt-2">
              - {reviews[activeIndex].author}, <span className="text-[#CDE5ED] font-light">{reviews[activeIndex].location}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 h-1.5 rounded-none ${
                  idx === activeIndex ? 'w-6 bg-[#0B5E96]' : 'w-1.5 bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
              className="w-8 h-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center hover:bg-[#0B5E96] hover:border-[#0B5E96] text-white transition-colors duration-150"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
              className="w-8 h-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center hover:bg-[#0B5E96] hover:border-[#0B5E96] text-white transition-colors duration-150"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}