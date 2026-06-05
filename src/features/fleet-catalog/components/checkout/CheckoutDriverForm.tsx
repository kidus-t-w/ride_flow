'use client';

import type { ReactNode } from 'react';

interface CheckoutDriverFormProps {
  email: string;
  setEmail: (v: string) => void;
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  countryCode: string;
  setCountryCode: (v: string) => void;
  phoneNumber: string;
  setPhoneNumber: (v: string) => void;
  company: string;
  setCompany: (v: string) => void;
  isAgeConfirmed: boolean;
  setIsAgeConfirmed: (v: boolean) => void;
}

const fieldClass =
  'w-full h-12 px-4 bg-admin-surface border border-admin-border text-brand-ink text-dashboard-field font-light focus:outline-none focus:border-brand-ink rounded-none';

const labelClass =
  'text-admin-body-sm font-bold text-brand-muted uppercase tracking-wide';

export const CheckoutDriverForm = (props: CheckoutDriverFormProps) => (
  <div>
    <h2 className="text-[24px] font-bold uppercase text-brand-ink tracking-normal mb-6">
      Who will drive?
    </h2>

    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1.5">
        <label className={labelClass}>Email</label>
        <input
          type="email"
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelClass}>First name</label>
          <input
            type="text"
            value={props.firstName}
            onChange={(e) => props.setFirstName(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelClass}>Last name</label>
          <input
            type="text"
            value={props.lastName}
            onChange={(e) => props.setLastName(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-3 space-y-1.5">
          <label className={labelClass}>Country</label>
          <div className="relative">
            <select
              value={props.countryCode}
              onChange={(e) => props.setCountryCode(e.target.value)}
              className={`${fieldClass} pl-12 appearance-none cursor-pointer font-normal`}
            >
              <option value="+1">+1</option>
              <option value="+251">+251</option>
              <option value="+44">+44</option>
            </select>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <div className="w-5 h-3.5 bg-blue-800 border border-gray-300 relative overflow-hidden flex flex-col justify-between">
                <div className="h-[2px] bg-red-600 w-full" />
                <div className="h-[2px] bg-white w-full" />
                <div className="h-[2px] bg-red-600 w-full" />
              </div>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-muted text-[11px]">
              ▼
            </div>
          </div>
        </div>
        <div className="sm:col-span-9 space-y-1.5">
          <label className={labelClass}>Phone number</label>
          <input
            type="tel"
            value={props.phoneNumber}
            onChange={(e) => props.setPhoneNumber(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={labelClass}>
          Company <span className="text-brand-subtle font-light lowercase">(optional)</span>
        </label>
        <input
          type="text"
          value={props.company}
          onChange={(e) => props.setCompany(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="pt-4 space-y-5">

        <hr className="border-t border-admin-border my-6" />

        <div
          role="button"
          tabIndex={0}
          onClick={() => props.setIsAgeConfirmed(!props.isAgeConfirmed)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ')
              props.setIsAgeConfirmed(!props.isAgeConfirmed);
          }}
          className="flex items-center gap-4 cursor-pointer select-none group pt-2"
        >
          <div
            className={`w-5 h-5 border flex items-center justify-center rounded-none transition-colors ${
              props.isAgeConfirmed
                ? 'bg-brand-ink border-brand-ink'
                : 'bg-admin-surface border-admin-border-strong'
            }`}
          >
            {props.isAgeConfirmed ? (
              <span className="text-admin-surface text-[11px] font-bold">✓</span>
            ) : null}
          </div>
          <span className="text-admin-body font-bold text-brand-ink">
            I am 25 years of age or older
          </span>
        </div>
      </div>
    </form>
  </div>
);

const PreferenceRow = ({
  active,
  onSelect,
  children,
}: {
  active: boolean;
  onSelect: () => void;
  children: ReactNode;
}) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onSelect}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') onSelect();
    }}
    className="flex items-start gap-4 cursor-pointer group select-none"
  >
    <div className="mt-1 flex items-center justify-center w-5 h-5 rounded-full border border-brand-ink p-[2px]">
      {active ? <div className="w-full h-full bg-brand-ink rounded-full" /> : null}
    </div>
    <p className="text-admin-body font-light text-brand-secondary leading-[1.55] flex-1">
      {children}
    </p>
  </div>
);
