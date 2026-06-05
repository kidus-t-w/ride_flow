import type { ReactNode } from 'react';

interface AdminDataTableProps {
  headers: string[];
  headClassName?: string;
  children: ReactNode;
  bodyClassName?: string;
}

export const AdminDataTable = ({
  headers,
  headClassName = 'text-admin-table-head-sm',
  children,
  bodyClassName = 'text-admin-body-table',
}: AdminDataTableProps) => (
  <div className="w-full border border-admin-border overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-admin-border-strong bg-admin-surface-muted">
          {headers.map((head) => (
            <th
              key={head}
              className={`${headClassName} p-4 uppercase text-brand-ink`}
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={bodyClassName}>{children}</tbody>
    </table>
  </div>
);
