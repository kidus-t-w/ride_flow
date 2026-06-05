'use client';

import { useState, useEffect } from 'react';
import {
  fetchOverviewStats,
  fetchRevenueData,
  fetchMostBookedVehicles,
  fetchFleetStats,
  fetchRecentBookings,
} from '@/features/admin/services/adminService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import { MetricCard } from '@/features/admin/components/analytics/MetricCard';
import { BookingStatusGrid } from '@/features/admin/components/analytics/BookingStatusGrid';
import { RevenueTable } from '@/features/admin/components/analytics/RevenueTable';
import { MostBookedTable } from '@/features/admin/components/analytics/MostBookedTable';
import { FleetCompositionGrid } from '@/features/admin/components/analytics/FleetCompositionGrid';
import { RecentBookingsTable } from '@/features/admin/components/analytics/RecentBookingsTable';

export default function AdminFleetAnalyticsPage() {
  const [overview, setOverview] = useState<any>(null);
  const [revenue, setRevenue] = useState<any>(null);
  const [mostBooked, setMostBooked] = useState<any[]>([]);
  const [fleetStats, setFleetStats] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [overviewData, revenueData, mostBookedData, fleetStatsData, recentData] =
          await Promise.all([
            fetchOverviewStats(),
            fetchRevenueData(),
            fetchMostBookedVehicles(5),
            fetchFleetStats(),
            fetchRecentBookings(5),
          ]);
        setOverview(overviewData);
        setRevenue(revenueData);
        setMostBooked(mostBookedData.vehicles || []);
        setFleetStats(fleetStatsData);
        setRecentBookings(recentData.bookings || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading analytics…</div>;
  if (error) return <ErrorBanner message={error} />;

  return (
    <div className="space-y-10">
      <AdminSectionHeader title="FLEET ANALYTICS" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Bookings" value={overview?.bookings.total || 0} />
        <MetricCard
          label="Total Revenue"
          value={`${overview?.revenue.currency || '€'} ${overview?.revenue.total?.toLocaleString() || 0}`}
        />
        <MetricCard label="Active Users" value={overview?.users.total || 0} />
        <MetricCard
          label="Fleet Available"
          value={`${overview?.fleet.available || 0} / ${overview?.fleet.total || 0}`}
        />
      </div>
      {overview?.bookings.byStatus && (
        <BookingStatusGrid statuses={overview.bookings.byStatus} />
      )}

      {revenue?.revenueByMonth && (
        <RevenueTable rows={revenue.revenueByMonth} currency={revenue.currency} />
      )}

      {mostBooked.length > 0 && <MostBookedTable vehicles={mostBooked} />}

      {fleetStats && (
        <FleetCompositionGrid
          categories={fleetStats.byCategory || []}
          fuelTypes={fleetStats.byFuelType || []}
          transmissions={fleetStats.byTransmission || []}
        />
      )}
      {recentBookings.length > 0 && <RecentBookingsTable bookings={recentBookings} />}
    </div>
  );
}