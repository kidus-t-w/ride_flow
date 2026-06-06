export type FleetCatalogTab = 'Recommended' | 'Filters' | 'Hot Offers' | 'Premium';

export type RentalRate = 'best' | 'flexible';

export type CheckoutCryptoAsset = 'BTC' | 'ETH' | 'USDC' | 'SOL';

export interface FleetVehicle {
  id: string;
  category: string;
  model: string;
  image: string;
  seats: number;
  bags: number;
  transmission: string;
  fuelType?: string;
  isTopPick: boolean;
  isHotOffer: boolean;
  isPremium: boolean;
  pricePerDay: number;
  totalPrice: number;
  features: string[];
}

export interface FleetCatalogFilters {
  category: string | null; 
  transmission: string | null;      
  fuelType: string | null;      
  minSeats: number | null;
  maxPrice: number | null;  
  onlyHotOffers: boolean;
  onlyPremium: boolean;
  driverAge: string; 
}