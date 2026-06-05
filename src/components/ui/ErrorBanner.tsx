interface ErrorBannerProps {
  message: string;
  className?: string;
}

export const ErrorBanner = ({ message, className = '' }: ErrorBannerProps) => (
  <div
    role="alert"
    className={`mb-6 border border-brand-danger/30 bg-brand-danger/5 px-4 py-3 text-brand-danger text-sm ${className}`}
  >
    {message}
  </div>
);
