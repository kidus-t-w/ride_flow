'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FleetCatalogHeader } from '@/features/fleet-catalog/components/FleetCatalogHeader';
import { FleetCatalogTabBar } from '@/features/fleet-catalog/components/FleetCatalogTabBar';
import { FleetCatalogVehicleGrid } from '@/features/fleet-catalog/components/FleetCatalogVehicleGrid';
import { CarDetailPanel } from '@/features/fleet-catalog/components/catalog/CarDetailPanel';
import { FleetFilterPanel } from '@/features/fleet-catalog/components/filters/FleetFilterPanel';
import { FleetCatalogShell } from '@/features/fleet-catalog/components/FleetCatalogShell';
import { FleetCatalogSkeleton } from '@/features/fleet-catalog/components/FleetCatalogSkeleton';
import { fetchFleetVehicles } from '@/features/fleet-catalog/services/fleetCatalogService';
import {
  DEFAULT_FLEET_FILTERS,
  filterFleetVehicles,
} from '@/features/fleet-catalog/lib/fleetCatalogFilters';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { FleetVehicle, FleetCatalogFilters, RentalRate } from '@/features/fleet-catalog/types';
import toast from 'react-hot-toast';


export default function FleetCatalogClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('Recommended');
  const [selectedCar, setSelectedCar] = useState<FleetVehicle | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState<FleetCatalogFilters>({ ...DEFAULT_FLEET_FILTERS });
  const detailPanelRef = useRef<HTMLDivElement>(null);
  

  const redirectToSignup = useCallback((returnUrl: string) => {
    localStorage.setItem('redirectAfterLogin', returnUrl);
    window.open('/signup', '_blank');
  }, []);

  useEffect(() => {
    fetchFleetVehicles()
      .then(setVehicles)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredVehicles = filterFleetVehicles(vehicles, activeFilter, filters);

  const handleTabClick = useCallback((tabName: string, triggerPanel?: boolean) => {
    if (triggerPanel) {
      setSelectedCar(null);
      setIsFilterPanelOpen(true);
      return;
    }
    setActiveFilter(tabName);
  }, []);

  const handleCarSelect = useCallback((car: FleetVehicle) => {
    if (selectedCar?.id === car.id) {
      setSelectedCar(null);
    } else {
      setSelectedCar(car);
      setTimeout(() => {
        detailPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [selectedCar]);

  const clearAllFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FLEET_FILTERS });
  }, []);

  const updateFilter = useCallback(<K extends keyof FleetCatalogFilters>(key: K, value: FleetCatalogFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const startCheckout = useCallback((car: FleetVehicle, rate: RentalRate) => {
    const pickupDate = searchParams.get('pickupDate');
    const returnDate = searchParams.get('returnDate');
    if (!pickupDate || !returnDate) {
      alert('Please select pickup and return dates before choosing a vehicle.');
      return;
    }
    const url = `/checkout?carId=${encodeURIComponent(car.id)}&rateId=${rate}&pickupDate=${encodeURIComponent(pickupDate)}&returnDate=${encodeURIComponent(returnDate)}`;
    const token = localStorage.getItem('accessToken');
    if (!token) {
      redirectToSignup(url);
      return;
    }
    router.push(url);
  }, [router, searchParams, redirectToSignup]);

  const handleBook = useCallback((car: FleetVehicle, totalPrice: number) => {
    const pickupDate = searchParams.get('pickupDate');
    const returnDate = searchParams.get('returnDate');
    if (!pickupDate || !returnDate) {
      toast.error('Please select pickup and return dates before choosing a vehicle.');
      return;
    }
    const url = `/checkout?carId=${car.id}&pickupDate=${encodeURIComponent(pickupDate)}&returnDate=${encodeURIComponent(returnDate)}&totalPrice=${totalPrice}`;
    const token = localStorage.getItem('accessToken');
    if (!token) {
      redirectToSignup(url);
      return;
    }
    router.push(url);
  }, [router, searchParams, redirectToSignup]);

  if (loading) return <FleetCatalogSkeleton />;
  if (error) return <ErrorBanner message={error} />;

  return (
    <FleetCatalogShell>
      <FleetCatalogHeader />
      <FleetCatalogTabBar activeFilter={activeFilter} onTabClick={handleTabClick} />
      <FleetCatalogVehicleGrid
        vehicles={filteredVehicles}
        selectedCarId={selectedCar?.id ?? null}
        onSelectCar={handleCarSelect}
      />
      {selectedCar && (
        <div ref={detailPanelRef} className="transition-all duration-300">
          <CarDetailPanel
            car={selectedCar}
            pickupDate={searchParams.get('pickupDate')!}
            returnDate={searchParams.get('returnDate')!}
            onClose={() => setSelectedCar(null)}
            onBook={handleBook}
          />
        </div>
      )}
      <FleetFilterPanel
        isOpen={isFilterPanelOpen}
        filters={filters}
        resultCount={filteredVehicles.length}
        onClose={() => setIsFilterPanelOpen(false)}
        onClearAll={clearAllFilters}
        onUpdate={updateFilter}
      />
    </FleetCatalogShell>
  );
}