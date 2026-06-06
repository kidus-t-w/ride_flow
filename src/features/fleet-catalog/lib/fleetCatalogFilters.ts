import type { FleetCatalogFilters, FleetVehicle } from '@/features/fleet-catalog/types';

export const DEFAULT_FLEET_FILTERS: FleetCatalogFilters = {
  category: null,
  transmission: null,
  fuelType: null,
  minSeats: null,
  maxPrice: null,
  onlyHotOffers: false,
  onlyPremium: false,
  driverAge: '25+',
};

export const filterFleetVehicles = (
  vehicles: FleetVehicle[],
  activeFilter: string,
  filters: FleetCatalogFilters
): FleetVehicle[] =>
  vehicles.filter((car) => {
    if (activeFilter === 'Hot Offers' && !car.isHotOffer) return false;
    if (activeFilter === 'Premium' && !car.isPremium) return false;

    if (filters.category && car.category !== filters.category) return false;

    if (filters.transmission && car.transmission !== filters.transmission) return false;

    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;

    if (filters.minSeats && car.seats < filters.minSeats) return false;

    if (filters.maxPrice && car.pricePerDay > filters.maxPrice) return false;

    if (filters.onlyHotOffers && !car.isHotOffer) return false;

    if (filters.onlyPremium && !car.isPremium) return false;

    return true;
  });