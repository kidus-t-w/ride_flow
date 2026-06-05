import { FleetCatalogVehicleCard } from '@/features/fleet-catalog/components/FleetCatalogVehicleCard';
import type { FleetVehicle } from '@/features/fleet-catalog/types';

interface FleetCatalogVehicleGridProps {
  vehicles: FleetVehicle[];
  selectedCarId: string | null;
  onSelectCar: (car: FleetVehicle) => void;
}

export const FleetCatalogVehicleGrid = ({
  vehicles,
  selectedCarId,
  onSelectCar,
}: FleetCatalogVehicleGridProps) => {
  if (vehicles.length === 0) {
    return (
      <div className="w-full text-center py-16 bg-admin-surface border border-admin-border font-light text-brand-muted rounded-none text-dashboard-field">
        No matching vehicles found. Try adjusting your sidebar filter choices.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
      {vehicles.map((car) => (
        <FleetCatalogVehicleCard
          key={car.id}
          car={car}
          isSelected={selectedCarId === car.id}
          onSelect={onSelectCar}
        />
      ))}
    </div>
  );
};
