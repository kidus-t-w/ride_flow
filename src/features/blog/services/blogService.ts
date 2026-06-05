// src/features/blog/services/blogService.ts
import { api } from '@/lib/api/client';

export interface PublicBlogPost {
  id: string;
  title: string;
  category: 'INSIGHTS' | 'ENGINEERING' | 'ANNOUNCEMENTS';
  publishedDate: string;
  author: string;
  excerpt: string;
  coverUrl: string;
  content?: string;
}

export const fetchPublicBlogs = async (): Promise<PublicBlogPost[]> => {
  const res = await api.get<{ blogs: any[] }>('/blog');
  return res.blogs
    .filter(blog => blog.status === 'Published')
    .map(blog => ({
      id: blog._id || blog.id,          // ✅ map _id to id
      title: blog.title,
      category: blog.category,
      publishedDate: blog.publishedDate,
      author: blog.author,
      excerpt: blog.excerpt,
      coverUrl: blog.coverUrl,
      content: blog.content,
    }));
};

export const fetchPublicBlogById = async (id: string): Promise<PublicBlogPost> => {
  const res = await api.get<{ blog: any }>(`/blog/${id}`);
  const blog = res.blog;
  return {
    id: blog._id || blog.id,
    title: blog.title,
    category: blog.category,
    publishedDate: blog.publishedDate,
    author: blog.author,
    excerpt: blog.excerpt,
    coverUrl: blog.coverUrl,
    content: blog.content,
  };
};