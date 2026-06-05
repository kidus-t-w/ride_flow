'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';

interface LoginClientProps {
  hasCredentialsError: boolean;
}

export default function LoginClient({ hasCredentialsError }: LoginClientProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      const result = await api.post<{ user: any; token: string }>('/auth/login', { email, password });

      localStorage.setItem('accessToken', result.token);
      localStorage.setItem('userRole', result.user.role);

      document.cookie = `accessToken=${result.token}; path=/; max-age=604800; SameSite=Lax`;
      document.cookie = `userRole=${result.user.role}; path=/; max-age=604800; SameSite=Lax`;


      if (result.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setFormError(err.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="selection-admin min-h-screen w-full bg-admin-surface">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative hidden lg:flex flex-col justify-between bg-brand-primary p-12 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div>
            <div className="relative z-10">
              <div className="text-2xl font-bold tracking-tight text-white">RideFlow</div>
              <div className="mt-2 text-sm text-white/70">Next‑gen mobility platform</div>
            </div>
          </div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl font-display font-bold leading-tight text-white">
              Drive smarter.<br />
              Pay with crypto.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Book premium vehicles, manage your fleet, and settle instantly – all from one dashboard.
            </p>
            <div className="flex gap-4">
              <div className="flex -space-x-2">
              </div>
            </div>
          </div>
          <div className="relative z-10 text-xs text-white/40">© 2026 RideFlow – All rights reserved</div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 md:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-admin-label uppercase text-brand-muted">Welcome back</p>
              <h1 className="mt-2 text-admin-heading text-brand-ink-emphasis font-display">Sign in to your account</h1>
              <p className="mt-2 text-admin-body text-brand-muted">
                Access your bookings, crypto wallet, and fleet management.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label htmlFor="email" className="text-admin-label uppercase text-brand-secondary block">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full border border-admin-border bg-admin-surface px-4 text-dashboard-field text-brand-ink outline-none transition-colors focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="password" className="text-admin-label uppercase text-brand-secondary block">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-admin-body-sm text-brand-muted hover:text-brand-primary transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full border border-admin-border bg-admin-surface px-4 text-dashboard-field text-brand-ink outline-none transition-colors focus:border-brand-primary"
                />
              </div>

              {(hasCredentialsError || formError) && (
                <p className="text-admin-body-sm font-medium text-brand-danger">
                  Invalid email or password
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="text-dashboard-cta h-12 w-full bg-brand-primary px-8 uppercase text-white transition-colors hover:bg-brand-primary-hover disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-admin-body-sm text-brand-muted">
                Don’t have an account?{' '}
                <Link
                  href="/signup"
                  className="font-bold text-brand-primary underline underline-offset-4 hover:text-brand-primary-hover"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}