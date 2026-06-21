export default function PromoOffers() {
  const offers = [
    {
      badgeTop: 'UP TO',
      badgeMain: '20% DISCOUNT',
      title: 'START YOUR WEEK IN STYLE',
      subtitle: 'Save on week start rentals.',
      image: '/images/promo/car-3.webp',
      ctaText: 'Book now',
      link: '#hero-section'
    },
    {
      badgeTop: 'UP TO',
      badgeMain: '20% DISCOUNT',
      title: 'SAVE ON LUXURY VEHICLES',
      subtitle: 'Book now and drive first class.',
      image: '/images/promo/car-4.webp',
      ctaText: 'Book now',
      link: '#hero-section'
    }
  ];

  return (
    <section className="w-full  py-16 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer, idx) => (
          <div 
            key={idx}
            className="relative h-[420px] md:h-[48px] overflow-hidden group bg-[#0A1215]"
            style={{ borderRadius: '0px', height: '440px' }}
          >
            <img 
              src={offer.image} 
              alt={offer.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
            />
            
            <div className="absolute inset-0 bg-linear-to-t from-[#061416] via-[#061416]/40 to-[#0A1215]/30 z-10" />

            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between items-start">
              
              <div 
                className="relative bg-[#0B5E96] text-white px-5 py-2.5 -skew-x-12 origin-top-left border border-[#72A8CE]/30 shadow-lg"
                style={{ borderRadius: '0px' }}
              >
                <div className="skew-x-12 flex flex-col items-start">
                  <span className="text-[10px] font-bold tracking-[1.5px] text-[#CDE5ED] uppercase leading-none mb-1">
                    {offer.badgeTop}
                  </span>
                  <span className="text-[20px] font-bold tracking-tight leading-none">
                    {offer.badgeMain}
                  </span>
                </div>
              </div>

              <div className="w-full flex flex-col items-start gap-4">
                <div className="space-y-1">
                  <h3 className="text-white text-[24px] md:text-[28px] font-bold tracking-tight uppercase leading-tight">
                    {offer.title}
                  </h3>
                  <p className="text-[#CDE5ED] text-[14px] font-light tracking-wide">
                    {offer.subtitle}
                  </p>
                </div>

                <a
                  href={offer.link}
                  className="px-6 py-2.5 bg-transparent hover:bg-white text-white hover:text-[#191B1C] border border-white text-[13px] font-bold tracking-[0.5px] uppercase transition-colors duration-200"
                  style={{ borderRadius: '0px' }}
                >
                  {offer.ctaText}
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}