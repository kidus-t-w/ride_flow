import { Skeleton } from '@/components/ui/Skeleton';

export const BlogDetailSkeleton = () => (
  <div className="w-full bg-admin-surface min-h-screen py-12 px-4 md:px-12">
    <div className="max-w-[820px] mx-auto">
      <Skeleton className="h-6 w-40 mb-12" />

      <div className="space-y-4 mb-8">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-10 w-3/4" />
        <div className="flex gap-6 pt-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <Skeleton className="h-80 w-full mb-8" />

      <div className="space-y-6 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <div className="border-t border-admin-border mt-16 pt-8 flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  </div>
);