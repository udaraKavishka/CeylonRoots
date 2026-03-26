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

const categories = [
  { id: "all", name: "All Stories" },
  { id: "hidden-gems", name: "Hidden Gems" },
  { id: "food", name: "Local Food" },
  { id: "culture", name: "Cultural Events" },
  { id: "adventure", name: "Adventure" },
];

const categorySlug = (value: string) =>
  value.toLowerCase().replace(/\s+/g, "-");

export default function BlogPage() {
  const posts = getAllBlogPosts();

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

      <div className="relative bg-gradient-to-br from-ceylon-tea/95 via-ceylon-stone/90 to-ceylon-tea-dark/95 pt-28 pb-16">
        <div className="ceylon-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Sri Lanka&apos;s Hidden Stories
            </h1>
            <p className="text-xl text-ceylon-sand-light max-w-2xl mx-auto mb-10">
              Journey through authentic experiences, local secrets, and cultural
              treasures
            </p>
          </div>
        </div>
      </div>

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
            <TabsList className="bg-ceylon-sand/10 p-2 rounded-xl flex-wrap h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-6 py-3 rounded-lg data-[state=active]:bg-ceylon-tea data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => {
            const filteredPosts =
              category.id === "all"
                ? posts
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
