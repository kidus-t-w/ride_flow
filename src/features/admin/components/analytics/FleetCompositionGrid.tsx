interface CategoryStats {
    category: string;
    total: number;
  }
  
  interface FuelTypeStats {
    fuelType: string;
    total: number;
  }
  
  interface TransmissionStats {
    transmission: string;
    total: number;
  }
  
  interface FleetCompositionGridProps {
    categories: CategoryStats[];
    fuelTypes: FuelTypeStats[];
    transmissions: TransmissionStats[];
  }
  
  export const FleetCompositionGrid = ({ categories, fuelTypes, transmissions }: FleetCompositionGridProps) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-admin-surface border border-admin-border p-6">
        <h3 className="text-admin-heading-sm font-bold text-brand-ink uppercase mb-3">By Category</h3>
        <div className="space-y-2">
          {categories.map((item) => (
            <div key={item.category} className="flex justify-between">
              <span className="text-brand-muted uppercase">{item.category}</span>
              <span className="font-mono text-brand-ink">{item.total}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-admin-surface border border-admin-border p-6">
        <h3 className="text-admin-heading-sm font-bold text-brand-ink uppercase mb-3">By Fuel Type</h3>
        <div className="space-y-2">
          {fuelTypes.map((item) => (
            <div key={item.fuelType} className="flex justify-between">
              <span className="text-brand-muted uppercase">{item.fuelType}</span>
              <span className="font-mono text-brand-ink">{item.total}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-admin-surface border border-admin-border p-6">
        <h3 className="text-admin-heading-sm font-bold text-brand-ink uppercase mb-3">By Transmission</h3>
        <div className="space-y-2">
          {transmissions.map((item) => (
            <div key={item.transmission} className="flex justify-between">
              <span className="text-brand-muted uppercase">{item.transmission}</span>
              <span className="font-mono text-brand-ink">{item.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );