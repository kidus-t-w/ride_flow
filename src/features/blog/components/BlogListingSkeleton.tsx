import { Skeleton } from '@/components/ui/Skeleton';

export const BlogListingSkeleton = () => (
  <div className="w-full bg-admin-surface pt-12 pb-24 px-4 md:px-12">
    <div className="max-w-[1440px] mx-auto space-y-12">
      <div className="border-b border-admin-border pb-6">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 border border-admin-border p-6">
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mt-2" />
        </div>
        <div className="lg:col-span-5 space-y-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-4 border border-admin-border p-4">
              <Skeleton className="w-32 h-32" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);