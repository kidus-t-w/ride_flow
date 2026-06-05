'use client';

import { User, Briefcase, Flame, CheckCircle, Info } from 'lucide-react';
import type { FleetVehicle } from '@/features/fleet-catalog/types';

interface FleetCatalogVehicleCardProps {
  car: FleetVehicle;
  isSelected: boolean;
  onSelect: (car: FleetVehicle) => void;
}

export const FleetCatalogVehicleCard = ({
  car,
  isSelected,
  onSelect,
}: FleetCatalogVehicleCardProps) => (
  <div
    role="button"
    tabIndex={0}
    onClick={() => onSelect(car)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') onSelect(car);
    }}
    className={`relative bg-admin-surface flex flex-col justify-between overflow-hidden cursor-pointer border transition-all rounded-none ${
      isSelected
        ? 'border-brand-primary ring-1 ring-brand-primary'
        : 'border-admin-border hover:border-admin-border-strong'
    }`}
    style={{ height: '440px' }}
  >
    <div className="p-6 relative z-10 w-full">
      <div className="mb-3">
        <h2 className="text-brand-ink text-[18px] font-bold uppercase tracking-normal leading-[1.4]">
          {car.category}
        </h2>
        <span className="text-brand-muted text-admin-body font-light uppercase tracking-normal block mt-1">
          {car.model}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-4 text-admin-body-sm font-normal text-brand-ink">
        <span className="bg-admin-surface-muted border border-admin-border px-2.5 py-1 rounded-none inline-flex items-center gap-1">
          Or similar model
          <Info className="w-3.5 h-3.5" strokeWidth={1.5} />
        </span>
        <span className="bg-admin-surface-muted border border-admin-border px-2.5 py-1 rounded-none inline-flex items-center gap-1">
          <User className="w-3.5 h-3.5" strokeWidth={1.5} />
          {car.seats}
        </span>
        <span className="bg-admin-surface-muted border border-admin-border px-2.5 py-1 rounded-none inline-flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5" strokeWidth={1.5} />
          {car.bags}
        </span>
      </div>
    </div>

    <div className="relative w-full px-4 h-44 flex items-center justify-center bg-admin-surface-muted">
      {car.isTopPick ? (
        <div className="absolute top-4 right-4 border border-admin-border-strong text-brand-ink font-bold text-admin-body-sm tracking-wide px-2.5 py-1 bg-admin-surface rounded-none z-20 select-none">
          TOP PICK
        </div>
      ) : null}
      <img
        src={car.image}
        alt={car.model}
        className="max-w-full max-h-full object-contain relative z-10 select-none pointer-events-none"
      />
    </div>

    <div className="w-full mt-auto p-6 bg-admin-surface border-t border-admin-border relative z-10">
      <div className="space-y-2">
        {car.isHotOffer ? (
          <span className="inline-flex items-center gap-1 bg-brand-ink text-admin-surface font-bold text-admin-body-sm tracking-wide uppercase px-2 py-0.5 rounded-none">
            <Flame className="w-3.5 h-3.5" strokeWidth={1.5} />
            Hot offer
          </span>
        ) : null}
        <div className="flex items-center gap-1.5 text-brand-secondary text-admin-body font-light">
          <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
          Unlimited miles
        </div>
        <div className="text-brand-ink text-admin-body font-light pt-1">
          From{' '}
          <span className="text-brand-primary text-[20px] font-bold">
            ${car.pricePerDay.toFixed(2)}
          </span>{' '}
          / day
          <span className="text-brand-muted text-admin-body-sm font-light ml-2">
            ${car.totalPrice.toFixed(2)} total
          </span>
        </div>
      </div>
    </div>
  </div>
);
