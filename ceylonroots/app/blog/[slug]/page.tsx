import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar, Clock, User } from "lucide-react";
import SeoJsonLd from "../../components/SeoJsonLd";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "../../lib/blog";
import ReadingProgressBar from "../../components/blog/ReadingProgressBar";
import SocialShareButtons from "../../components/blog/SocialShareButtons";
import NewsletterCTA from "../../components/blog/NewsletterCTA";
import TableOfContents from "../../components/blog/TableOfContents";
import type { ReactNode } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const mdxComponents = {
  h2: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) => {
    const id = typeof children === "string" ? slugify(children) : "";
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) => {
    const id = typeof children === "string" ? slugify(children) : "";
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    );
  },
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
  const fullUrl = `${protocol}://${host}/blog/${post.slug}`;

  // Extract headings from MDX content for table of contents
  const headings = post.content
    .split("\n")
    .filter((line) => /^#{2,3}\s/.test(line))
    .map((line) => {
      const level = line.startsWith("### ") ? (3 as const) : (2 as const);
      const text = line.replace(/^#{2,3}\s+/, "").trim();
      return { id: slugify(text), text, level };
    })
    .filter((h) => h.id.length > 0);

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
  const authorInitials = post.author
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-white min-h-screen">
      <SeoJsonLd data={[blogPostingSchema, breadcrumbSchema]} />
      <ReadingProgressBar />

      {/* Hero */}
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
          <div className="max-w-7xl mx-auto">
            <Link
              href={`/blog`}
              className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-wider bg-white/90 text-ceylon-stone mb-4 hover:bg-white transition-colors"
            >
              {post.category}
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 max-w-4xl">
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

      {/* Breadcrumb */}
      <div className="bg-ceylon-sand/10 py-4">
        <div className="ceylon-container">
          <div className="max-w-7xl mx-auto">
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
                  <BreadcrumbLink href="/blog" asChild>
                    <Link
                      href="/blog"
                      className="hover:text-ceylon-tea transition-colors"
                    >
                      Blog
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-ceylon-sand" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-ceylon-tea font-medium line-clamp-1 max-w-[280px]">
                    {post.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="ceylon-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 max-w-7xl mx-auto">

          {/* Left: Article content */}
          <main className="min-w-0">
            <article className="
              prose prose-lg max-w-none min-w-0
              prose-headings:font-serif prose-headings:text-ceylon-ocean
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-ceylon-sand/40
              prose-h3:text-xl prose-h3:text-ceylon-stone prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-ceylon-tea prose-a:no-underline hover:prose-a:underline
              prose-strong:text-ceylon-stone prose-strong:font-semibold
              prose-blockquote:border-l-4 prose-blockquote:border-ceylon-tea prose-blockquote:bg-ceylon-sand/20 prose-blockquote:rounded-r-xl prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:text-ceylon-stone
              prose-code:bg-ceylon-sand/30 prose-code:text-ceylon-spice prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-ceylon-ocean prose-pre:text-ceylon-sand prose-pre:rounded-xl prose-pre:shadow-lg
              prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full
              prose-ul:my-4 prose-li:my-1.5
              prose-hr:border-ceylon-sand/30
            ">
              <MDXRemote source={post.content} components={mdxComponents} />
            </article>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-ceylon-sand/30">
              <div className="flex flex-wrap gap-2 mb-5">
                {(post.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-ceylon-sand/30 text-ceylon-stone font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center text-ceylon-tea font-medium hover:text-ceylon-tea/80 text-sm"
              >
                ← Back to all articles
              </Link>
            </div>

            {/* Author Bio */}
            <div className="mt-8 bg-ceylon-sand/10 rounded-2xl border border-ceylon-sand/30 p-6 flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-ceylon-tea/10 border-2 border-ceylon-tea/20 flex items-center justify-center shrink-0">
                <span className="text-ceylon-tea font-bold text-lg font-serif">
                  {authorInitials}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-ceylon-stone/50 mb-0.5">
                  Written by
                </p>
                <h4 className="font-serif font-bold text-ceylon-stone text-lg leading-tight mb-1">
                  {post.author}
                </h4>
                <p className="text-sm text-ceylon-stone/70 leading-relaxed">
                  Travel writer and Sri Lanka specialist at CeylonRoots.
                  Passionate about authentic experiences, local culture, and
                  helping travellers explore the island beyond the guidebooks.
                </p>
              </div>
            </div>

            {/* Social share */}
            <SocialShareButtons url={fullUrl} title={post.title} />

            {/* Newsletter CTA */}
            <NewsletterCTA />

          </main>

          {/* Right: Sticky sidebar (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents headings={headings} />

              {relatedPosts.length > 0 && (
                <div className="bg-ceylon-sand/10 rounded-2xl border border-ceylon-sand/30 p-5">
                  <h3 className="font-serif text-base font-bold text-ceylon-stone mb-4">
                    You Might Also Like
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        href={`/blog/${related.slug}`}
                        key={related.slug}
                        className="flex gap-3 group"
                      >
                        <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-ceylon-tea uppercase tracking-wider mb-1">
                            {related.category}
                          </p>
                          <p className="text-sm font-medium text-ceylon-stone line-clamp-2 group-hover:text-ceylon-tea transition-colors leading-snug">
                            {related.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

        </div>

        {/* Mobile: Related posts below comments */}
        {relatedPosts.length > 0 && (
          <section className="lg:hidden mt-12 pt-10 border-t border-ceylon-sand/30 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-ceylon-stone mb-6">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <article
                  key={related.slug}
                  className="bg-white rounded-xl border border-ceylon-sand/30 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link href={`/blog/${related.slug}`}>
                    <div className="relative h-40">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
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
