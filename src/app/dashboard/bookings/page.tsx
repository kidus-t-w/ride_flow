'use client';

import { useState, useEffect } from 'react';
import { fetchMyBookings } from '@/features/dashboard/services/dashboardService';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { Booking } from '@/features/dashboard/types';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyBookings()
      .then(setBookings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const onAddBooking = () => {
    window.location.href = '/';
  };

  const onBookNow = () => {
    window.location.href = '/';
  };

  if (loading) return <div className="p-8 text-center">Loading bookings...</div>;
  if (error) return <ErrorBanner message={error} />;

  return (
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
              <h4 className="text-dashboard-empty-title text-brand-ink">No dynamic booking records discovered.</h4>
              <p className="text-dashboard-field text-brand-secondary mt-1">
                Your upcoming rentals and fleet operations will appear here. Make a new arrangement today.
              </p>
            </div>
          </div>
          <TextLink label="Book now ›" onClick={onBookNow} />
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-admin-border p-6 flex flex-col md:flex-row justify-between gap-4 rounded-none"
            >
              <div className="flex-1">
                <div className="font-bold text-brand-ink">{booking.vehicleModel}</div>
                <div className="text-sm text-brand-muted mt-1">
                  {booking.pickupDate} – {booking.returnDate}
                </div>
                <div className="text-xs text-brand-subtle mt-2">Location: {booking.location}</div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xs font-bold px-2 py-0.5 uppercase rounded-none ${
                  booking.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                  booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {booking.status}
                </span>
                <span className="text-lg font-mono text-brand-ink mt-2">{booking.pricePaid}</span>
                <span className="text-xs text-brand-muted">{booking.paymentMethod}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}