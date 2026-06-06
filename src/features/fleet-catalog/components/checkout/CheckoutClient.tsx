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
import EthPaymentButton from '@/components/EthPaymentButton';
import { BookingModal } from '@/components/BookingModal';
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

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [selectedCrypto, setSelectedCrypto] = useState<CheckoutCryptoAsset>('USDC');
  const [copied, setCopied] = useState(false);
  const [bookingCreated, setBookingCreated] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [ethPriceUsd, setEthPriceUsd] = useState<number | null>(null);
  const [isSubmittingManual, setIsSubmittingManual] = useState(false);

  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
    buttonText: string;
    onButtonClick: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success',
    buttonText: '',
    onButtonClick: () => {},
  });

  const showModal = (
    type: 'success' | 'error',
    title: string,
    message: string,
    buttonText?: string,
    onButtonClick?: () => void
  ) => {
    setModal({
      isOpen: true,
      title,
      message,
      type,
      buttonText:
        buttonText || (type === 'success' ? 'View Bookings' : 'Go to Homepage'),
      onButtonClick:
        onButtonClick ||
        (() => {
          if (type === 'success') {
            router.push(getBookingRedirectPath());
          } else {
            router.push('/');
          }
        }),
    });
  };

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then((res) => res.json())
      .then((data) => setEthPriceUsd(data.ethereum.usd))
      .catch(() => setEthPriceUsd(3000));
  }, []);

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
  const totalPriceETH = ethPriceUsd ? basePrice / ethPriceUsd : 0;

  const getBookingRedirectPath = () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'admin' ? '/admin/reservations' : '/dashboard/bookings';
  };

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

  const createBookingRecord = async (txHash: string, notes: string) => {
    if (!car || !pickupDate || !returnDate) {
      setError('Missing car or rental dates');
      return;
    }
    try {
      const booking = await createBooking({
        vehicleId: car.id,
        startDate: pickupDate.split('T')[0],
        endDate: returnDate.split('T')[0],
        notes,
      });
      setBookingCreated(true);
      showModal(
        'success',
        'Booking Confirmed!',
        `Booking ID: ${booking.id}. Your rental is now confirmed.`,
        'View My Bookings',
        () => router.push(getBookingRedirectPath())
      );
    } catch (err: any) {
      showModal(
        'error',
        'Booking Failed',
        err.message || 'Unable to complete booking. Please try again.',
        'Go to Homepage',
        () => router.push('/')
      );
    }
  };

  const handleManualPaymentConfirmation = async () => {
    setSubmitted(true);
    if (!isFormValid) return;
    if (!car || !pickupDate || !returnDate) {
      setError('Missing car or rental dates');
      return;
    }
    setIsSubmittingManual(true);
    try {
      const booking = await createBooking({
        vehicleId: car.id,
        startDate: pickupDate.split('T')[0],
        endDate: returnDate.split('T')[0],
        notes: `Payment sent via ${selectedCrypto} to ${depositAddress}. Awaiting admin verification.`,
      });
      showModal(
        'success',
        'Booking Request Submitted',
        `Booking ID: ${booking.id}. Admin will verify your payment and confirm the rental.`,
        'View My Bookings',
        () => router.push(getBookingRedirectPath())
      );
    } catch (err: any) {
      showModal(
        'error',
        'Booking Failed',
        err.message || 'Unable to submit booking request.',
        'Go to Homepage',
        () => router.push('/')
      );
    } finally {
      setIsSubmittingManual(false);
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
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-10">
            <CheckoutDriverForm
              email={email}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              company={company}
              setCompany={setCompany}
              isAgeConfirmed={isAgeConfirmed}
              setIsAgeConfirmed={setIsAgeConfirmed}
              onValidationChange={setIsFormValid}
              submitted={submitted}
            />

            <div className="border border-admin-border p-6 space-y-4">
              <h3 className="text-xl font-bold uppercase text-brand-ink">Pay Instantly with MetaMask</h3>
              <p className="text-sm text-brand-muted">
                Connect your MetaMask wallet and pay with ETH. The booking is created immediately after the transaction is confirmed on the blockchain.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={handleWalletConnect}
                  disabled={isConnecting}
                  className={`h-12 px-6 font-bold text-admin-tab uppercase tracking-wide border transition-colors rounded-none whitespace-nowrap ${
                    isConnected
                      ? 'bg-transparent border-brand-ink text-brand-ink hover:bg-admin-surface-muted'
                      : 'bg-brand-ink border-brand-ink text-admin-surface hover:bg-brand-secondary'
                  }`}
                >
                  {isConnecting
                    ? 'Initializing...'
                    : isConnected
                    ? 'Disconnect Wallet'
                    : 'Connect Web3 Wallet'}
                </button>
                <div className="flex-1 flex items-center justify-between h-12 px-4 bg-admin-surface-muted border border-admin-border rounded-none">
                  <span className="text-admin-tab font-light text-brand-secondary">
                    Status:{' '}
                    <span
                      className={`font-bold uppercase tracking-wide text-[11px] px-1.5 py-0.5 rounded-none ml-1 ${
                        isConnected
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isConnected ? 'Connected' : 'Vault Standby'}
                    </span>
                  </span>
                  {isConnected && address ? (
                    <span className="text-admin-tab font-normal text-brand-muted">
                      Address: {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                  ) : null}
                </div>
              </div>
              {isConnected && ethPriceUsd && totalPriceETH > 0 && (
                <div className="pt-2">
                  <EthPaymentButton
                    carId={carId!}
                    pickupDate={pickupDate!}
                    returnDate={returnDate!}
                    totalPriceETH={totalPriceETH}
                    receiverAddress="0xe70c645e9392ec9e6b9cdb26be4b4885836c401d"
                    redirectPath={getBookingRedirectPath()}
                    disabled={!isFormValid}
                  />
                </div>
              )}
            </div>

            <div className="border border-admin-border p-6 space-y-4">
              <h3 className="text-xl font-bold uppercase text-brand-ink">Manual Crypto Payment</h3>
              <p className="text-sm text-brand-muted">
                Send the exact amount from any wallet or exchange (Binance, Coinbase, etc.). After sending, click the button below. Our admin will verify the transaction and confirm your booking.
              </p>
              <CheckoutPaymentSection
                selectedCrypto={selectedCrypto}
                setSelectedCrypto={setSelectedCrypto}
                cryptoAmount={cryptoAmount}
                depositAddress={depositAddress}
                copied={copied}
                onCopyAddress={copyInvoiceAddress}
              />
              <button
                onClick={handleManualPaymentConfirmation}
                disabled={!isFormValid || isSubmittingManual}
                className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white font-bold uppercase tracking-wide disabled:opacity-50"
              >
                {isSubmittingManual ? 'Submitting...' : 'I have sent the payment'}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <CheckoutSummarySidebar
              car={car}
              pickupDate={safePickupDate}
              returnDate={safeReturnDate}
              pickupLocation="Atlanta Int Airport"
              returnLocation="Atlanta Int Airport"
            />
          </div>
        </div>

        <div className="flex flex-col lg:hidden gap-8">
          <div className="order-1">
            <CheckoutDriverForm
              email={email}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              company={company}
              setCompany={setCompany}
              isAgeConfirmed={isAgeConfirmed}
              setIsAgeConfirmed={setIsAgeConfirmed}
              onValidationChange={setIsFormValid}
              submitted={submitted}
            />
          </div>
          <div className="order-2">
            <CheckoutSummarySidebar
              car={car}
              pickupDate={safePickupDate}
              returnDate={safeReturnDate}
              pickupLocation="Atlanta Int Airport"
              returnLocation="Atlanta Int Airport"
            />
          </div>
          <div className="order-3 space-y-8">
            <div className="border border-admin-border p-6 space-y-4">
              <h3 className="text-xl font-bold uppercase text-brand-ink">Pay Instantly with MetaMask</h3>
              <p className="text-sm text-brand-muted">
                Connect your MetaMask wallet and pay with ETH. The booking is created immediately after the transaction is confirmed on the blockchain.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={handleWalletConnect}
                  disabled={isConnecting}
                  className={`h-12 px-6 font-bold text-admin-tab uppercase tracking-wide border transition-colors rounded-none whitespace-nowrap ${
                    isConnected
                      ? 'bg-transparent border-brand-ink text-brand-ink hover:bg-admin-surface-muted'
                      : 'bg-brand-ink border-brand-ink text-admin-surface hover:bg-brand-secondary'
                  }`}
                >
                  {isConnecting
                    ? 'Initializing...'
                    : isConnected
                    ? 'Disconnect Wallet'
                    : 'Connect Web3 Wallet'}
                </button>
                <div className="flex-1 flex items-center justify-between h-12 px-4 bg-admin-surface-muted border border-admin-border rounded-none">
                  <span className="text-admin-tab font-light text-brand-secondary">
                    Status:{' '}
                    <span
                      className={`font-bold uppercase tracking-wide text-[11px] px-1.5 py-0.5 rounded-none ml-1 ${
                        isConnected
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isConnected ? 'Connected' : 'Vault Standby'}
                    </span>
                  </span>
                  {isConnected && address ? (
                    <span className="text-admin-tab font-normal text-brand-muted">
                      Address: {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                  ) : null}
                </div>
              </div>
              {isConnected && ethPriceUsd && totalPriceETH > 0 && (
                <div className="pt-2">
                  <EthPaymentButton
                    carId={carId!}
                    pickupDate={pickupDate!}
                    returnDate={returnDate!}
                    totalPriceETH={totalPriceETH}
                    receiverAddress="0xe70c645e9392ec9e6b9cdb26be4b4885836c401d"
                    redirectPath={getBookingRedirectPath()}
                    disabled={!isFormValid}
                  />
                </div>
              )}
            </div>

            <div className="border border-admin-border p-6 space-y-4">
              <h3 className="text-xl font-bold uppercase text-brand-ink">Manual Crypto Payment</h3>
              <p className="text-sm text-brand-muted">
                Send exact crypto from any wallet/exchange, then notify admin.
              </p>
              <CheckoutPaymentSection
                selectedCrypto={selectedCrypto}
                setSelectedCrypto={setSelectedCrypto}
                cryptoAmount={cryptoAmount}
                depositAddress={depositAddress}
                copied={copied}
                onCopyAddress={copyInvoiceAddress}
              />
              <button
                onClick={handleManualPaymentConfirmation}
                disabled={!isFormValid || isSubmittingManual}
                className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white font-bold uppercase tracking-wide disabled:opacity-50"
              >
                {isSubmittingManual ? 'Submitting...' : 'I have sent the payment'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={modal.isOpen}
        onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        buttonText={modal.buttonText}
        onButtonClick={modal.onButtonClick}
      />
    </div>
  );
}