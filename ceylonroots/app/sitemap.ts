import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ceylonroots.com";
import { getAllBlogPosts } from "./lib/blog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/packages`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/travelPackages`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/destination`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/wishlist`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.3,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const packagesRes = await fetch(`${API_BASE_URL}/packages`);

    if (packagesRes.ok) {
      const packages: { id: string; updatedAt?: string }[] =
        await packagesRes.json();
      packages.forEach((pkg) => {
        dynamicRoutes.push({
          url: `${BASE_URL}/packages?package=${pkg.id}`,
          lastModified: pkg.updatedAt ? new Date(pkg.updatedAt) : new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      });
    }
  } catch {
    // Return static routes on API failure
  }

  const blogPosts = getAllBlogPosts();
  blogPosts.forEach((blog) => {
    dynamicRoutes.push({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return [...staticRoutes, ...dynamicRoutes];
}
