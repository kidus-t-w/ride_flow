'use client';

import type { FleetVehicle } from '@/features/fleet-catalog/types';

interface CheckoutSummarySidebarProps {
  car: FleetVehicle;
  pickupDate: string;
  returnDate: string;
  pickupLocation?: string;
  returnLocation?: string;
}

export const CheckoutSummarySidebar = ({
  car,
  pickupDate,
  returnDate,
  pickupLocation = 'Atlanta Int Airport',
  returnLocation = 'Atlanta Int Airport',
}: CheckoutSummarySidebarProps) => {
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="lg:col-span-5">
      <div className="bg-[#f7f7f7] border border-admin-border p-6 space-y-6 rounded-none">
        <div className="flex items-center gap-4 pb-6 border-b border-admin-border">
          <div className="w-24 h-16 bg-admin-surface border border-admin-border p-1 flex items-center justify-center rounded-none shrink-0">
            <img src={car.image} alt={car.model} className="max-w-full max-h-full object-contain" />
          </div>
          <div>
            <h3 className="text-dashboard-field font-bold text-brand-ink uppercase leading-tight">
              {car.model}
            </h3>
            <span className="text-admin-body-sm font-light text-brand-muted block mt-0.5">
              or similar | {car.category}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-admin-tab text-brand-muted uppercase tracking-wide">
            Pickup and return
          </h4>
          <div className="relative pl-6 space-y-5 border-l border-admin-border-strong ml-2.5 py-1">
            <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-brand-ink" />
            <div className="absolute -left-[4.5px] bottom-2 w-2 h-2 bg-brand-ink" />
            <LocationBlock
              label="Pickup"
              location={pickupLocation}
              datetime={formatDateTime(pickupDate)}
            />
            <LocationBlock
              label="Return"
              location={returnLocation}
              datetime={formatDateTime(returnDate)}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-admin-border space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-admin-tab text-brand-muted uppercase tracking-wide">
              What&apos;s included
            </h4>
          </div>
          <div className="space-y-2 text-admin-body font-light text-brand-secondary">
            <div className="flex items-center gap-2">
              <span className="text-brand-primary font-bold">✓</span> 24/7 Roadside Assistance Hotline
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-primary font-bold">✓</span> Unlimited miles
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LocationBlock = ({
  label,
  location,
  datetime,
}: {
  label: string;
  location: string;
  datetime: string;
}) => (
  <div className="space-y-0.5">
    <span className="text-admin-body-sm font-light text-brand-muted block uppercase">{label}</span>
    <div className="text-admin-body font-bold text-brand-ink">{location}</div>
    <div className="text-admin-tab font-light text-brand-secondary">{datetime}</div>
  </div>
);