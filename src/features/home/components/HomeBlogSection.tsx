'use client';

import { useState, useEffect } from 'react';
import { fetchPublicBlogs } from '@/features/blog/services/blogService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { PublicBlogPost } from '@/features/blog/services/blogService';
import { BlogListingSkeleton } from '@/features/blog/components/BlogListingSkeleton';

export default function HomeBlogSection() {
  const [posts, setPosts] = useState<PublicBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPublicBlogs()
      .then((data) => {
        let latest = data;
        if (data[0] && 'status' in data[0]) {
          latest = data.filter((post: any) => post.status === 'Published');
        }
        latest = [...latest].sort(
          (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        );
        setPosts(latest.slice(0, 3));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <BlogListingSkeleton/>
    );
  }

  if (error) {
    return <ErrorBanner message={error} />;
  }

  if (posts.length === 0) {
    return null;
  }

  const featured = posts[0];
  const supporting = posts.slice(1);

  return (
    <section className="w-full bg-admin-surface text-brand-ink py-20 px-4 md:px-12 border-t border-admin-border">
      <div className="max-w-[1440px] mx-auto space-y-12">
        <div className="flex items-baseline justify-between border-b border-admin-border pb-5">
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-[2px] text-brand-primary uppercase block">
              Intelligence Channels
            </span>
            <h2 className="text-[32px] font-bold uppercase text-brand-ink tracking-tight">
              The Ledger Journal
            </h2>
          </div>
          <a
            href="/blog"
            className="text-xs font-bold tracking-wide text-brand-ink hover:text-brand-primary transition-colors uppercase no-underline group shrink-0"
          >
            Explore Full Index <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <a
            href={`/blog/${featured.id}`}
            className="lg:col-span-7 flex flex-col justify-between border border-admin-border hover:border-admin-border-strong transition-colors group no-underline bg-admin-surface rounded-none overflow-hidden"
          >
            <div className="w-full bg-admin-surface-muted aspect-[16/10] overflow-hidden border-b border-admin-border">
              <img
                src={featured.coverUrl}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
            <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-wide text-brand-primary uppercase block">
                  {featured.category} - Latest Transmission
                </span>
                <h3 className="text-[22px] font-bold leading-tight text-brand-ink uppercase group-hover:text-brand-primary transition-colors">
                  {featured.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-brand-muted line-clamp-2 pt-1">
                  {featured.excerpt}
                </p>
              </div>
              <div className="pt-6 border-t border-admin-border/20 flex items-center justify-between text-[11px] font-mono text-brand-muted">
                <span className="uppercase">Read Operational Analysis</span>
                <span>{featured.publishedDate}</span>
              </div>
            </div>
          </a>

          <div className="lg:col-span-5 flex flex-col gap-6">
            {supporting.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="flex flex-col sm:flex-row border border-admin-border hover:border-admin-border-strong transition-colors group no-underline bg-admin-surface h-full rounded-none overflow-hidden"
              >
                <div className="sm:w-40 bg-admin-surface-muted aspect-[4/3] sm:aspect-auto sm:h-full overflow-hidden border-b sm:border-b-0 sm:border-r border-admin-border shrink-0">
                  <img
                    src={post.coverUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between flex-1 min-w-0">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold tracking-wide text-brand-primary uppercase block">
                      {post.category}
                    </span>
                    <h4 className="text-[15px] font-bold leading-tight text-brand-ink uppercase line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-[13px] font-light text-brand-muted line-clamp-2 pt-0.5">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-admin-border/20 mt-3 flex items-center justify-between text-[11px] font-mono text-brand-subtle">
                    <span className="text-brand-ink uppercase font-bold tracking-tight text-[10px] group-hover:underline">Review Document</span>
                    <span>{post.publishedDate}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}