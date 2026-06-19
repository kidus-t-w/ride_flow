'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { api } from '@/lib/api/client';
import { BookingsSkeleton } from '@/features/dashboard/components/BookingsSkeleton';
import toast from 'react-hot-toast';

interface BookingItem {
  id: number;
  vehicleId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  currency: string;
  status: string;
  notes: string | null;
  cancelledAt: string | null;
  blockchainPaid: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelTarget, setCancelTarget] = useState<{ id: number; vehicleId: string } | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings/my?limit=50`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        const fetchedBookings = json.data?.bookings || json.bookings || [];
        setBookings(fetchedBookings);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancelClick = (id: number, vehicleId: string) => {
    setCancelTarget({ id, vehicleId });
  };

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    try {
      await api.patch(`/bookings/${cancelTarget.id}/status`, { status: 'cancelled' });
      toast.success(`Booking cancelled`);
      setBookings(prev =>
        prev.map(b =>
          b.id === cancelTarget.id ? { ...b, status: 'cancelled', cancelledAt: new Date().toISOString() } : b
        )
      );
    } catch (err: any) {
      toast.error(err.message || 'Cancellation failed');
    } finally {
      setCancelTarget(null);
    }
  };

  const onAddBooking = () => {
    window.location.href = '/';
  };

  const onBookNow = () => {
    window.location.href = '/';
  };

  if (loading) return <BookingsSkeleton />;
  if (error) return <ErrorBanner message={error} />;

  const canCancel = (status: string) => {
    return ['pending', 'confirmed'].includes(status.toLowerCase());
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'confirmed' || s === 'active') return 'bg-green-100 text-green-800';
    if (s === 'pending') return 'bg-yellow-100 text-yellow-800';
    if (s === 'cancelled') return 'bg-red-100 text-red-800';
    if (s === 'completed') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
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
                  <div className="text-sm text-brand-muted">
                    {formatDate(booking.startDate)} – {formatDate(booking.endDate)}
                    <span className="ml-2 text-xs text-brand-subtle">({booking.totalDays} days)</span>
                  </div>
                  {booking.notes && (
                    <div className="text-xs text-brand-muted mt-2 italic line-clamp-2">
                      Note: {booking.notes}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end justify-between min-w-[160px]">
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs font-bold px-2 py-0.5 uppercase rounded-none ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    
                  </div>
                  <span className="text-lg font-mono text-brand-ink mt-2">
                    {booking.totalPrice} {booking.currency}
                  </span>
                  {canCancel(booking.status) && (
                    <button
                      onClick={() => handleCancelClick(booking.id, booking.vehicleId)}
                      className="mt-3 px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wide transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="No, Keep"
        isDestructive={true}
      />
    </>
  );
}