'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, User, MapPin, Plus } from 'lucide-react';

interface SearchFormData {
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  driverAge: string;
  differentReturn: boolean;
}

export const CarSearchWidget = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SearchFormData>({
    pickupLocation: 'Atlanta Int Airport',
    returnLocation: 'Atlanta Int Airport',
    pickupDate: getDefaultPickupDate(),
    returnDate: getDefaultReturnDate(),
    driverAge: '30',
    differentReturn: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SearchFormData, string>>>({});

  function getDefaultPickupDate() {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    return date.toISOString().slice(0, 16);
  }
  function getDefaultReturnDate() {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    date.setHours(12, 0, 0, 0);
    return date.toISOString().slice(0, 16);
  }

  const handleChange = (field: keyof SearchFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SearchFormData, string>> = {};

    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Please enter pickup location';
    if (formData.differentReturn && !formData.returnLocation.trim())
      newErrors.returnLocation = 'Please enter return location';
    if (!formData.pickupDate) newErrors.pickupDate = 'Please select pickup date & time';
    if (!formData.returnDate) newErrors.returnDate = 'Please select return date & time';
    if (formData.pickupDate && formData.returnDate && new Date(formData.pickupDate) >= new Date(formData.returnDate))
      newErrors.returnDate = 'Return date must be after pickup date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const params = new URLSearchParams();
    params.set('pickupLocation', formData.pickupLocation);
    params.set('returnLocation', formData.differentReturn ? formData.returnLocation : formData.pickupLocation);
    params.set('pickupDate', formData.pickupDate);
    params.set('returnDate', formData.returnDate);
    params.set('driverAge', formData.driverAge);
    if (!formData.differentReturn) params.set('sameReturn', 'true');

    router.push(`/fleetcatalog?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-admin-surface border border-admin-border p-6 shadow-xl w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-4 border-b border-admin-border">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-brand-primary" />
          <span className="text-[13px] font-bold uppercase tracking-[1.5px] text-brand-ink">
            Find Your Vehicle
          </span>
        </div>
        <a
          href="#booking-lookup"
          className="text-[13px] font-bold uppercase tracking-[1.5px] text-brand-ink underline hover:text-brand-primary transition-colors"
        >
          View / edit my booking
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
        <div className="lg:col-span-5 flex flex-col gap-1.5">
          <label className="text-xs font-medium tracking-wide text-brand-muted uppercase">
            Pickup & Return Location
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-brand-ink">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <input
              type="text"
              value={formData.pickupLocation}
              onChange={(e) => handleChange('pickupLocation', e.target.value)}
              placeholder="Enter airport or city location"
              className={`w-full h-12 pl-11 pr-4 bg-admin-surface border text-brand-ink font-light text-base placeholder-brand-subtle focus:outline-none focus:border-brand-ink transition-colors ${
                errors.pickupLocation ? 'border-brand-danger' : 'border-admin-border'
              }`}
            />
          </div>
          {errors.pickupLocation && (
            <p className="text-brand-danger text-xs mt-1">{errors.pickupLocation}</p>
          )}
        </div>

        <div className="lg:col-span-2 flex items-center justify-start h-12 pb-1">
          <button
            type="button"
            onClick={() => handleChange('differentReturn', !formData.differentReturn)}
            className="text-sm font-light text-brand-secondary hover:text-brand-ink flex items-center gap-1 transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            {formData.differentReturn ? 'Same return' : 'Different return'}
          </button>
        </div>

        <div className="lg:col-span-3 grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium tracking-wide text-brand-muted uppercase">
              Pickup Date
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-brand-ink">
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <input
                type="datetime-local"
                value={formData.pickupDate}
                onChange={(e) => handleChange('pickupDate', e.target.value)}
                className={`w-full h-12 pl-9 pr-2 bg-admin-surface border text-brand-ink font-light text-sm focus:outline-none focus:border-brand-ink ${
                  errors.pickupDate ? 'border-brand-danger' : 'border-admin-border'
                }`}
              />
            </div>
            {errors.pickupDate && <p className="text-brand-danger text-xs mt-1">{errors.pickupDate}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium tracking-wide text-brand-muted uppercase">
              Return Date
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-brand-ink">
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <input
                type="datetime-local"
                value={formData.returnDate}
                onChange={(e) => handleChange('returnDate', e.target.value)}
                className={`w-full h-12 pl-9 pr-2 bg-admin-surface border text-brand-ink font-light text-sm focus:outline-none focus:border-brand-ink ${
                  errors.returnDate ? 'border-brand-danger' : 'border-admin-border'
                }`}
              />
            </div>
            {errors.returnDate && <p className="text-brand-danger text-xs mt-1">{errors.returnDate}</p>}
          </div>
        </div>

        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full h-12 bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold tracking-wide transition-colors duration-150 uppercase"
          >
            Show Cars
          </button>
        </div>
      </div>

      {formData.differentReturn && (
        <div className="mt-4 pt-2 grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-5 flex flex-col gap-1.5">
            <label className="text-xs font-medium tracking-wide text-brand-muted uppercase">
              Return Location
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-brand-ink">
                <MapPin className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <input
                type="text"
                value={formData.returnLocation}
                onChange={(e) => handleChange('returnLocation', e.target.value)}
                placeholder="Enter return airport or city"
                className={`w-full h-12 pl-11 pr-4 bg-admin-surface border text-brand-ink font-light text-base placeholder-brand-subtle focus:outline-none focus:border-brand-ink ${
                  errors.returnLocation ? 'border-brand-danger' : 'border-admin-border'
                }`}
              />
            </div>
            {errors.returnLocation && <p className="text-brand-danger text-xs mt-1">{errors.returnLocation}</p>}
          </div>
        </div>
      )}

      <div className="mt-4 pt-2 flex items-center gap-2 text-sm text-brand-secondary font-light">
        <User className="w-4 h-4" strokeWidth={1.5} />
        <label htmlFor="driver-age" className="cursor-pointer">
          Driver&apos;s age:
        </label>
        <select
          id="driver-age"
          value={formData.driverAge}
          onChange={(e) => handleChange('driverAge', e.target.value)}
          className="bg-transparent font-bold text-brand-ink focus:outline-none cursor-pointer border-b border-dashed border-brand-muted"
        >
          <option value="30">30+</option>
          <option value="25">25-29</option>
          <option value="21">21-24</option>
        </select>
      </div>
    </form>
  );
};