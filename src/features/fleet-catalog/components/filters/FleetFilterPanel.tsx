'use client';

import { FilterChip } from './FilterChip';
import { FilterSection } from './FilterSection';
import type { FleetCatalogFilters } from '../../types';
import { X, Car, Settings, Fuel, Users, DollarSign, Flame, Gem } from 'lucide-react';

interface Props {
  isOpen: boolean;
  filters: FleetCatalogFilters;
  resultCount: number;
  onClose: () => void;
  onClearAll: () => void;
  onUpdate: <K extends keyof FleetCatalogFilters>(key: K, value: FleetCatalogFilters[K]) => void;
}

export const FleetFilterPanel = ({
  isOpen,
  filters,
  resultCount,
  onClose,
  onClearAll,
  onUpdate,
}: Props) => {
  const updateNumber = (key: 'minSeats' | 'maxPrice', value: string) => {
    const num = value === '' ? null : parseInt(value, 10);
    onUpdate(key, num);
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-[440px] bg-admin-surface z-50 shadow-xl transition-transform duration-300 transform flex flex-col border-r border-admin-border ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-admin-border flex justify-between items-center">
          <button onClick={onClose} className="text-brand-ink hover:text-brand-primary">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-admin-tab uppercase text-brand-ink">Filters</h2>
          <button onClick={onClearAll} className="text-admin-tab text-brand-muted hover:text-brand-primary uppercase">
            Clear All
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <FilterSection title="Vehicle Category">
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'economy', label: 'Economy', icon: <Car className="w-4 h-4" /> },
                { value: 'compact', label: 'Compact', icon: <Car className="w-4 h-4" /> },
                { value: 'suv', label: 'SUV', icon: <Car className="w-4 h-4" /> },
                { value: 'luxury', label: 'Luxury', icon: <Gem className="w-4 h-4" /> },
                { value: 'van', label: 'Van', icon: <Car className="w-4 h-4" /> },
                { value: 'electric', label: 'Electric', icon: <Fuel className="w-4 h-4" /> },
                { value: 'convertible', label: 'Convertible', icon: <Car className="w-4 h-4" /> },
              ].map((opt) => (
                <FilterChip
                  key={opt.value}
                  label={opt.label}
                  icon={opt.icon}
                  isActive={filters.category === opt.value}
                  onClick={() => onUpdate('category', filters.category === opt.value ? null : opt.value)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Transmission">
            <div className="flex gap-2">
              <FilterChip
                label="Manual"
                icon={<Settings className="w-4 h-4" />}
                isActive={filters.transmission === 'manual'}
                onClick={() => onUpdate('transmission', filters.transmission === 'manual' ? null : 'manual')}
              />
              <FilterChip
                label="Automatic"
                icon={<Settings className="w-4 h-4" />}
                isActive={filters.transmission === 'automatic'}
                onClick={() => onUpdate('transmission', filters.transmission === 'automatic' ? null : 'automatic')}
              />
            </div>
          </FilterSection>

          <FilterSection title="Fuel Type">
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'petrol', label: 'Petrol', icon: <Fuel className="w-4 h-4" /> },
                { value: 'diesel', label: 'Diesel', icon: <Fuel className="w-4 h-4" /> },
                { value: 'electric', label: 'Electric', icon: <Fuel className="w-4 h-4" /> },
                { value: 'hybrid', label: 'Hybrid', icon: <Fuel className="w-4 h-4" /> },
              ].map((opt) => (
                <FilterChip
                  key={opt.value}
                  label={opt.label}
                  icon={opt.icon}
                  isActive={filters.fuelType === opt.value}
                  onClick={() => onUpdate('fuelType', filters.fuelType === opt.value ? null : opt.value)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Minimum Seats">
            <div className="flex gap-2">
              {[2, 4, 5, 7].map((num) => (
                <FilterChip
                  key={num}
                  label={String(num)}
                  isActive={filters.minSeats === num}
                  onClick={() => onUpdate('minSeats', filters.minSeats === num ? null : num)}
                  className="w-9 justify-center px-0"
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Max Price per Day (EUR)">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                {[50, 100, 150, 200].map((price) => (
                  <FilterChip
                    key={price}
                    label={`€${price}`}
                    isActive={filters.maxPrice === price}
                    onClick={() => onUpdate('maxPrice', filters.maxPrice === price ? null : price)}
                  />
                ))}
                {filters.maxPrice && ![50, 100, 150, 200].includes(filters.maxPrice) && (
                  <FilterChip
                    label={`€${filters.maxPrice}`}
                    isActive={true}
                    onClick={() => onUpdate('maxPrice', null)}
                  />
                )}
              </div>
              <input
                type="number"
                placeholder="Custom max price"
                value={filters.maxPrice ?? ''}
                onChange={(e) => updateNumber('maxPrice', e.target.value)}
                className="border border-admin-border px-3 py-2 text-sm"
              />
            </div>
          </FilterSection>

          <FilterSection title="Special Offers">
            <div className="flex flex-col gap-2">
              <FilterChip
                label="Hot Offers"
                icon={<Flame className="w-4 h-4" />}
                isActive={filters.onlyHotOffers}
                onClick={() => onUpdate('onlyHotOffers', !filters.onlyHotOffers)}
              />
              <FilterChip
                label="Premium"
                icon={<Gem className="w-4 h-4" />}
                isActive={filters.onlyPremium}
                onClick={() => onUpdate('onlyPremium', !filters.onlyPremium)}
              />
            </div>
          </FilterSection>

          <FilterSection title="Driver Age">
            <div className="flex flex-wrap gap-2">
              {['21', '22', '23', '24', '25+'].map((age) => (
                <FilterChip
                  key={age}
                  label={age}
                  isActive={filters.driverAge === age}
                  onClick={() => onUpdate('driverAge', age)}
                />
              ))}
            </div>
          </FilterSection>
        </div>

        <div className="p-4 border-t border-admin-border">
          <button
            onClick={onClose}
            className="w-full h-12 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold uppercase tracking-wide"
          >
            Show {resultCount} vehicles
          </button>
        </div>
      </div>
    </>
  );
};