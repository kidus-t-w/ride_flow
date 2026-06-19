import { Skeleton } from '@/components/ui/Skeleton';

export const BookingsSkeleton = () => (
  <div className="animate-in fade-in duration-150">
    <div className="flex justify-between items-center mb-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border border-admin-border p-6">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="text-right space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);