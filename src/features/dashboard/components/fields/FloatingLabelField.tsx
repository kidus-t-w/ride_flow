'use client';

import type { ReactNode } from 'react';

interface FloatingLabelFieldProps {
  label: string;
  borderClassName?: string;
  children: ReactNode;
  trailing?: ReactNode;
}

export const FloatingLabelField = ({
  label,
  borderClassName = 'border-brand-ink',
  children,
  trailing,
}: FloatingLabelFieldProps) => (
  <div className={`relative pt-5 pb-1 border-b ${borderClassName}`}>
    <label className="text-admin-label absolute top-0 left-0 text-brand-muted uppercase">
      {label}
    </label>
    <div className="flex justify-between items-center w-full">
      <div className="w-full mt-2">{children}</div>
      {trailing}
    </div>
  </div>
);
