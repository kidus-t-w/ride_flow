'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import { BlogPublisherTable } from '@/features/admin/components/BlogPublisherTable';
import { fetchAdminBlogs, deleteBlogPost } from '@/features/admin/services/adminService';
import { AdminBlogSkeleton } from '@/features/admin/components/blog/AdminBlogSkeleton';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import toast from 'react-hot-toast';

export default function AdminBlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogEditForm, setBlogEditForm] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    fetchAdminBlogs()
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        toast.error(err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = useCallback((id: string) => {
    const blog = blogs.find((b) => b.id === id);
    if (blog) {
      setEditingBlogId(id);
      setBlogEditForm({ ...blog });
    }
  }, [blogs]);

  const handleSave = useCallback(() => {
    if (!blogEditForm) return;
    setBlogs((prev) => prev.map((b) => (b.id === blogEditForm.id ? blogEditForm : b)));
    setEditingBlogId(null);
    setBlogEditForm(null);
    toast.success('Blog post updated');
  }, [blogEditForm]);

  const handleCancel = useCallback(() => {
    setEditingBlogId(null);
    setBlogEditForm(null);
  }, []);

  const handleDeleteClick = (id: string) => {
    const blog = blogs.find(b => b.id === id);
    if (blog) {
      setDeleteTarget({ id, title: blog.title });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteBlogPost(deleteTarget.id);
      toast.success(`"${deleteTarget.title}" deleted`);
      setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      if (editingBlogId === deleteTarget.id) {
        setEditingBlogId(null);
        setBlogEditForm(null);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleCreate = () => router.push('/admin/blog/create');
  const handleEditRoute = (id: string) => router.push(`/admin/blog/${id}/edit`);

  if (loading) return <AdminBlogSkeleton />;
  if (error) return <div className="p-8 text-center text-brand-danger">{error}</div>;

  return (
    <>
      <div className="space-y-6">
        <AdminSectionHeader
          title="EDITORIAL LEDGER"
          action={<Button variant="primary" label="+ Create Blog Post" onClick={handleCreate} />}
        />
        <BlogPublisherTable
          blogs={blogs}
          editingBlogId={editingBlogId}
          blogEditForm={blogEditForm}
          onEditFormChange={setBlogEditForm}
          onSave={handleSave}
          onCancel={handleCancel}
          onPurge={handleDeleteClick}
          onNavigateEdit={handleEditRoute}
        />
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </>
  );
}