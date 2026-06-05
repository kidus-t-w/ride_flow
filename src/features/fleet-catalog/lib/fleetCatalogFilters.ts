import type { FleetCatalogFilters, FleetVehicle } from '@/features/fleet-catalog/types';

export const DEFAULT_FLEET_FILTERS: FleetCatalogFilters = {
  selectedType: null,
  isPremiumSelected: false,
  selectedFeature: null,
  selectedSeats: null,
  selectedBags: null,
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

    if (
      filters.selectedType &&
      !car.category.toLowerCase().includes(filters.selectedType.toLowerCase())
    ) {
      return false;
    }
    if (filters.isPremiumSelected && !car.isPremium) return false;
    if (filters.selectedSeats && car.seats !== filters.selectedSeats) return false;
    if (filters.selectedBags && car.bags !== filters.selectedBags) return false;
    if (filters.selectedFeature === 'Automatic' && car.transmission !== 'Automatic') {
      return false;
    }
    if (filters.selectedFeature === 'Hot offers' && !car.isHotOffer) return false;

    return true;
  });
