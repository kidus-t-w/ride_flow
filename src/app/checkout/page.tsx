import { Suspense } from 'react';
import CheckoutClient from '../../features/fleet-catalog/components/checkout/CheckoutClient';;

interface PageProps {
  searchParams: Promise<{ carId?: string; rateId?: string; pickupDate?: string; returnDate?: string }> | { carId?: string; rateId?: string; pickupDate?: string; returnDate?: string };
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const carId = params.carId ?? null;
  const rateId = params.rateId ?? null;
  const pickupDate = params.pickupDate ?? null;
  const returnDate = params.returnDate ?? null;

  return (
    <Suspense fallback={<div className="p-8 text-center">Loading checkout...</div>}>
      <CheckoutClient carId={carId} rateId={rateId} pickupDate={pickupDate} returnDate={returnDate} />
    </Suspense>
  );
}