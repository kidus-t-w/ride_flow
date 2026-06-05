'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchVehicleById, updateVehicle } from '@/features/admin/services/adminService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';

export default function EditVehiclePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [featureInput, setFeatureInput] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<{ url: string; publicId: string }[]>([]);

  useEffect(() => {
    if (!id) return;
    fetchVehicleById(id)
      .then(vehicle => {
        setForm({
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          pricePerDay: vehicle.pricePerDay,
          category: vehicle.category,
          fuelType: vehicle.fuelType,
          transmission: vehicle.transmission,
          seats: vehicle.seats,
          description: vehicle.description || '',
          location: vehicle.location || '',
          features: vehicle.features || [],
          isAvailable: vehicle.isAvailable,
          currency: vehicle.currency || 'EUR',
        });
        setExistingImages(vehicle.images || []);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const addFeature = () => {
    if (featureInput.trim()) {
      setForm((prev: any) => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
      setFeatureInput('');
    }
  };
  const removeFeature = (index: number) => {
    setForm((prev: any) => ({ ...prev, features: prev.features.filter((_: any, i: number) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'features') {
          (value as string[]).forEach(f => formData.append('features', f));
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      imageFiles.forEach(file => formData.append('images', file));
      await updateVehicle(id, formData);
      router.push('/admin/vehicles');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading vehicle...</div>;
  if (error) return <ErrorBanner message={error} />;
  if (!form) return null;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold uppercase text-brand-ink mb-6">Edit Vehicle</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Make *</label>
            <input type="text" required value={form.make} onChange={e => setForm({ ...form, make: e.target.value })} className="w-full h-10 border border-admin-border px-3" />
          </div>
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Model *</label>
            <input type="text" required value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} className="w-full h-10 border border-admin-border px-3" />
          </div>
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Year *</label>
            <input type="number" required min="1900" max={new Date().getFullYear() + 1} value={form.year} onChange={e => setForm({ ...form, year: parseInt(e.target.value) })} className="w-full h-10 border border-admin-border px-3" />
          </div>
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Price per Day *</label>
            <input type="number" required min="0" step="0.01" value={form.pricePerDay} onChange={e => setForm({ ...form, pricePerDay: parseFloat(e.target.value) })} className="w-full h-10 border border-admin-border px-3" />
          </div>
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Category *</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full h-10 border border-admin-border px-3">
              <option value="economy">Economy</option>
              <option value="compact">Compact</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
              <option value="van">Van</option>
              <option value="electric">Electric</option>
              <option value="convertible">Convertible</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Fuel Type *</label>
            <select value={form.fuelType} onChange={e => setForm({ ...form, fuelType: e.target.value })} className="w-full h-10 border border-admin-border px-3">
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Transmission *</label>
            <select value={form.transmission} onChange={e => setForm({ ...form, transmission: e.target.value })} className="w-full h-10 border border-admin-border px-3">
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Seats *</label>
            <input type="number" required min="1" max="20" value={form.seats} onChange={e => setForm({ ...form, seats: parseInt(e.target.value) })} className="w-full h-10 border border-admin-border px-3" />
          </div>
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Location (optional)</label>
            <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full h-10 border border-admin-border px-3" />
          </div>
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Currency (EUR)</label>
            <input type="text" value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value.toUpperCase() })} className="w-full h-10 border border-admin-border px-3" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-admin-label uppercase text-brand-muted">Description</label>
          <textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border border-admin-border p-3" />
        </div>

        <div className="space-y-2">
          <label className="text-admin-label uppercase text-brand-muted">Features</label>
          <div className="flex gap-2">
            <input type="text" value={featureInput} onChange={e => setFeatureInput(e.target.value)} className="flex-1 h-10 border border-admin-border px-3" placeholder="e.g., Bluetooth" />
            <button type="button" onClick={addFeature} className="px-4 bg-brand-primary text-white">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.features.map((f: string, i: number) => (
              <span key={i} className="bg-admin-surface-muted px-2 py-1 text-sm flex items-center gap-1">
                {f}
                <button type="button" onClick={() => removeFeature(i)} className="text-brand-danger">✕</button>
              </span>
            ))}
          </div>
        </div>

        {existingImages.length > 0 && (
          <div className="space-y-2">
            <label className="text-admin-label uppercase text-brand-muted">Current Images</label>
            <div className="flex gap-2 flex-wrap">
              {existingImages.map((img, idx) => (
                <img key={idx} src={img.url} alt="Vehicle" className="w-20 h-20 object-cover border" />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-admin-label uppercase text-brand-muted">Add New Images (max 10 total)</label>
          <input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={e => setImageFiles(e.target.files ? Array.from(e.target.files) : [])} className="block w-full" />
          <div className="text-xs text-brand-muted">Selected: {imageFiles.length} file(s)</div>
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="isAvailable" checked={form.isAvailable} onChange={e => setForm({ ...form, isAvailable: e.target.checked })} />
          <label htmlFor="isAvailable" className="text-admin-label uppercase text-brand-muted">Available for booking</label>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={submitting} className="px-6 py-2 bg-brand-primary text-white uppercase font-bold">
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-admin-border uppercase">Cancel</button>
        </div>
      </form>
    </div>
  );
}