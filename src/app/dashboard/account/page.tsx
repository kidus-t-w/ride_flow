'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/client';
import { ErrorBanner } from '@/components/ui/ErrorBanner';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: string;
}

export default function AccountPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get<{ user: UserProfile }>('/auth/me');
        setProfile(res.user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      if (profile.role === 'admin') {
        await api.patch(`/admin/users/${profile.id}`, {
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone,
        });
        setSuccess('Profile updated successfully');
      } else {
        setSuccess('Profile update is not yet implemented for customers. Changes saved locally only.');
        localStorage.setItem('tempProfile', JSON.stringify(profile));
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading account...</div>;
  if (error) return <ErrorBanner message={error} />;
  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-8">
      <h1 className="text-dashboard-hero text-brand-ink mb-2">ACCOUNT</h1>
      <p className="text-dashboard-subtitle text-brand-ink mb-6">
        Manage your personal information and contact details.
      </p>

      {success && <div className="p-4 bg-green-50 text-green-800 border border-green-200">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">First Name</label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              className="w-full h-10 border border-admin-border px-3"
            />
          </div>
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Last Name</label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              className="w-full h-10 border border-admin-border px-3"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-admin-label uppercase text-brand-muted">Email</label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full h-10 border border-admin-border bg-admin-surface-muted px-3 text-brand-muted cursor-not-allowed"
          />
          <p className="text-xs text-brand-muted">Email cannot be changed</p>
        </div>

        <div className="space-y-1">
          <label className="text-admin-label uppercase text-brand-muted">Phone Number</label>
          <input
            type="tel"
            value={profile.phone || ''}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full h-10 border border-admin-border px-3"
            placeholder="+1 234 567 8900"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="h-10 px-6 bg-brand-primary text-white uppercase text-sm font-bold tracking-wide hover:bg-brand-primary-hover disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}