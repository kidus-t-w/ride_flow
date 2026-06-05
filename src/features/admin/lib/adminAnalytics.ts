// src/features/admin/lib/adminAnalytics.ts
import type { FleetAnalytics, HistoricalEarnings, PendingTx, VehicleAsset } from '../types';

export const computeFleetAnalytics = (
  fleet: VehicleAsset[],
  pendingTransactions: PendingTx[],
  historicalEarnings: HistoricalEarnings
): FleetAnalytics => {
  const totalAssets = fleet.length;
  const countAvailable = fleet.filter((v) => v.status === 'Available').length;
  const countOnRental = fleet.filter((v) => v.status === 'On Rental').length;
  const countMaintenance = fleet.filter((v) => v.status === 'Maintenance').length;

  // Backend doesn't have numeric battery/fuel; set averageEnergy to 0 (or calculate from fuelType if needed)
  const averageEnergy = 0;

  const pendingVolumeUSD = pendingTransactions.reduce(
    (acc, tx) => acc + parseFloat(tx.amountUSD.replace('$', '') || '0'),
    0
  );

  return {
    totalAssets,
    countAvailable,
    countOnRental,
    countMaintenance,
    averageEnergy,
    pendingVolumeUSD,
    totalGrossRevenue: historicalEarnings.clearedGrossUSD,
  };
};

export const filterFleetByStatus = (fleet: VehicleAsset[], fleetFilter: string): VehicleAsset[] =>
  fleet.filter((v) => fleetFilter === 'ALL' || v.status.toUpperCase() === fleetFilter);

export const formatUsd = (value: number, fractionDigits = 2): string =>
  value.toLocaleString('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });