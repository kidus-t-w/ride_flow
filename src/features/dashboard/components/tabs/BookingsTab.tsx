'use client';

import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import type { Booking } from '@/features/dashboard/types';

interface BookingsTabProps {
  bookings: Booking[];
  onAddBooking: () => void;
  onBookNow: () => void;
}

export const BookingsTab = ({
  bookings,
  onAddBooking,
  onBookNow,
}: BookingsTabProps) => (
  <div className="animate-in fade-in duration-150">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 mb-8">
      <h1 className="text-dashboard-hero text-brand-ink tracking-tight">YOUR BOOKINGS</h1>
      <Button variant="accent" label="Add booking" onClick={onAddBooking} />
    </div>

    {bookings.length === 0 ? (
      <div className="w-full bg-admin-surface-muted p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-none border border-admin-border/60">
        <div className="flex items-start gap-4">
          <span className="text-[20px] mt-0.5 select-none opacity-80">📋</span>
          <div>
            <h4 className="text-dashboard-empty-title text-brand-ink">
              No dynamic booking records discovered.
            </h4>
            <p className="text-dashboard-field text-brand-secondary mt-1">
              Your upcoming rentals and fleet operations will appear here. Make a new
              arrangement today.
            </p>
          </div>
        </div>
        <TextLink label="Book now ›" onClick={onBookNow} />
      </div>
    ) : (
      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="border border-admin-border p-6 flex flex-col md:flex-row justify-between gap-4 rounded-none"
          />
        ))}
      </div>
    )}
  </div>
);
