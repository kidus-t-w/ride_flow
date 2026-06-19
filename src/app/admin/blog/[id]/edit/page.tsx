'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { fetchBlogById, updateBlogPost } from '@/features/admin/services/adminService';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { Skeleton } from '@/components/ui/Skeleton';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('INSIGHTS');
  const [status, setStatus] = useState('Draft');
  const [content, setContent] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchBlogById(id)
      .then((blog) => {
        setTitle(blog.title);
        setCategory(blog.category);
        setStatus(blog.status);
        setContent(blog.content);
        setCoverUrl(blog.coverUrl || '');
        setAuthor(blog.author);
        setImagePreview(blog.coverUrl || null);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        router.push('/admin/blog');
      });
  }, [id, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) {
      toast.error('Title, content, and author are required');
      return;
    }
    setSubmitting(true);

    try {
      let finalCoverUrl = coverUrl;
      if (newImageFile) {
        setIsUploading(true);
        finalCoverUrl = await uploadImageToCloudinary(newImageFile);
        setIsUploading(false);
      }

      const excerpt = generateExcerpt(content);
      const blogData = {
        title: title.trim(),
        category,
        status,
        content,
        excerpt,
        coverUrl: finalCoverUrl,
        author: author.trim(),
        publishedDate: new Date().toISOString(),
      };

      await updateBlogPost(id, blogData);
      toast.success('Blog post updated successfully');
      router.push('/admin/blog');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update blog post');
    } finally {
      setSubmitting(false);
      setIsUploading(false);
    }
  };

  const generateExcerpt = (text: string) => {
    const plainText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return plainText.slice(0, 160) + (plainText.length > 160 ? '...' : '');
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold uppercase text-brand-ink mb-6">Edit Blog Post</h1>
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

        <div className="space-y-2">
          <label className="text-admin-label uppercase text-brand-muted">Cover Image</label>
          {coverUrl && !newImageFile && (
            <div className="mb-2">
              <img src={coverUrl} alt="Current cover" className="max-h-32 object-cover border border-admin-border" />
              <p className="text-xs text-brand-muted mt-1">Current image</p>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="block w-full"
          />
          {imagePreview && newImageFile && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="max-h-48 object-cover border border-admin-border" />
              <button
                type="button"
                onClick={() => { setNewImageFile(null); setImagePreview(coverUrl || null); }}
                className="mt-1 text-xs text-brand-danger hover:underline"
              >
                Cancel new image
              </button>
            </div>
          )}
          {isUploading && (
            <div className="text-sm text-brand-muted">Uploading image...</div>
          )}
          <p className="text-xs text-brand-muted">
            Upload a new image to replace the current one (optional). If left empty, the current image will be kept.
          </p>
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
            disabled={submitting || isUploading}
            className="px-6 py-2 bg-brand-primary text-white uppercase font-bold disabled:opacity-50"
          >
            {submitting ? 'Saving...' : isUploading ? 'Uploading image...' : 'Save Changes'}
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