import { Skeleton } from '@/components/ui/Skeleton';

export const AdminBlogSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-36" />
    </div>
    <div className="border border-admin-border overflow-x-auto">
      <table className="w-full">
        <thead className="bg-admin-surface-muted border-b">
          <tr>
            {Array.from({ length: 7 }).map((_, i) => (
              <th key={i} className="p-3"><Skeleton className="h-4 w-20" /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className="border-b">
              {Array.from({ length: 7 }).map((_, j) => (
                <td key={j} className="p-3"><Skeleton className="h-5 w-24" /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);