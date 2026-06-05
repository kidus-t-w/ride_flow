'use client';

import { FLEET_FILTERS, type FleetFilter } from '@/features/admin/types';

interface FleetFilterBarProps {
  fleetFilter: FleetFilter;
  onFilterChange: (filter: FleetFilter) => void;
}

export const FleetFilterBar = ({ fleetFilter, onFilterChange }: FleetFilterBarProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
    <h2 className="text-admin-section-title text-brand-ink uppercase tracking-tight">
      LIVE OPERATION STREAM
    </h2>
    <div className="flex space-x-2">
      {FLEET_FILTERS.map((st) => (
        <button
          key={st}
          type="button"
          onClick={() => onFilterChange(st)}
          className={`text-admin-filter px-4 py-2 uppercase border rounded-none transition-all cursor-pointer ${
            fleetFilter === st
              ? 'bg-brand-ink border-brand-ink text-admin-surface'
              : 'bg-admin-surface border-admin-border text-brand-ink hover:border-admin-border-strong'
          }`}
        >
          {st}
        </button>
      ))}
    </div>
  </div>
);
