import { api } from '@/lib/api/client';
import type { FleetVehicle, CheckoutCryptoAsset } from '../types';

export const fetchFleetVehicles = async (): Promise<FleetVehicle[]> => {
  const res = await api.get<{ vehicles: any[] }>('/vehicles?limit=50');
  return res.vehicles.map((v: any) => ({
    id: v._id,
    category: v.category,
    model: `${v.make} ${v.model}`,
    image: v.images?.[0]?.url || '/images/placeholder-car.jpg',
    seats: v.seats,
    bags: 2, 
    transmission: v.transmission,
    isTopPick: false, 
    isHotOffer: false, 
    isPremium: v.category === 'luxury',
    pricePerDay: v.pricePerDay,
    totalPrice: v.pricePerDay * 4, 
    features: v.features || [],
  }));
};

export const getFleetVehicleById = async (id: string): Promise<FleetVehicle | null> => {
  try {
    const res = await api.get<{ vehicle: any }>(`/vehicles/${id}`);
    const v = res.vehicle;
    return {
      id: v._id,
      category: v.category,
      model: `${v.make} ${v.model}`,
      image: v.images?.[0]?.url || '/images/placeholder-car.jpg',
      seats: v.seats,
      bags: 2,
      transmission: v.transmission,
      isTopPick: false,
      isHotOffer: false,
      isPremium: v.category === 'luxury',
      pricePerDay: v.pricePerDay,
      totalPrice: v.pricePerDay * 4,
      features: v.features || [],
    };
  } catch {
    return null;
  }
};

export const getInvoiceDepositAddress = (asset: CheckoutCryptoAsset): string => {
  const addresses = {
    USDC: '0x9E2a4C8Fd40F7831B6839351C9Bf3900A45e75D4',
    ETH: '0x9E2a4C8Fd40F7831B6839351C9Bf3900A45e75D4',
    BTC: 'bc1q...',
    SOL: 'BwZ8vK74mX92pkSLe94wQrtZ1A6v7xYp',
  };
  return addresses[asset];
};

export const connectCheckoutWallet = async (): Promise<{ address: string }> => {
  return { address: '0xUserWalletAddress' };
};

export const createBooking = async (data: {
  vehicleId: string;
  startDate: string;
  endDate: string;
  notes?: string;
}): Promise<any> => {
  const res = await api.post<{ booking: any }>('/bookings', data);
  return res.booking;
};