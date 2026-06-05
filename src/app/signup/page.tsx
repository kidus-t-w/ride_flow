'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');        
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    if (!phone.trim()) {
      setFormError('Phone number is required');
      setIsSubmitting(false);
      return;
    }

    try {
      await api.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
        phone,
      });

      const loginResult = await api.post<{ user: any; token: string }>('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('accessToken', loginResult.token);
      localStorage.setItem('userRole', loginResult.user.role);

      document.cookie = `accessToken=${loginResult.token}; path=/; max-age=604800; SameSite=Lax`;
      document.cookie = `userRole=${loginResult.user.role}; path=/; max-age=604800; SameSite=Lax`;

      router.push('/dashboard');
    } catch (err: any) {
      const message = err.message || 'Unable to create account. Please try again.';
      setFormError(message);
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
              Join the future<br />
              of mobility.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Create your account and unlock seamless bookings, crypto payments, and fleet management.
            </p>
            <div className="flex gap-4">
            </div>
          </div>
          <div className="relative z-10 text-xs text-white/40">© 2026 RideFlow – All rights reserved</div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 md:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-admin-label uppercase text-brand-muted">Get started</p>
              <h1 className="mt-2 text-admin-heading text-brand-ink-emphasis font-display">Create your account</h1>
              <p className="mt-2 text-admin-body text-brand-muted">Fill in your details below to join RideFlow.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="firstName" className="text-admin-label uppercase text-brand-secondary block">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 w-full border border-admin-border bg-admin-surface px-4 text-dashboard-field text-brand-ink outline-none transition-colors focus:border-brand-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="lastName" className="text-admin-label uppercase text-brand-secondary block">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 w-full border border-admin-border bg-admin-surface px-4 text-dashboard-field text-brand-ink outline-none transition-colors focus:border-brand-primary"
                  />
                </div>
              </div>

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
                <label htmlFor="phone" className="text-admin-label uppercase text-brand-secondary block">
                  Phone number <span className="text-brand-danger">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 w-full border border-admin-border bg-admin-surface px-4 text-dashboard-field text-brand-ink outline-none transition-colors focus:border-brand-primary"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="text-admin-label uppercase text-brand-secondary block">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full border border-admin-border bg-admin-surface px-4 text-dashboard-field text-brand-ink outline-none transition-colors focus:border-brand-primary"
                />
                <p className="text-[11px] text-brand-muted mt-1">
                  At least 8 characters, one uppercase letter, one number
                </p>
              </div>

              {formError && <p className="text-admin-body-sm font-medium text-brand-danger">{formError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="text-dashboard-cta h-12 w-full bg-brand-primary px-8 uppercase text-white transition-colors hover:bg-brand-primary-hover disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-admin-body-sm text-brand-muted">
                Already have an account?{' '}
                <Link href="/login" className="font-bold text-brand-primary underline underline-offset-4 hover:text-brand-primary-hover">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}