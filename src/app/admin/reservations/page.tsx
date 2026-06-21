'use client';

import { useState, useEffect } from 'react';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import { AdminDataTable } from '@/features/admin/components/AdminDataTable';
import { updateBookingStatus } from '@/features/admin/services/adminService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { AdminVehiclesSkeleton } from '@/features/admin/components/vehicles/AdminVehiclesSkeleton';
import toast from 'react-hot-toast';

// Helper: extract driver info from notes
const extractDriverInfo = (notes: string | null): { name: string; email: string; phone: string; company: string } | null => {
  if (!notes) return null;
  const nameMatch = notes.match(/Name: ([^|]+)/);
  const emailMatch = notes.match(/Email: ([^|]+)/);
  const phoneMatch = notes.match(/Phone: ([^|]+)/);
  const companyMatch = notes.match(/Company: ([^|]+)/);
  if (!nameMatch && !emailMatch && !phoneMatch) return null;
  return {
    name: nameMatch ? nameMatch[1].trim() : '',
    email: emailMatch ? emailMatch[1].trim() : '',
    phone: phoneMatch ? phoneMatch[1].trim() : '',
    company: companyMatch ? companyMatch[1].trim() : '',
  };
};

const HEADERS = [
  'Reservation ID',
  'Consumer Identity',
  'Allocated Fleet Unit',
  'Timeline Span',
  'Fulfillment State',
] as const;

const statusColorStyles = {
  'Pending Dispatch': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Confirmed': 'bg-green-100 text-green-800 border-green-200',
  'Completed': 'bg-blue-100 text-blue-800 border-blue-200',
  'Cancelled': 'bg-red-100 text-red-800 border-red-200',
};

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings?limit=100`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        const bookings = json.data?.bookings || json.bookings || [];
        // Map bookings to include driver info
        const mapped = bookings.map((b: any) => {
          const driverInfo = extractDriverInfo(b.notes);
          const driverName = driverInfo?.name || `${b.user?.firstName || ''} ${b.user?.lastName || ''}`.trim() || 'Unknown';
          const driverEmail = driverInfo?.email || b.user?.email || '';
          const driverPhone = driverInfo?.phone || '';
          const vehicleModel = b.vehicle?.make && b.vehicle?.model
            ? `${b.vehicle.make} ${b.vehicle.model}`
            : b.vehicleId || 'Unknown Vehicle';
          const pickupDate = b.startDate ? new Date(b.startDate).toLocaleDateString() : '';
          const returnDate = b.endDate ? new Date(b.endDate).toLocaleDateString() : '';
          let allocationStatus = 'Pending Dispatch';
          if (b.status === 'confirmed' || b.status === 'active') allocationStatus = 'Confirmed';
          else if (b.status === 'completed') allocationStatus = 'Completed';
          else if (b.status === 'cancelled') allocationStatus = 'Cancelled';
          return {
            id: b.id,
            driverName,
            driverEmail,
            driverPhone,
            vehicleModel,
            pickupDate,
            returnDate,
            allocationStatus,
          };
        });
        setReservations(mapped);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      let backendStatus = '';
      if (newStatus === 'Pending Dispatch') backendStatus = 'pending';
      else if (newStatus === 'Confirmed') backendStatus = 'confirmed';
      else if (newStatus === 'Completed') backendStatus = 'completed';
      else if (newStatus === 'Cancelled') backendStatus = 'cancelled';
      else backendStatus = newStatus.toLowerCase();

      await updateBookingStatus(parseInt(id), backendStatus);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, allocationStatus: newStatus } : r))
      );
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <AdminVehiclesSkeleton />;
  if (error) return <ErrorBanner message={error} />;

  return (
    <div className="space-y-6">
      <AdminSectionHeader title="CENTRAL BOOKING LOGS" />
      <AdminDataTable headers={[...HEADERS]} headClassName="text-admin-table-head">
        {reservations.map((res) => (
          <tr key={res.id} className="border-b border-admin-border last:border-none hover:bg-admin-surface-muted/50">
            <td className="p-4 font-mono font-bold text-brand-ink whitespace-nowrap">{res.id}</td>
            <td className="p-4 font-medium text-brand-ink-emphasis whitespace-nowrap">
              <div className="font-bold">{res.driverName}</div>
              <div className="text-xs text-brand-muted">{res.driverEmail}</div>
              {res.driverPhone && <div className="text-xs text-brand-muted">{res.driverPhone}</div>}
            </td>
            <td className="p-4 text-brand-secondary whitespace-nowrap">{res.vehicleModel}</td>
            <td className="p-4 font-mono text-[13px] text-brand-muted whitespace-nowrap">
              {res.pickupDate} — {res.returnDate}
            </td>
            <td className="p-4 min-w-[180px]">
              <div className="flex items-center gap-2">
                <select
                  value={res.allocationStatus}
                  onChange={(e) => handleStatusChange(res.id, e.target.value)}
                  disabled={updatingId === res.id}
                  className={`border px-2 py-1 text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:opacity-50 transition-all ${
                    statusColorStyles[res.allocationStatus as keyof typeof statusColorStyles] || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <option value="Pending Dispatch">Pending Dispatch</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {updatingId === res.id && (
                  <svg className="animate-spin h-4 w-4 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
              </div>
            </td>
          </tr>
        ))}
      </AdminDataTable>
    </div>
  );
}