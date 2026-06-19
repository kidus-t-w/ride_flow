'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchPublicBlogById, PublicBlogPost } from '@/features/blog/services/blogService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { BlogDetailSkeleton } from '@/features/blog/components/BlogDetailSkeleton';

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id as string;

  const [post, setPost] = useState<PublicBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!blogId) return;
    fetchPublicBlogById(blogId)
      .then(setPost)
      .catch(err => {
        setError(err.message);
        router.push('/blog');
      })
      .finally(() => setLoading(false));
  }, [blogId, router]);

  if (loading) return <BlogDetailSkeleton />;
  if (error) return <ErrorBanner message={error} />;
  if (!post) return null;

  return (
    <div className="w-full min-h-screen bg-admin-surface text-brand-ink py-12 px-4 md:px-12 selection:bg-brand-primary/20 animate-in fade-in duration-200">
      <div className="max-w-[820px] mx-auto">
        <button
          onClick={() => router.push('/blog')}
          className="text-xs font-bold tracking-wide text-brand-muted hover:text-brand-ink transition-colors uppercase bg-transparent border-none cursor-pointer mb-12 flex items-center gap-2"
        >
          ← Return to Editorial Streams
        </button>

        <article className="space-y-8">
          <div className="space-y-4">
            <span className="text-[11px] font-bold tracking-wide text-brand-primary uppercase block">
              {post.category}
            </span>
            <h1 className="text-[38px] font-bold leading-tight text-brand-ink uppercase text-balance">
              {post.title}
            </h1>
            <div className="flex items-center space-x-6 pt-2 text-brand-muted text-[13px] font-light">
              <div>BY <span className="font-bold text-brand-ink">{post.author}</span></div>
              <div className="w-1 h-1 bg-admin-border-strong" />
              <div className="font-mono">{post.publishedDate}</div>
            </div>
          </div>

          <div className="w-full bg-admin-surface-muted border border-admin-border overflow-hidden rounded-none">
            <img src={post.coverUrl} alt={post.title} className="w-full h-auto max-h-[480px] object-cover" />
          </div>

          <div className="text-[16px] leading-relaxed text-brand-secondary space-y-6 pt-4 font-light first-letter:text-4xl first-letter:font-bold first-letter:text-brand-ink text-justify">
            {post.content?.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className="border-t border-admin-border mt-16 pt-8 flex items-center justify-between">
          <span className="font-mono text-xs text-brand-muted">DOCUMENT MATRIX ID: {post.id}</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs font-bold uppercase tracking-wider bg-transparent border-none text-brand-ink hover:underline cursor-pointer">
            Back To Top ▲
          </button>
        </div>
      </div>
    </div>
  );
}