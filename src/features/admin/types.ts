export type AdminTab =
  | 'FLEET OVERVIEW'
  | 'FLEET MANAGEMENT'
  | 'BLOG PUBLISHER'
  | 'CRYPTO CLEARING'
  | 'RESERVATION';


export const ADMIN_TABS: readonly AdminTab[] = [
  'FLEET OVERVIEW',
  'FLEET MANAGEMENT',
  'BLOG PUBLISHER',
  'CRYPTO CLEARING',
  'RESERVATION',
] as const;

export type FleetFilter = 'ALL' | 'AVAILABLE' | 'ON RENTAL' | 'MAINTENANCE';

export const FLEET_FILTERS: readonly FleetFilter[] = [
  'ALL',
  'AVAILABLE',
  'ON RENTAL',
  'MAINTENANCE',
] as const;

export type VehicleStatus = 'Available' | 'On Rental' | 'Maintenance';

export interface VehicleAsset {
  id: string;
  modelName: string;
  plateNumber: string;
  status: VehicleStatus;
  batteryOrFuel: string;
  currentLocation: string;
}

export type BlogCategory = 'INSIGHTS' | 'ENGINEERING' | 'ANNOUNCEMENTS';

export interface BlogPost {
  id: string;
  title: string;
  category: 'INSIGHTS' | 'ENGINEERING' | 'ANNOUNCEMENTS';
  publishedDate: string;
  author: string;
  status: 'Published' | 'Draft';
  content: string;          
  coverUrl: string;       
}

export type CryptoAsset = 'USDC' | 'BTC' | 'ETH' | 'SOL';

export interface PendingTx {
  txHash: string;
  clientName: string;
  clientEmail: string;
  asset: CryptoAsset;
  amount: string;
  amountUSD: string;
  chain: string;
  status: 'Pending Verification' | 'Cleared';
}

export interface ReservationLog {
  id: string;
  clientName: string;
  vehicleModel: string;
  pickupDate: string;
  returnDate: string;
  allocationStatus: 'Confirmed' | 'Pending Dispatch' | 'Completed';
}

export interface HistoricalEarnings {
  clearedGrossUSD: number;
  fiatWireVolumeUSD: number;
  cryptoSettledUSD: number;
}

export interface FleetAnalytics {
  totalAssets: number;
  countAvailable: number;
  countOnRental: number;
  countMaintenance: number;
  averageEnergy: number;
  pendingVolumeUSD: number;
  totalGrossRevenue: number;
}

export interface AdminUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: 'customer' | 'sales_agent' | 'admin';
  isActive: boolean;
  createdAt: string;
}