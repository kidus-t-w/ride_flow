import { Skeleton } from '@/components/ui/Skeleton';

export const AccountSkeleton = () => (
  <div className="max-w-2xl mx-auto py-6 space-y-8">
    <Skeleton className="h-8 w-40" />
    <Skeleton className="h-4 w-64" />
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-32" />
    </div>
  </div>
);