import { Skeleton } from '@/components/ui/Skeleton';
import { FleetCatalogShell } from './FleetCatalogShell';

export const FleetCatalogSkeleton = () => (
  <FleetCatalogShell>
    <div className="mb-10">
      <Skeleton className="h-10 w-64 mb-2" />
    </div>

    <div className="flex gap-6 border-b border-admin-border mb-10 pb-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-6 w-16" />
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border border-admin-border bg-admin-surface overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-8 w-full mt-4" />
          </div>
        </div>
      ))}
    </div>
  </FleetCatalogShell>
);