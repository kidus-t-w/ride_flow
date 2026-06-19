import { Skeleton } from '@/components/ui/Skeleton';

export const CheckoutSkeleton = () => (
  <div className="w-full bg-admin-surface min-h-screen py-12 px-4 md:px-8">
    <div className="max-w-admin-container mx-auto">
      {/* Header */}
      <div className="border-b border-admin-border pb-5 mb-10">
        <Skeleton className="h-6 w-40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
          <div className="border border-admin-border p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        {/* Right column */}
        <div className="lg:col-span-5">
          <div className="bg-[#f7f7f7] border border-admin-border p-6 space-y-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
);