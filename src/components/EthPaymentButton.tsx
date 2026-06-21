'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBooking } from '@/features/fleet-catalog/services/fleetCatalogService';

interface EthPaymentButtonProps {
  carId: string;
  pickupDate: string;
  returnDate: string;
  totalPriceETH: number;
  receiverAddress: string;
  redirectPath?: string;
  disabled?: boolean;
  driverEmail: string;
  driverFirstName: string;
  driverLastName: string;
  driverPhone: string;
  driverCompany?: string;
}

const isValidEthAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export default function EthPaymentButton({
  carId,
  pickupDate,
  returnDate,
  totalPriceETH,
  receiverAddress,
  redirectPath = '/dashboard/bookings',
  disabled = false,
  driverEmail,
  driverFirstName,
  driverLastName,
  driverPhone,
  driverCompany,
}: EthPaymentButtonProps) {
  const [state, setState] = useState<'idle' | 'connecting' | 'sending' | 'confirming' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePay = async () => {
    if (disabled) {
      setError('Please fill all required driver information before paying.');
      setState('error');
      return;
    }

    setState('connecting');
    setError(null);

    if (!isValidEthAddress(receiverAddress)) {
      setError('Invalid receiver address. Please contact support.');
      setState('error');
      return;
    }

    if (totalPriceETH <= 0) {
      setError('Payment amount is zero or negative.');
      setState('error');
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask to pay with ETH.');
      setState('error');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log('Connected account:', account);

      const amountInWei = BigInt(Math.floor(totalPriceETH * 1e18));
      const txParams = {
        from: account,
        to: receiverAddress,
        value: '0x' + amountInWei.toString(16),
        gas: '0x5208',
      };

      setState('sending');
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txParams],
      });
      console.log('Transaction hash:', txHash);

      setState('confirming');

      // Poll for transaction receipt
      let receipt = null;
      for (let i = 0; i < 30; i++) {
        receipt = await window.ethereum.request({
          method: 'eth_getTransactionReceipt',
          params: [txHash],
        });
        if (receipt) break;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      if (!receipt || receipt.status !== '0x1') {
        throw new Error('Transaction failed or not confirmed in time');
      }

      // Build driver info for notes
      const driverInfo = `Driver: ${driverFirstName} ${driverLastName}, ${driverEmail}, ${driverPhone}${driverCompany ? `, Company: ${driverCompany}` : ''}`;
      const notes = `Paid with ETH, tx: ${txHash} | ${driverInfo}`;

      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleId: carId,
          startDate: pickupDate.split('T')[0],
          endDate: returnDate.split('T')[0],
          notes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Booking creation failed');
      }

      const data = await response.json();
      alert(`Booking confirmed! Booking ID: ${data.booking.id}`);
      router.push(redirectPath);
    } catch (err: any) {
      console.error('Payment/booking error:', err);
      let userMessage = 'Transaction failed. Please try again.';
      if (err.code === 4001 || err.message?.includes('User denied')) {
        userMessage = 'You cancelled the transaction. You can try again.';
      } else if (err.message) {
        userMessage = err.message;
      }
      setError(userMessage);
      setState('error');
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handlePay}
        disabled={disabled || state === 'connecting' || state === 'sending' || state === 'confirming'}
        className="w-full bg-brand-primary text-white font-bold py-3 px-4 uppercase tracking-wide disabled:opacity-50"
      >
        {state === 'idle' && 'Pay with ETH (MetaMask)'}
        {state === 'connecting' && 'Connecting wallet...'}
        {state === 'sending' && 'Sending transaction...'}
        {state === 'confirming' && 'Confirming transaction...'}
        {state === 'error' && 'Retry ETH Payment'}
      </button>
      {error && <p className="text-brand-danger text-sm">{error}</p>}
      <p className="text-xs text-center text-brand-muted">
        You will pay {totalPriceETH.toFixed(6)} ETH (plus gas fees).
      </p>
    </div>
  );
}