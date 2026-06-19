export const Skeleton = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-admin-border rounded-none ${className || ''}`} />
  );