'use client';

import { useState, useEffect } from 'react';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { fetchAdminProfile, updateAdminProfile } from '@/features/admin/services/adminService';
import type { AdminUser } from '@/features/admin/types';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Editable fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchAdminProfile()
      .then((data) => {
        setProfile(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhone(data.phone || '');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = await updateAdminProfile(profile.id, { firstName, lastName, phone: phone ?? null });
      setProfile(updated);
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (error && !profile) return <ErrorBanner message={error} />;

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-8">
      <AdminSectionHeader title="MY PROFILE" />

      {error && <ErrorBanner message={error} />}
      {success && <div className="p-4 bg-green-50 text-green-800 border border-green-200 rounded-none">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-admin-label text-brand-muted uppercase">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-10 border border-admin-border bg-admin-surface px-3 text-brand-ink focus:outline-none focus:border-brand-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-admin-label text-brand-muted uppercase">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-10 border border-admin-border bg-admin-surface px-3 text-brand-ink focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-admin-label text-brand-muted uppercase">Email</label>
          <input
            type="email"
            value={profile?.email || ''}
            disabled
            className="w-full h-10 border border-admin-border bg-admin-surface-muted px-3 text-brand-muted cursor-not-allowed"
          />
          <p className="text-[11px] text-brand-muted">Email cannot be changed</p>
        </div>

        <div className="space-y-1">
          <label className="text-admin-label text-brand-muted uppercase">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-10 border border-admin-border bg-admin-surface px-3 text-brand-ink focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="h-10 px-6 bg-brand-primary text-white uppercase text-sm font-bold tracking-wide hover:bg-brand-primary-hover disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Password change section – optional, if backend endpoint exists */}
      <div className="border-t border-admin-border pt-8 mt-8">
        <h3 className="text-admin-heading-sm font-bold text-brand-ink mb-4">Change Password</h3>
        <p className="text-admin-body text-brand-muted mb-4">
          Password change is not yet implemented in the backend. This feature will be available soon.
        </p>
        {/* You could add a form here that calls changeAdminPassword when endpoint is ready */}
      </div>
    </div>
  );
}