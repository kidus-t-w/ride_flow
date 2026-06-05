'use client';

import type { ReactNode } from 'react';
import { FloatingLabelField } from '@/features/dashboard/components/fields/FloatingLabelField';

interface FloatingLabelInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel';
  borderClassName?: string;
  trailing?: ReactNode;
  inputClassName?: string;
}

export const FloatingLabelInput = ({
  label,
  value,
  onChange,
  type = 'text',
  borderClassName,
  trailing,
  inputClassName = '',
}: FloatingLabelInputProps) => (
  <FloatingLabelField
    label={label}
    borderClassName={borderClassName}
    trailing={trailing}
  >
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`text-dashboard-field w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 rounded-none font-light ${inputClassName}`}
    />
  </FloatingLabelField>
);
