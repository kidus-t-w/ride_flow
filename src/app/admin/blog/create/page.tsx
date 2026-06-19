'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createBlogPost } from '@/features/admin/services/adminService';

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('INSIGHTS');
  const [status, setStatus] = useState('Draft');
  const [content, setContent] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const generateExcerpt = (text: string) => {
    const plainText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return plainText.slice(0, 160) + (plainText.length > 160 ? '...' : '');
  };

  const handleCoverUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setCoverUrl(url);
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !coverUrl.trim() || !author.trim()) {
      toast.error('Title, content, cover URL, and author are required');
      return;
    }
    setSubmitting(true);

    const excerpt = generateExcerpt(content);
    const blogData = {
      title: title.trim(),
      category,
      status,
      content,
      excerpt,
      coverUrl: coverUrl.trim(),
      author: author.trim(),
      publishedDate: new Date().toISOString(),
    };

    try {
      await createBlogPost(blogData);
      toast.success('Blog post created successfully');
      router.push('/admin/blog');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create blog post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold uppercase text-brand-ink mb-6">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-admin-label uppercase text-brand-muted">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-10 border border-admin-border px-3"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 border border-admin-border px-3"
            >
              <option value="INSIGHTS">INSIGHTS</option>
              <option value="ENGINEERING">ENGINEERING</option>
              <option value="ANNOUNCEMENTS">ANNOUNCEMENTS</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-admin-label uppercase text-brand-muted">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-10 border border-admin-border px-3"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-admin-label uppercase text-brand-muted">Author *</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full h-10 border border-admin-border px-3"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-admin-label uppercase text-brand-muted">Cover Image URL *</label>
          <input
            type="url"
            value={coverUrl}
            onChange={handleCoverUrlChange}
            placeholder="https://example.com/image.jpg"
            className="w-full h-10 border border-admin-border px-3"
            required
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 max-h-40 object-cover" />}
        </div>

        <div className="space-y-1">
          <label className="text-admin-label uppercase text-brand-muted">Content * (HTML or Markdown)</label>
          <textarea
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-admin-border p-3 font-mono"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-brand-primary text-white uppercase font-bold disabled:opacity-50"
          >
            {submitting ? 'Creating...' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-admin-border uppercase"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}