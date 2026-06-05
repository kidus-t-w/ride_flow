'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import { CheckoutDriverForm } from '@/features/fleet-catalog/components/checkout/CheckoutDriverForm';
import { CheckoutHeader } from '@/features/fleet-catalog/components/checkout/CheckoutHeader';
import { CheckoutPaymentSection } from '@/features/fleet-catalog/components/checkout/CheckoutPaymentSection';
import { CheckoutSummarySidebar } from '@/features/fleet-catalog/components/checkout/CheckoutSummarySidebar';
import {
  getFleetVehicleById,
  getInvoiceDepositAddress,
  createBooking,
} from '@/features/fleet-catalog/services/fleetCatalogService';
import {
  getCheckoutBasePrice,
  getCryptoAmount,
} from '@/features/fleet-catalog/lib/fleetCatalogPricing';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { FleetVehicle, CheckoutCryptoAsset, RentalRate } from '@/features/fleet-catalog/types';

const isRentalRate = (value: string | null): value is RentalRate =>
  value === 'best' || value === 'flexible';

interface CheckoutClientProps {
  carId: string | null;
  rateId: string | null;
  pickupDate: string | null;
  returnDate: string | null;
}

export default function CheckoutClient({ carId, rateId, pickupDate, returnDate }: CheckoutClientProps) {
  const router = useRouter();
  const { address, isConnected, connectWallet, disconnectWallet, isConnecting } = useWalletConnection();

  const [car, setCar] = useState<FleetVehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectedRate = isRentalRate(rateId) ? rateId : 'best';

  // Driver form state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(true);

  const [selectedCrypto, setSelectedCrypto] = useState<CheckoutCryptoAsset>('USDC');
  const [copied, setCopied] = useState(false);
  const [bookingCreated, setBookingCreated] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    if (!carId) {
      setError('No car selected');
      setLoading(false);
      return;
    }
    getFleetVehicleById(carId)
      .then((vehicle) => {
        if (!vehicle) throw new Error('Vehicle not found');
        setCar(vehicle);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [carId]);

  const basePrice = car ? getCheckoutBasePrice(car, selectedRate) : 0;
  const totalMainStr = Math.floor(basePrice).toString();
  const cryptoAmount = getCryptoAmount(selectedCrypto, basePrice);
  const depositAddress = getInvoiceDepositAddress(selectedCrypto);

  const handleWalletConnect = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  const copyInvoiceAddress = useCallback(async () => {
    await navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [depositAddress]);

  const handlePay = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    setIsProcessingPayment(true);
    setTimeout(async () => {
      const fakeTxHash = '0x' + Math.random().toString(36).substring(2, 10);
      setTransactionHash(fakeTxHash);
      setIsProcessingPayment(false);
      alert('Payment confirmed! Creating booking...');
      await createBookingRecord(fakeTxHash);
    }, 2000);
  };

  const createBookingRecord = async (txHash: string) => {
    if (!car || !pickupDate || !returnDate) {
      setError('Missing car or rental dates');
      return;
    }
    try {
      const booking = await createBooking({
        vehicleId: car.id,
        startDate: pickupDate.split('T')[0],
        endDate: returnDate.split('T')[0],
        notes: `Paid with ${selectedCrypto}, transaction: ${txHash}`,
      });
      setBookingCreated(true);
      alert(`Booking confirmed! Booking ID: ${booking.id}`);
      router.push('/dashboard/bookings');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const goBack = () => router.push('/fleetcatalog');

  if (loading) return <div className="p-8 text-center">Loading checkout...</div>;
  if (error || !car) return <ErrorBanner message={error || 'Car data unavailable'} />;

  const safePickupDate = pickupDate || '';
  const safeReturnDate = returnDate || '';
  const safeWalletAddress = address ?? null;

  return (
    <div className="w-full bg-admin-surface min-h-screen text-brand-ink py-12 px-4 md:px-8 animate-in fade-in duration-200">
      <div className="max-w-admin-container mx-auto">
        <CheckoutHeader totalMainStr={totalMainStr} onBack={goBack} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-10">
            <CheckoutDriverForm
              email={email}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              company={company}
              setCompany={setCompany}
              isAgeConfirmed={isAgeConfirmed}
              setIsAgeConfirmed={setIsAgeConfirmed}
            />

            <CheckoutPaymentSection
              selectedCrypto={selectedCrypto}
              setSelectedCrypto={setSelectedCrypto}
              cryptoAmount={cryptoAmount}
              isWalletConnected={isConnected}
              isConnecting={isConnecting}
              walletAddress={safeWalletAddress}
              copied={copied}
              depositAddress={depositAddress}
              onWalletConnect={handleWalletConnect}
              onCopyAddress={copyInvoiceAddress}
            />

            <div className="pt-4">
              <button
                onClick={handlePay}
                disabled={!isConnected || isProcessingPayment || bookingCreated}
                className="w-full h-12 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold uppercase tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessingPayment
                  ? 'Processing payment...'
                  : bookingCreated
                    ? 'Booking confirmed'
                    : `Pay ${cryptoAmount} ${selectedCrypto}`}
              </button>
            </div>
          </div>

          <CheckoutSummarySidebar
            car={car}
            pickupDate={safePickupDate}
            returnDate={safeReturnDate}
            pickupLocation="Atlanta Int Airport"
            returnLocation="Atlanta Int Airport"
          />
        </div>
      </div>
    </div>
  );
}