'use client';

import { useState, useEffect } from 'react';

interface CheckoutDriverFormProps {
  email: string;
  setEmail: (v: string) => void;
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  phoneNumber: string;
  setPhoneNumber: (v: string) => void;
  company: string;
  setCompany: (v: string) => void;
  isAgeConfirmed: boolean;
  setIsAgeConfirmed: (v: boolean) => void;
  onValidationChange?: (isValid: boolean) => void;
  submitted?: boolean;
}

const fieldClass =
  'w-full h-12 px-4 bg-admin-surface border text-brand-ink text-dashboard-field font-light focus:outline-none focus:border-brand-ink rounded-none transition-colors';
const errorClass = 'text-brand-danger text-xs mt-1';
const labelClass = 'text-admin-body-sm font-bold text-brand-muted uppercase tracking-wide';

export const CheckoutDriverForm = (props: CheckoutDriverFormProps) => {
  const [errors, setErrors] = useState<{
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    ageConfirmed?: string;
  }>({});

  const validateField = (field: keyof typeof errors, value: string | boolean): string | undefined => {
    switch (field) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) return 'Invalid email address';
        return undefined;
      case 'firstName':
        if (!value) return 'First name is required';
        if ((value as string).length < 2) return 'First name must be at least 2 characters';
        return undefined;
      case 'lastName':
        if (!value) return 'Last name is required';
        if ((value as string).length < 2) return 'Last name must be at least 2 characters';
        return undefined;
      case 'phoneNumber':
        if (!value) return 'Phone number is required';
        if ((value as string).replace(/\D/g, '').length < 5) return 'Phone number must be at least 5 digits';
        return undefined;
      case 'ageConfirmed':
        if (!value) return 'You must confirm you are 25 years or older';
        return undefined;
      default:
        return undefined;
    }
  };

  useEffect(() => {
    const newErrors = {
      email: validateField('email', props.email),
      firstName: validateField('firstName', props.firstName),
      lastName: validateField('lastName', props.lastName),
      phoneNumber: validateField('phoneNumber', props.phoneNumber),
      ageConfirmed: validateField('ageConfirmed', props.isAgeConfirmed),
    };
    setErrors(newErrors);
    const isValid = !Object.values(newErrors).some(e => e !== undefined);
    props.onValidationChange?.(isValid);
  }, [props.email, props.firstName, props.lastName, props.phoneNumber, props.isAgeConfirmed]);

  const shouldShowError = (field: keyof typeof errors) => {
    return props.submitted && errors[field];
  };

  return (
    <div>
      <h2 className="text-[24px] font-bold uppercase text-brand-ink tracking-normal mb-6">
        Who will drive?
      </h2>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1.5">
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
            className={`${fieldClass} ${shouldShowError('email') && errors.email ? 'border-brand-danger' : 'border-admin-border'}`}
          />
          {shouldShowError('email') && errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>First name *</label>
            <input
              type="text"
              value={props.firstName}
              onChange={(e) => props.setFirstName(e.target.value)}
              className={`${fieldClass} ${shouldShowError('firstName') && errors.firstName ? 'border-brand-danger' : 'border-admin-border'}`}
            />
            {shouldShowError('firstName') && errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>Last name *</label>
            <input
              type="text"
              value={props.lastName}
              onChange={(e) => props.setLastName(e.target.value)}
              className={`${fieldClass} ${shouldShowError('lastName') && errors.lastName ? 'border-brand-danger' : 'border-admin-border'}`}
            />
            {shouldShowError('lastName') && errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className={labelClass}>Phone number *</label>
          <input
            type="tel"
            value={props.phoneNumber}
            onChange={(e) => props.setPhoneNumber(e.target.value)}
            className={`${fieldClass} ${shouldShowError('phoneNumber') && errors.phoneNumber ? 'border-brand-danger' : 'border-admin-border'}`}
            placeholder="+1 234 567 8900"
          />
          {shouldShowError('phoneNumber') && errors.phoneNumber && <p className={errorClass}>{errors.phoneNumber}</p>}
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
              if (e.key === 'Enter' || e.key === ' ') props.setIsAgeConfirmed(!props.isAgeConfirmed);
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
              {props.isAgeConfirmed && <span className="text-admin-surface text-[11px] font-bold">✓</span>}
            </div>
            <span className="text-admin-body font-bold text-brand-ink">I am 25 years of age or older *</span>
          </div>
          {shouldShowError('ageConfirmed') && errors.ageConfirmed && <p className={errorClass}>{errors.ageConfirmed}</p>}
        </div>
      </form>
    </div>
  );
};