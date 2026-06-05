'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import { Button } from '@/components/ui/Button';
import { fetchAdminFleet, deleteVehicleAsset } from '@/features/admin/services/adminService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';

export default function AdminVehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVehicles = useCallback(async () => {
    try {
      const data = await fetchAdminFleet(); 
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles?limit=50`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setVehicles(json.data.vehicles);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this vehicle permanently?')) return;
    try {
      await deleteVehicleAsset(id);
      setVehicles(prev => prev.filter(v => v._id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading vehicles...</div>;
  if (error) return <ErrorBanner message={error} />;

  return (
    <div className="space-y-6">
      <AdminSectionHeader
        title="FLEET PROVISIONING"
        action={<Button variant="primary" label="+ Add New Vehicle" onClick={() => router.push('/admin/vehicles/create')} />}
      />
      <div className="overflow-x-auto border border-admin-border">
        <table className="w-full text-left">
          <thead className="bg-admin-surface-muted border-b border-admin-border">
            <tr>
              <th className="p-3 text-admin-label text-brand-muted uppercase">Make</th>
              <th className="p-3 text-admin-label text-brand-muted uppercase">Model</th>
              <th className="p-3 text-admin-label text-brand-muted uppercase">Year</th>
              <th className="p-3 text-admin-label text-brand-muted uppercase">Category</th>
              <th className="p-3 text-admin-label text-brand-muted uppercase">Price/Day</th>
              <th className="p-3 text-admin-label text-brand-muted uppercase">Status</th>
              <th className="p-3 text-admin-label text-brand-muted uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(v => (
              <tr key={v._id} className="border-b border-admin-border hover:bg-admin-surface-muted/50">
                <td className="p-3 text-brand-ink">{v.make}</td>
                <td className="p-3 text-brand-ink">{v.model}</td>
                <td className="p-3 text-brand-ink">{v.year}</td>
                <td className="p-3 text-brand-muted">{v.category}</td>
                <td className="p-3 font-mono text-brand-ink">{v.pricePerDay} {v.currency}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 text-xs font-bold uppercase rounded-none ${
                    v.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {v.isAvailable ? 'Available' : 'Not Available'}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => router.push(`/admin/vehicles/${v._id}/edit`)}
                    className="text-brand-primary hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(v._id)}
                    className="text-brand-danger hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {vehicles.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-brand-muted">No vehicles found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}