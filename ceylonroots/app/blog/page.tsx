import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import BlogCard from "../components/blog/BlogCard";
import SeoJsonLd from "../components/SeoJsonLd";
import { getAllBlogPosts } from "../lib/blog";
import { Clock3, Sparkles, TrendingUp } from "lucide-react";

const baseCategory = { id: "all", name: "All Stories" };

const categorySlug = (value: string) =>
  value.toLowerCase().replace(/\s+/g, "-");

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);
  const categories = [
    baseCategory,
    ...Array.from(new Set(posts.map((post) => post.category))).map((name) => ({
      id: categorySlug(name),
      name,
    })),
  ];

  const blogIndexSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "CeylonRoots Travel Blog",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ceylonroots.com"}/blog`,
    description:
      "Travel stories, itinerary guides, and destination insights across Sri Lanka.",
  };

  return (
    <div className="bg-white">
      <SeoJsonLd data={blogIndexSchema} />

      <div className="relative overflow-hidden bg-gradient-to-br from-[#183f34] via-[#295749] to-[#102a23] pt-28 pb-16">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#d6a84a]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#84b59f]/20 blur-3xl" />
        <div className="ceylon-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.18em] text-white/80 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Frontend Editorial Journal
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Island Stories,
              <span className="text-[#f1cc7a]"> Locally Curated</span>
            </h1>
            <p className="text-xl text-ceylon-sand-light max-w-2xl mx-auto mb-10">
              Explore handpicked travel notes, culture guides, and slow-travel
              routes written for curious Sri Lanka journeys.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left">
                <p className="text-white/70 text-xs uppercase tracking-widest">
                  Articles
                </p>
                <p className="text-white text-2xl font-bold">{posts.length}</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left">
                <p className="text-white/70 text-xs uppercase tracking-widest">
                  Categories
                </p>
                <p className="text-white text-2xl font-bold">
                  {categories.length - 1}
                </p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left">
                <p className="text-white/70 text-xs uppercase tracking-widest">
                  Updated
                </p>
                <p className="text-white text-lg font-semibold">Weekly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {featuredPost && (
        <div className="ceylon-container -mt-10 relative z-10">
          <div className="rounded-2xl border border-[#d9e2dc] bg-white shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
              <div
                className="min-h-[260px] bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredPost.image})` }}
              />
              <div className="p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8f6b2a] font-semibold mb-3">
                  Featured Story
                </p>
                <h2
                  className="text-2xl md:text-3xl text-[#1d3d33] mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {featuredPost.title}
                </h2>
                <p className="text-[#51665f] mb-4 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-[#5a7068] mb-6">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4" /> {featuredPost.readingTime}{" "}
                    min
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4" /> Popular this week
                  </span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center rounded-lg bg-[#204f40] px-4 py-2.5 text-white hover:bg-[#183d31] transition-colors"
                >
                  Read Featured Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-ceylon-sand/10 py-4">
        <div className="ceylon-container">
          <Breadcrumb>
            <BreadcrumbList className="text-ceylon-stone">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" asChild>
                  <Link
                    href="/"
                    className="hover:text-ceylon-tea transition-colors"
                  >
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-ceylon-sand" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-ceylon-tea font-medium">
                  Travel Blog
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="ceylon-container py-16">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-[#eef2ef] p-2 rounded-xl flex-wrap h-auto border border-[#d7e0db]">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-6 py-3 rounded-lg data-[state=active]:bg-[#204f40] data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => {
            const filteredPosts =
              category.id === "all"
                ? recentPosts
                : posts.filter(
                    (post) => categorySlug(post.category) === category.id
                  );

            return (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-0"
              >
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredPosts.map((post) => (
                      <BlogCard
                        key={post.slug}
                        post={{
                          slug: post.slug,
                          title: post.title,
                          excerpt: post.excerpt,
                          image: post.image,
                          date: new Date(post.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          ),
                          author: post.author,
                          category: post.category,
                          tags: post.tags || [],
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 bg-ceylon-sand/5 rounded-2xl border border-ceylon-sand/20">
                    <h3 className="text-2xl font-medium text-ceylon-stone mb-2">
                      No stories found in &quot;{category.name}&quot;
                    </h3>
                    <p className="text-ceylon-sand max-w-md mx-auto">
                      New posts are being prepared for this category.
                    </p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
