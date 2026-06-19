import { Skeleton } from '@/components/ui/Skeleton';

export const AdminAnalyticsSkeleton = () => (
  <div className="space-y-10">
    <Skeleton className="h-8 w-48" />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-admin-surface border border-admin-border p-6 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
      ))}
    </div>

    <div className="bg-admin-surface border border-admin-border p-6">
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-4 w-16 mb-1" />
            <Skeleton className="h-6 w-8" />
          </div>
        ))}
      </div>
    </div>

    <div className="bg-admin-surface border border-admin-border p-6">
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  </div>
);