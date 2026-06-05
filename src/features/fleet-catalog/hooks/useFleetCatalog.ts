'use client';

import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DEFAULT_FLEET_FILTERS,
  filterFleetVehicles,
} from '@/features/fleet-catalog/lib/fleetCatalogFilters';
import { fetchFleetVehicles } from '@/features/fleet-catalog/services/fleetCatalogService';
import type {
  FleetCatalogFilters,
  FleetVehicle,
  RentalRate,
} from '@/features/fleet-catalog/types';

export const useFleetCatalog = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Recommended');
  const [selectedCar, setSelectedCar] = useState<FleetVehicle | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState<FleetCatalogFilters>({
    ...DEFAULT_FLEET_FILTERS,
  });

  const detailPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchFleetVehicles()
      .then(data => {
        setVehicles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredVehicles = useMemo(
    () => filterFleetVehicles(vehicles, activeFilter, filters),
    [vehicles, activeFilter, filters]
  );

  const handleTabClick = useCallback((tabName: string, triggerPanel?: boolean) => {
    if (triggerPanel) {
      setIsFilterPanelOpen(true);
      return;
    }
    setActiveFilter(tabName);
  }, []);

  const handleCarSelect = useCallback((car: FleetVehicle) => {
    setSelectedCar(car);
    setTimeout(() => {
      detailPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FLEET_FILTERS });
  }, []);

  const updateFilter = useCallback(
    <K extends keyof FleetCatalogFilters>(key: K, value: FleetCatalogFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleFilterPanel = useCallback((open: boolean) => {
    setIsFilterPanelOpen(open);
  }, []);

  const startCheckout = useCallback(
    (car: FleetVehicle, rate: RentalRate) => {
      const params = new URLSearchParams(window.location.search);
      const pickupDate = params.get('pickupDate');
      const returnDate = params.get('returnDate');
      console.log('[Checkout] URL params:', { pickupDate, returnDate });
      if (!pickupDate || !returnDate) {
        alert('Please select pickup and return dates before choosing a vehicle.');
        return;
      }
      let url = `/checkout?carId=${encodeURIComponent(car.id)}&rateId=${rate}`;
      url += `&pickupDate=${encodeURIComponent(pickupDate)}&returnDate=${encodeURIComponent(returnDate)}`;
      router.push(url);
    },
    [router]
  );

  return {
    loading,
    activeFilter,
    selectedCar,
    setSelectedCar,
    isFilterPanelOpen,
    filters,
    detailPanelRef,
    filteredVehicles,
    handleTabClick,
    handleCarSelect,
    clearAllFilters,
    updateFilter,
    toggleFilterPanel,
    startCheckout,
  };
};