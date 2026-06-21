'use client';

import { useState, useEffect, useRef } from 'react';
import { User, Menu, X, ChevronDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { WalletButton } from '@/components/WalletButton';
import { useWalletConnection } from '@/hooks/useWalletConnection';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { isConnected, connectWallet, disconnectWallet, address } = useWalletConnection();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Set mounted to true after client-side hydration
  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('userRole');
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDashboardDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('accessToken');
      const role = localStorage.getItem('userRole');
      setIsAuthenticated(!!token);
      setUserRole(role);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const publicLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog Insights', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const handleDashboardClick = () => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setIsDashboardDropdownOpen(!isDashboardDropdownOpen);
    }
  };

  const handleDashboardRedirect = () => {
    if (userRole === 'admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
    setIsDashboardDropdownOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    setIsAuthenticated(false);
    setUserRole(null);
    setIsDashboardDropdownOpen(false);
    router.push('/login');
  };

  // During SSR, render a placeholder that matches what the client will render initially
  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 w-full h-16 bg-admin-surface border-b border-admin-border px-6 md:px-10 flex items-center justify-between selection:bg-brand-primary/10">
        <a href="/" className="flex items-center gap-2.5 no-underline group">
          <div className="relative w-25 h-20 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="RideFlow Logo"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </div>
          <span className="sr-only">RideFlow Home</span>
        </a>

        <div className="hidden lg:flex items-center gap-1.5 h-full">
          {publicLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 no-underline relative rounded-none ${
                  active
                    ? 'text-brand-primary bg-brand-primary/5'
                    : 'text-[#555555] hover:text-brand-ink hover:bg-admin-surface-muted'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-brand-ink">
          <div className="hidden lg:flex items-center gap-2">
            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-1.5 border border-admin-border text-brand-muted bg-admin-surface">
                <User className="w-[18px] h-[18px]" strokeWidth={2} />
                <span className="hidden sm:inline">Login</span>
              </button>
            </div>
          </div>

          <button className="lg:hidden w-9 h-9 flex items-center justify-center text-brand-ink hover:bg-admin-surface-muted bg-transparent border-none cursor-pointer transition-colors">
            <Menu className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full h-16 bg-admin-surface border-b border-admin-border px-6 md:px-10 flex items-center justify-between selection:bg-brand-primary/10">
        <a href="/" className="flex items-center gap-2.5 no-underline group">
          <div className="relative w-25 h-20 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="RideFlow Logo"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </div>
          <span className="sr-only">RideFlow Home</span>
        </a>

        <div className="hidden lg:flex items-center gap-1.5 h-full">
          {publicLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 no-underline relative rounded-none ${
                  active
                    ? 'text-brand-primary bg-brand-primary/5'
                    : 'text-[#555555] hover:text-brand-ink hover:bg-admin-surface-muted'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-brand-ink">
          <div className="hidden lg:flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleDashboardClick}
                className="flex items-center gap-2 px-3 py-1.5 border border-admin-border hover:border-brand-ink transition-colors no-underline text-[13px] font-medium text-brand-ink"
              >
                <User className="w-[18px] h-[18px]" strokeWidth={2} />
                <span className="hidden sm:inline">
                  {isAuthenticated ? 'Dashboard' : 'Login'}
                </span>
                {isAuthenticated && <ChevronDown className="w-3 h-3" />}
              </button>

              {isAuthenticated && isDashboardDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-admin-surface border border-admin-border shadow-lg z-50">
                  <div className="py-1">
                    <button
                      onClick={handleDashboardRedirect}
                      className="w-full text-left px-4 py-2 text-sm text-brand-ink hover:bg-admin-surface-muted transition-colors"
                    >
                      Dashboard
                    </button>
                    <hr className="my-1 border-admin-border" />
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-brand-danger hover:bg-admin-surface-muted transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-brand-ink hover:bg-admin-surface-muted bg-transparent border-none cursor-pointer transition-colors"
            aria-label="Toggle Navigation Stack"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" strokeWidth={2} /> : <Menu className="w-5 h-5" strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 top-16 z-40 w-full sm:w-80 bg-admin-surface border-l border-admin-border flex flex-col justify-between p-6 lg:hidden animate-in slide-in-from-right duration-200">
          <div className="flex flex-col gap-2">
            {publicLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 text-[15px] font-medium no-underline transition-all ${
                    active
                      ? 'text-brand-primary bg-brand-primary/5 font-semibold'
                      : 'text-brand-ink hover:bg-admin-surface-muted'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <hr className="my-2 border-admin-border" />
            {!isAuthenticated ? (
              <a
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-[15px] font-medium text-brand-ink hover:bg-admin-surface-muted"
              >
                Sign in
              </a>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleDashboardRedirect();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-left text-[15px] font-medium text-brand-ink hover:bg-admin-surface-muted transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-left text-[15px] font-medium text-brand-danger hover:bg-admin-surface-muted transition-colors"
                >
                  Sign out
                </button>
              </>
            )}
          </div>

          <div className="border-t border-admin-border pt-5 flex flex-col gap-4 mb-4">
            <div className="text-[11px] tracking-tight text-brand-subtle px-1 font-mono">
              Rideflow Core Platform Structure © 2026
            </div>
          </div>
        </div>
      )}
    </>
  );
}