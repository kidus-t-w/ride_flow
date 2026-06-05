'use client';

import type { FleetVehicle } from '@/features/fleet-catalog/types';

interface CarDetailPanelProps {
  car: FleetVehicle;
  pickupDate: string;
  returnDate: string;
  onClose: () => void;
  onBook: (car: FleetVehicle, totalPrice: number) => void;
}

export const CarDetailPanel = ({
  car,
  pickupDate,
  returnDate,
  onClose,
  onBook,
}: CarDetailPanelProps) => {

  const days = Math.ceil(
    (new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = car.pricePerDay * (days > 0 ? days : 1);

  return (
    <div className="w-full bg-admin-surface border border-admin-border flex flex-col lg:flex-row relative overflow-hidden mt-12 rounded-none">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-30 text-brand-muted hover:text-brand-ink text-2xl font-light w-8 h-8 flex items-center justify-center transition-colors bg-transparent border-none"
      >
        ✕
      </button>

      <div className="w-full lg:w-[55%] bg-admin-surface-muted p-8 flex flex-col justify-between min-h-[420px] lg:min-h-[500px]">
        <div>
          <h2 className="text-brand-ink text-[24px] font-bold uppercase tracking-normal leading-[1.25]">
            {car.category}
          </h2>
          <span className="text-brand-muted text-admin-body font-light tracking-normal block mt-1 uppercase">
            {car.model} or similar ⓘ
          </span>
        </div>

        <div className="my-6 relative flex items-center justify-center h-48 w-full">
          <img
            src={car.image}
            alt={car.model}
            className="max-w-[90%] max-h-full object-contain relative z-10 select-none pointer-events-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          {car.features.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1.5 bg-admin-surface border border-admin-border text-brand-secondary text-admin-body-sm font-normal rounded-none"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[45%] bg-admin-surface p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-admin-border">
        <div className="space-y-6">
          <h3 className="text-brand-ink text-[18px] font-bold uppercase tracking-normal">
            Booking summary
          </h3>
          <div className="space-y-2 text-brand-ink">
            <div className="flex justify-between">
              <span className="text-brand-muted">Daily rate</span>
              <span className="font-mono">${car.pricePerDay.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted">Number of days</span>
              <span className="font-mono">{days}</span>
            </div>
            <div className="flex justify-between border-t border-admin-border pt-2 mt-2">
              <span className="font-bold">Total price</span>
              <span className="font-bold font-mono">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-admin-border mt-8 lg:mt-0">
          <button
            type="button"
            onClick={() => onBook(car, totalPrice)}
            className="w-full h-12 bg-brand-primary hover:bg-brand-primary-hover text-admin-surface font-bold text-dashboard-cta tracking-wide uppercase transition-colors border-none rounded-none px-8 py-3.5"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};