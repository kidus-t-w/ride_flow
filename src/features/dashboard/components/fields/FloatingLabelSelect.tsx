'use client';

import { FloatingLabelField } from '@/features/dashboard/components/fields/FloatingLabelField';

interface FloatingLabelSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  borderClassName?: string;
}

export const FloatingLabelSelect = ({
  label,
  value,
  onChange,
  options,
  borderClassName = 'border-brand-ink',
}: FloatingLabelSelectProps) => (
  <FloatingLabelField label={label} borderClassName={borderClassName}>
    <>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-dashboard-field w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 appearance-none cursor-pointer rounded-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-0 bottom-2 text-[9px] pointer-events-none text-brand-ink">
        ▼
      </div>
    </>
  </FloatingLabelField>
);
