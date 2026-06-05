import type { CheckoutCryptoAsset, FleetVehicle, RentalRate } from '@/features/fleet-catalog/types';

export const FLEX_PRICE_ADD = 12.5;
export const RENTAL_DAYS_MULTIPLIER = 4;

export const getFlexDayRate = (pricePerDay: number): number =>
  pricePerDay + FLEX_PRICE_ADD;

export const getFlexTotalPrice = (totalPrice: number): number =>
  totalPrice + FLEX_PRICE_ADD * RENTAL_DAYS_MULTIPLIER;

export const getCheckoutBasePrice = (
  car: FleetVehicle,
  rate: RentalRate
): number =>
  rate === 'best' ? car.totalPrice : getFlexTotalPrice(car.totalPrice);

export const getCryptoAmount = (
  asset: CheckoutCryptoAsset,
  basePriceUsd: number
): string => {
  switch (asset) {
    case 'BTC':
      return (basePriceUsd / 68500).toFixed(5);
    case 'ETH':
      return (basePriceUsd / 3550).toFixed(4);
    case 'SOL':
      return (basePriceUsd / 165).toFixed(2);
    case 'USDC':
      return basePriceUsd.toFixed(2);
  }
};

export const getCryptoRateLabel = (asset: CheckoutCryptoAsset): string => {
  switch (asset) {
    case 'BTC':
      return '$68.5k';
    case 'ETH':
      return '$3.5k';
    case 'SOL':
      return '$165';
    case 'USDC':
      return '$1.00';
  }
};
