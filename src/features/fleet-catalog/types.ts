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
  isTopPick: boolean;
  isHotOffer: boolean;
  isPremium: boolean;
  pricePerDay: number;
  totalPrice: number;
  features: string[];
}

export interface FleetCatalogFilters {
  selectedType: string | null;
  isPremiumSelected: boolean;
  selectedFeature: string | null;
  selectedSeats: number | null;
  selectedBags: number | null;
  driverAge: string;
}
