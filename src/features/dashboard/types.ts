export type DashboardTab = 'BOOKINGS' | 'ACCOUNT';

export const DASHBOARD_TABS: readonly DashboardTab[] = [
  'BOOKINGS',
  'ACCOUNT',
] as const;

export type AccountSubTab = 'personal' | 'email' | 'address';

export const ACCOUNT_SUB_TABS: readonly {
  id: AccountSubTab;
  label: string;
}[] = [
  { id: 'personal', label: 'Personal information' },
  { id: 'email', label: 'Email' },
  { id: 'address', label: 'Address (optional)' },
] as const;

export type DashboardCryptoAsset = 'USDC' | 'BTC' | 'ETH' | 'SOL';

export interface Booking {
  id: string;
  vehicleModel: string;
  category: string;
  pickupDate: string;
  returnDate: string;
  location: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  pricePaid: string;
  paymentMethod: string;
}

export interface AccountProfile {
  name: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
  country: string;
  organization: string;
  department: string;
  recipient: string;
  street: string;
  number: string;
  additionalAddress: string;
  zipCode: string;
  city: string;
}

export interface CryptoAssetOption {
  ticker: DashboardCryptoAsset;
  chain: string;
}

export interface AddressFormField {
  id: string;
  label: string;
  key: keyof Pick<
    AccountProfile,
    | 'organization'
    | 'department'
    | 'recipient'
    | 'street'
    | 'number'
    | 'additionalAddress'
    | 'zipCode'
    | 'city'
  >;
}
