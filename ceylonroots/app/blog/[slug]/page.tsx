import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar, Clock, User } from "lucide-react";
import SeoJsonLd from "../../components/SeoJsonLd";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "../../lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  const slugParams = posts.map((post) => ({ slug: post.slug }));
  const legacyIdParams = posts.map((_, index) => ({
    slug: String(index + 1),
  }));

  return [...slugParams, ...legacyIdParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Blog | CeylonRoots" };
  }

  return {
    title: `${post.title} | CeylonRoots Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      images: [{ url: post.image }],
      authors: [post.author],
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  if (/^\d+$/.test(slug) && post.slug !== slug) {
    const { redirect } = await import("next/navigation");
    redirect(`/blog/${post.slug}`);
  }

  const headersList = headers();
  const host = (await headersList).get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const fullUrl = `${protocol}://${host}/blog/${slug}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
    },
    mainEntityOfPage: fullUrl,
    publisher: {
      "@type": "Organization",
      name: "CeylonRoots",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://ceylonroots.com",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_SITE_URL || "https://ceylonroots.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ceylonroots.com"}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ceylonroots.com"}/blog/${post.slug}`,
      },
    ],
  };

  const relatedPosts = getRelatedBlogPosts(slug, 3);

  return (
    <div className="bg-white min-h-screen">
      <SeoJsonLd data={[blogPostingSchema, breadcrumbSchema]} />

      <div className="relative h-[55vh] min-h-[420px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 ceylon-container py-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-wider bg-white/90 text-ceylon-stone mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-white/90 text-lg max-w-3xl mb-5">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="ceylon-container py-10">
        <div className="max-w-4xl mx-auto mb-6 text-sm text-ceylon-stone">
          <Link href="/" className="hover:text-ceylon-tea">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-ceylon-tea">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ceylon-tea">{post.title}</span>
        </div>

        <article className="max-w-4xl mx-auto prose prose-lg prose-headings:text-ceylon-stone prose-a:text-ceylon-tea hover:prose-a:text-ceylon-tea/80 prose-img:rounded-xl prose-img:shadow-lg">
          <MDXRemote source={post.content} />
        </article>

        <div className="max-w-4xl mx-auto mt-10 pt-8 border-t border-ceylon-sand/40">
          <div className="flex flex-wrap gap-2 mb-4">
            {(post.tags || []).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-ceylon-sand/30 text-ceylon-stone"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center text-ceylon-tea font-medium hover:text-ceylon-tea/80"
          >
            Back to all articles
          </Link>
        </div>

        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto mt-12 pt-10 border-t border-ceylon-sand/40">
            <h2 className="text-2xl font-bold text-ceylon-stone mb-6">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <article
                  key={related.slug}
                  className="bg-white rounded-xl border border-ceylon-sand/40 overflow-hidden shadow-sm"
                >
                  <Link href={`/blog/${related.slug}`}>
                    <div className="relative h-40">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-wider text-ceylon-tea mb-2">
                        {related.category}
                      </p>
                      <h3 className="text-base font-semibold text-ceylon-stone line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
