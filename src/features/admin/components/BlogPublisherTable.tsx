'use client';

import { AdminDataTable } from '@/features/admin/components/AdminDataTable';
import { InlineEditActions } from '@/features/admin/components/InlineEditActions';
import type { BlogCategory, BlogPost } from '@/features/admin/types';

const HEADERS = [
  'Article ID',
  'Title Stream',
  'Classification Group',
  'Status Context',
  'Action Context',
] as const;

const inputClass =
  'w-full bg-admin-surface border border-admin-border-strong px-2 py-1 focus:outline-none focus:border-brand-ink rounded-none text-admin-body';

interface BlogPublisherTableProps {
  blogs: BlogPost[];
  editingBlogId: string | null;
  blogEditForm: BlogPost | null;
  onEditFormChange: (form: BlogPost) => void;
  onSave: () => void;
  onCancel: () => void;
  onPurge: (id: string) => void;
  onNavigateEdit: (id: string) => void;
}

export const BlogPublisherTable = ({
  blogs,
  editingBlogId,
  blogEditForm,
  onEditFormChange,
  onSave,
  onCancel,
  onPurge,
  onNavigateEdit,
}: BlogPublisherTableProps) => (
  <AdminDataTable headers={[...HEADERS]} headClassName="text-admin-table-head">
    {blogs.map((blog) => {
      const isEditing = editingBlogId === blog.id;
      return (
        <tr
          key={blog.id}
          className={`border-b border-admin-border last:border-none transition-colors ${
            isEditing ? 'bg-admin-surface-muted' : ''
          }`}
        >
          <td className="p-4 font-mono font-bold">{blog.id}</td>
          <td className="p-4 font-medium max-w-[360px]">
            {isEditing && blogEditForm ? (
              <input
                type="text"
                className={inputClass}
                value={blogEditForm.title}
                onChange={(e) =>
                  onEditFormChange({ ...blogEditForm, title: e.target.value })
                }
              />
            ) : (
              <div className="truncate">{blog.title}</div>
            )}
          </td>
          <td className="p-4 text-admin-body-sm font-bold tracking-wide text-brand-secondary">
            {isEditing && blogEditForm ? (
              <select
                className={`${inputClass} text-admin-body-sm font-bold`}
                value={blogEditForm.category}
                onChange={(e) =>
                  onEditFormChange({
                    ...blogEditForm,
                    category: e.target.value as BlogCategory,
                  })
                }
              >
                <option value="INSIGHTS">INSIGHTS</option>
                <option value="ENGINEERING">ENGINEERING</option>
                <option value="ANNOUNCEMENTS">ANNOUNCEMENTS</option>
              </select>
            ) : (
              blog.category
            )}
          </td>
          <td className="p-4 font-mono text-[13px] text-brand-muted">
            {isEditing && blogEditForm ? (
              <select
                className={`${inputClass} text-admin-body-sm`}
                value={blogEditForm.status}
                onChange={(e) =>
                  onEditFormChange({
                    ...blogEditForm,
                    status: e.target.value as BlogPost['status'],
                  })
                }
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            ) : (
              blog.status
            )}
          </td>
          <td className="p-4">
            {isEditing ? (
              <InlineEditActions onSave={onSave} onCancel={onCancel} />
            ) : (
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => onNavigateEdit(blog.id)}
                  className="text-admin-action text-brand-ink bg-transparent border-none p-0 cursor-pointer uppercase hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onPurge(blog.id)}
                  className="text-admin-action text-brand-danger bg-transparent border-none p-0 cursor-pointer uppercase hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </td>
        </tr>
      );
    })}
  </AdminDataTable>
);
