'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import { BlogPublisherTable } from '@/features/admin/components/BlogPublisherTable';
import { fetchAdminBlogs, deleteBlogPost } from '@/features/admin/services/adminService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { BlogPost } from '@/features/admin/types';

export default function AdminBlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogEditForm, setBlogEditForm] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchAdminBlogs()
      .then(setBlogs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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
  }, [blogEditForm]);

  const handleCancel = useCallback(() => {
    setEditingBlogId(null);
    setBlogEditForm(null);
  }, []);

  const handlePurge = useCallback(async (id: string) => {
    if (!confirm('Permanently delete this blog post?')) return;
    try {
      await deleteBlogPost(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      if (editingBlogId === id) {
        setEditingBlogId(null);
        setBlogEditForm(null);
      }
    } catch (err: any) {
      setError(err.message);
    }
  }, [editingBlogId]);

  const handleCreate = () => router.push('/admin/blog/create');
  const handleEditRoute = (id: string) => router.push(`/admin/blog/${id}/edit`);

  if (loading) return <div className="p-8 text-center">Loading blog posts...</div>;
  if (error) return <ErrorBanner message={error} />;

  return (
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
        onPurge={handlePurge}
        onNavigateEdit={handleEditRoute}
      />
    </div>
  );
}