// app/admin/crypto/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import { AdminDataTable } from '@/features/admin/components/AdminDataTable';
import { fetchPendingTransactions } from '@/features/admin/services/adminService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { PendingTx } from '@/features/admin/types';

const HEADERS = [
  'Tx Hash Signature',
  'Client ID',
  'Network Layer',
  'Crypto Balance',
  'Action Override',
] as const;

export default function AdminCryptoPage() {
  const [transactions, setTransactions] = useState<PendingTx[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingTransactions()
      .then(setTransactions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading crypto clearing data...</div>;
  if (error) return <ErrorBanner message={error} />;

  return (
    <div className="space-y-6">
      <AdminSectionHeader title="ON-CHAIN AUDIT CLEARING" />
      <AdminDataTable headers={[...HEADERS]} headClassName="text-admin-table-head">
        {transactions.map((tx) => (
          <tr key={tx.txHash} className="border-b border-admin-border last:border-none">
            <td className="p-4 font-mono text-brand-primary font-bold select-all">
              {tx.txHash}
            </td>
            <td className="p-4">
              <div className="font-bold text-brand-ink">{tx.clientName}</div>
              <div className="text-admin-body-sm text-brand-muted">{tx.clientEmail}</div>
            </td>
            <td className="p-4 font-mono text-admin-body-sm text-brand-secondary">
              {tx.chain}
            </td>
            <td className="p-4 font-mono font-medium">
              {tx.amount} {tx.asset}
            </td>
            <td className="p-4">
              <span className="text-brand-success font-bold uppercase text-admin-body-sm tracking-wider">
                Awaiting Verification Matrix
              </span>
            </td>
          </tr>
        ))}
      </AdminDataTable>
    </div>
  );
}