'use client';

import { useCallback, useState } from 'react';
import { dashboardSeedData } from '@/features/dashboard/services/dashboardService';
import type {
  AccountProfile,
  AccountSubTab,
  Booking,
  DashboardTab,
} from '@/features/dashboard/types';

export const useDashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('BOOKINGS');
  const [accountSubTab, setAccountSubTab] = useState<AccountSubTab>('personal');
  const [bookings] = useState<Booking[]>(() => [...dashboardSeedData.bookings]);
  const [profile, setProfile] = useState<AccountProfile>(() => ({
    ...dashboardSeedData.profile,
  }));
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(
    <K extends keyof AccountProfile>(key: K, value: AccountProfile[K]) => {
      setProfile((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const savePersonalInfo = useCallback(() => {
    alert('Personal parameters saved to system core.');
  }, []);

  const saveAddress = useCallback(() => {
    alert('Address variables saved successfully.');
  }, []);

  const deleteAccount = useCallback(() => {
    confirm('Drop account mapping sequence?');
  }, []);

  const onAddBooking = useCallback(() => {
    alert('Redirecting to vehicle fleet catalog...');
  }, []);

  const onBookNow = useCallback(() => {
    alert('Redirecting to fleet selection...');
  }, []);

  return {
    activeTab,
    setActiveTab,
    accountSubTab,
    setAccountSubTab,
    bookings,
    profile,
    updateProfile,
    savePersonalInfo,
    saveAddress,
    deleteAccount,
    onAddBooking,
    onBookNow,
    error,
    setError,
  };
};
