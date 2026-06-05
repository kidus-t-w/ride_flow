'use client'

import { useState, useEffect } from 'react';
import { fetchPublicBlogs, PublicBlogPost } from '@/features/blog/services/blogService';
import { ErrorBanner } from '@/components/ui/ErrorBanner';

export default function PublicBlogPage() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'INSIGHTS' | 'ENGINEERING' | 'ANNOUNCEMENTS'>('ALL');
  const [articles, setArticles] = useState<PublicBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPublicBlogs()
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredArticles = articles.filter(
    (art) => activeFilter === 'ALL' || art.category === activeFilter
  );

  const featuredPost = filteredArticles[0];
  const gridPosts = filteredArticles.slice(1);

  if (loading) return <div className="p-8 text-center">Loading insights...</div>;
  if (error) return <ErrorBanner message={error} />;

  return (
    <div className="w-full min-h-screen bg-admin-surface text-brand-ink pt-12 pb-24 px-4 md:px-12 selection:bg-brand-primary/20">
      <div className="max-w-[1440px] mx-auto space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-admin-border pb-6 gap-6">
          <div className="space-y-2">
            <h1 className="text-[42px] font-bold uppercase text-brand-ink tracking-tight">THE LEDGER JOURNAL</h1>
            <p className="text-sm font-light text-brand-muted">Decoupled telemetry analysis, engineering deep dives, and system operation logs.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['ALL', 'INSIGHTS', 'ENGINEERING', 'ANNOUNCEMENTS'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 border rounded-none uppercase transition-all cursor-pointer text-xs font-bold tracking-wide ${
                  activeFilter === cat 
                    ? 'bg-brand-ink border-brand-ink text-white' 
                    : 'bg-admin-surface border-admin-border text-brand-muted hover:text-brand-ink hover:border-admin-border-strong'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {featuredPost && (
          <a 
            href={`/blog/${featuredPost.id}`}
            className="w-full grid grid-cols-1 lg:grid-cols-12 border border-admin-border hover:border-admin-border-strong transition-all no-underline bg-admin-surface cursor-pointer group rounded-none overflow-hidden"
          >
            <div className="lg:col-span-7 bg-admin-surface-muted overflow-hidden border-b lg:border-b-0 lg:border-r border-admin-border">
              <img 
                src={featuredPost.coverUrl} 
                alt={featuredPost.title} 
                className="w-full h-[320px] lg:h-[480px] object-cover group-hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-8 bg-admin-surface">
              <div className="space-y-4">
                <span className="text-[11px] font-bold tracking-wide text-brand-primary uppercase block">FEATURED MATERIAL</span>
                <h2 className="text-[26px] font-bold leading-tight uppercase text-brand-ink group-hover:text-brand-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-sm font-light leading-relaxed text-brand-muted line-clamp-4 pt-2">
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-admin-border/20 text-brand-ink">
                <span className="font-mono text-xs font-medium">BY {featuredPost.author.toUpperCase()}</span>
                <span className="text-[11px] font-bold uppercase tracking-wider group-hover:underline">Engage Article →</span>
              </div>
            </div>
          </a>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <a 
              key={post.id}
              href={`/blog/${post.id}`}
              className="border border-admin-border hover:border-admin-border-strong bg-admin-surface no-underline transition-all cursor-pointer group flex flex-col justify-between rounded-none overflow-hidden"
            >
              <div className="space-y-4">
                <div className="w-full h-48 bg-admin-surface-muted border-b border-admin-border overflow-hidden">
                  <img 
                    src={post.coverUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold tracking-wide text-brand-primary uppercase block">
                    {post.category}
                  </span>
                  <h3 className="text-[18px] font-bold leading-tight uppercase text-brand-ink line-clamp-2 group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[13px] font-light leading-relaxed text-brand-muted line-clamp-3 pt-1">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-4 border-t border-admin-border/20 flex items-center justify-between text-xs text-brand-muted">
                <span className="font-mono uppercase tracking-tight text-[11px]">BY {post.author}</span>
                <span className="font-mono text-[11px]">{post.publishedDate}</span>
              </div>
            </a>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="w-full text-center py-24 border border-dashed border-admin-border bg-admin-surface-muted">
            <span className="text-[13px] font-bold text-brand-muted uppercase tracking-wider block">No Content Transmissions Registered</span>
            <p className="text-brand-subtle text-[13px] font-light mt-1">There are currently no localized entries mapped to this specific category configuration.</p>
          </div>
        )}
      </div>
    </div>
  );
}