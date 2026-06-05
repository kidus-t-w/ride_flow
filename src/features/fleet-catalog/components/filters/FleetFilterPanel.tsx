'use client';

import { FilterChip } from '@/features/fleet-catalog/components/filters/FilterChip';
import { FilterSection } from '@/features/fleet-catalog/components/filters/FilterSection';
import type { FleetCatalogFilters } from '@/features/fleet-catalog/types';
import { X, Car, CarFront, Bus, Gem, Settings, Flame, Zap } from 'lucide-react';

interface FleetFilterPanelProps {
  isOpen: boolean;
  filters: FleetCatalogFilters;
  resultCount: number;
  onClose: () => void;
  onClearAll: () => void;
  onUpdate: <K extends keyof FleetCatalogFilters>(
    key: K,
    value: FleetCatalogFilters[K]
  ) => void;
}

export const FleetFilterPanel = ({
  isOpen,
  filters,
  resultCount,
  onClose,
  onClearAll,
  onUpdate,
}: FleetFilterPanelProps) => (
  <>
    <div
      role="presentation"
      onClick={onClose}
      className={`fixed inset-0 bg-brand-ink-emphasis/40 z-40 transition-opacity duration-300 backdrop-blur-xs ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    />

    <div
      className={`fixed top-0 left-0 h-full w-full sm:w-[440px] bg-admin-surface z-50 shadow-xl transition-transform duration-300 transform flex flex-col justify-between border-r border-admin-border rounded-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-6 border-b border-admin-border flex justify-between items-center bg-admin-surface">
        <button
          type="button"
          onClick={onClose}
          className="text-brand-ink hover:text-brand-primary text-xl font-light w-8 h-8 flex items-center justify-start transition-colors"
          aria-label="Close filters"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <h2 className="text-admin-tab uppercase text-brand-ink">Filters</h2>
        <button
          type="button"
          onClick={onClearAll}
          className="text-admin-tab text-brand-muted hover:text-brand-primary uppercase transition-colors bg-transparent border-none rounded-none"
        >
          Clear All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-admin-surface">
        <FilterSection title="Vehicle type">
          <div className="flex flex-wrap gap-2">
            {[
              { type: 'Sedan', icon: <Car className="w-4 h-4" strokeWidth={1.5} /> },
              { type: 'SUV', icon: <CarFront className="w-4 h-4" strokeWidth={1.5} /> },
              { type: 'Family car', icon: <Bus className="w-4 h-4" strokeWidth={1.5} /> },
            ].map(({ type, icon }) => (
              <FilterChip
                key={type}
                label={type}
                icon={icon}
                isActive={filters.selectedType === type}
                onClick={() =>
                  onUpdate('selectedType', filters.selectedType === type ? null : type)
                }
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Features">
          <div className="flex flex-wrap gap-2">
            {[
              { feat: 'Automatic', icon: <Settings className="w-4 h-4" strokeWidth={1.5} /> },
              { feat: 'Hot offers', icon: <Flame className="w-4 h-4" strokeWidth={1.5} /> },
              { feat: 'High performance', icon: <Zap className="w-4 h-4" strokeWidth={1.5} /> },
            ].map(({ feat, icon }) => (
              <FilterChip
                key={feat}
                label={feat}
                icon={icon}
                isActive={filters.selectedFeature === feat}
                onClick={() =>
                  onUpdate(
                    'selectedFeature',
                    filters.selectedFeature === feat ? null : feat
                  )
                }
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Minimum number of seats">
          <div className="flex gap-2">
            {[5, 7].map((num) => (
              <FilterChip
                key={num}
                label={String(num)}
                isActive={filters.selectedSeats === num}
                onClick={() =>
                  onUpdate('selectedSeats', filters.selectedSeats === num ? null : num)
                }
                className="w-9 justify-center px-0"
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Bags">
          <div className="flex gap-2">
            {[2, 3, 4].map((num) => (
              <FilterChip
                key={num}
                label={String(num)}
                isActive={filters.selectedBags === num}
                onClick={() =>
                  onUpdate('selectedBags', filters.selectedBags === num ? null : num)
                }
                className="w-9 justify-center px-0"
              />
            ))}
          </div>
        </FilterSection>

      </div>

      <div className="p-4 bg-admin-surface border-t border-admin-border">
        <button
          type="button"
          onClick={onClose}
          className="w-full h-12 bg-brand-primary hover:bg-brand-primary-hover text-admin-surface font-bold text-dashboard-cta uppercase tracking-wide transition-colors border-none rounded-none px-8 py-3.5"
        >
          Show {resultCount} vehicles
        </button>
      </div>
    </div>
  </>
);
