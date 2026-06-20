import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ride-floww.vercel.app/'

async function getVehicleIds(): Promise<{ id: string; updatedAt?: string }[]> {
  try {
    const res = await fetch(`${SITE_URL}/api/vehicles`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return []

    return await res.json()
  } catch {
    return []
  }
}

async function getBlogSlugs(): Promise<{ slug: string; updatedAt?: string }[]> {
  try {
    const res = await fetch(`${SITE_URL}/api/blog`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return []

    return await res.json()
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/fleetcatalog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  const vehicles = await getVehicleIds()

  const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${SITE_URL}/fleetcatalog/${v.id}`,
    lastModified: v.updatedAt ? new Date(v.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const posts = await getBlogSlugs()

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...vehicleRoutes, ...blogRoutes]
}
