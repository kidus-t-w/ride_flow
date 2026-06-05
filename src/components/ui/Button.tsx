'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'accent' | 'outline' | 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  label?: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  connected?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  accent:
    'text-dashboard-cta h-12 px-8 bg-brand-primary text-admin-surface uppercase rounded-none hover:bg-brand-primary-hover transition-colors border-none cursor-pointer tracking-wide',
  outline:
    'text-dashboard-cta h-12 px-6 uppercase transition-colors rounded-none whitespace-nowrap cursor-pointer bg-transparent border border-brand-ink text-brand-ink hover:bg-admin-surface-muted disabled:opacity-60 disabled:cursor-not-allowed',
  primary:
    'text-admin-tab h-11 px-6 bg-brand-ink text-admin-surface uppercase rounded-none hover:bg-brand-primary transition-colors border-none cursor-pointer',
  ghost:
    'text-dashboard-link uppercase text-brand-ink underline decoration-1 underline-offset-4 hover:text-brand-primary transition-colors bg-transparent border-none p-0 cursor-pointer',
};

export const Button = ({
  children,
  label,
  variant = 'primary',
  fullWidth = false,
  connected,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  const connectedClasses =
    variant === 'outline' && connected === false
      ? 'bg-brand-primary text-admin-surface hover:bg-brand-primary-hover border-none'
      : '';

  return (
    <button
      type={type}
      className={`${variantClasses[variant]} ${connectedClasses} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children ?? label}
    </button>
  );
};
