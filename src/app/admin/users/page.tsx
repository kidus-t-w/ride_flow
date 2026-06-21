'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import { AdminDataTable } from '@/features/admin/components/AdminDataTable';
import { fetchAdminUsers, updateAdminUser, deleteAdminUser } from '@/features/admin/services/adminService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import toast from 'react-hot-toast';
import type { AdminUser } from '@/features/admin/types';
import { AdminVehiclesSkeleton } from '@/features/admin/components/vehicles/AdminVehiclesSkeleton';

const USER_TABLE_HEADERS = [
  'ID',
  'Name',
  'Email',
  'Phone',
  'Role',
  'Status',
  'Actions',
] as const;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      const data = await fetchAdminUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleRoleChange = async (userId: number, newRole: AdminUser['role']) => {
    setUpdatingId(userId);
    try {
      // Optimistic update
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      await updateAdminUser(userId, { role: newRole });
      toast.success('User role updated');
    } catch (err: any) {
      toast.error(err.message);
      // Revert on error (re-fetch to be safe)
      loadUsers();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
    setUpdatingId(userId);
    try {
      // Optimistic update
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, isActive: !currentStatus } : u));
      await updateAdminUser(userId, { isActive: !currentStatus });
      toast.success('User status toggled');
    } catch (err: any) {
      toast.error(err.message);
      loadUsers(); // revert
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteClick = (userId: number, userName: string) => {
    setDeleteTarget({ id: userId, name: userName });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAdminUser(deleteTarget.id);
      setUsers(prev => prev.filter(u => u.id !== deleteTarget.id));
      toast.success(`User "${deleteTarget.name}" deleted`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeleteTarget(null);
    }
  };

  if (loading) return <AdminVehiclesSkeleton />;
  if (error) return <ErrorBanner message={error} />;

  return (
    <>
      <div className="space-y-6">
        <AdminSectionHeader title="USER MANAGEMENT" />
        <AdminDataTable headers={[...USER_TABLE_HEADERS]}>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-admin-border last:border-none">
              <td className="p-4 font-mono text-sm">{user.id}</td>
              <td className="p-4 font-medium">{user.firstName} {user.lastName}</td>
              <td className="p-4 text-brand-muted">{user.email}</td>
              <td className="p-4 text-brand-muted">{user.phone || '—'}</td>
              <td className="p-4">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value as AdminUser['role'])}
                  disabled={updatingId === user.id}
                  className="border border-admin-border bg-admin-surface px-2 py-1 text-sm rounded-none focus:outline-none focus:border-brand-primary disabled:opacity-50"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleToggleStatus(user.id, user.isActive)}
                  disabled={updatingId === user.id}
                  className={`px-2 py-1 text-xs font-bold uppercase rounded-none transition-colors ${
                    user.isActive
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  } disabled:opacity-50`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleDeleteClick(user.id, `${user.firstName} ${user.lastName}`)}
                  disabled={updatingId === user.id}
                  className="text-red-600 hover:text-red-800 font-medium text-sm disabled:opacity-50 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </AdminDataTable>
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </>
  );
}