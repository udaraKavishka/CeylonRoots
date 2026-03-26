import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Calendar, User, Clock, ChevronDown, Tag } from "lucide-react";
import BlogCommentsSection from "../../components/blog/BlogCommentsSection";
import { prisma } from "../../lib/prisma";

const blogPostInclude = {
  comments: true,
  relatedPosts: {
    include: { related: true },
  },
} as const;

async function getBlogPost(id: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: parseInt(id) },
      include: blogPostInclude,
    });
    return post;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPost(id);
  if (!post) return { title: "Blog | CeylonRoots" };
  return {
    title: `${post.title} | CeylonRoots Blog`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
      type: "article",
      publishedTime: post.postDate?.toISOString(),
      authors: post.author ? [post.author] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({ select: { id: true } });
    return posts.map((p) => ({ id: p.id.toString() }));
  } catch {
    return [];
  }
}

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const post = await getBlogPost(id);

  const headersList = headers();
  const host = (await headersList).get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const fullUrl = `${protocol}://${host}/blog/${id}`;

  if (!post) {
    notFound();
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Estimate reading time based on content word count (~200 wpm)
  const wordCount = post.content
    ? post.content
        .replace(/<[^>]+>/g, "")
        .split(/\s+/)
        .filter(Boolean).length
    : 0;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div style={{ backgroundColor: "#FAFAF8" }} className="min-h-screen">
      {/* ========== FULL-VIEWPORT HERO ========== */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "100vh", minHeight: "600px" }}
      >
        {/* Hero Image */}
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            style={{
              transform: "scale(1.05)",
              transformOrigin: "center center",
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-ceylon-stone" />
        )}

        {/* Dramatic gradient: transparent top → dark bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.65) 70%, rgba(10,10,10,0.92) 100%)",
          }}
        />

        {/* Category badge — top left floating pill */}
        {post.category && (
          <div className="absolute top-8 left-8 z-10">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-white"
              style={{
                backgroundColor: "rgba(46,139,87,0.82)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(46,139,87,0.5)",
              }}
            >
              <Tag className="h-3 w-3" />
              {post.category}
            </span>
          </div>
        )}

        {/* Hero text content — anchored to bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 ceylon-container pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <h1
              className="font-bold text-white mb-5 leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
                textShadow: "0 2px 24px rgba(0,0,0,0.45)",
                letterSpacing: "-0.01em",
              }}
            >
              {post.title}
            </h1>

            {/* Author · Date separator row */}
            <div
              className="flex flex-wrap items-center gap-2 text-white/80 text-sm"
              style={{ fontFamily: "inherit", letterSpacing: "0.04em" }}
            >
              {post.author && (
                <span className="flex items-center gap-1.5 lowercase">
                  <User className="h-3.5 w-3.5 opacity-70" />
                  {post.author}
                </span>
              )}
              {post.author && post.postDate && (
                <span className="opacity-40 text-base">·</span>
              )}
              {post.postDate && (
                <span className="flex items-center gap-1.5 lowercase">
                  <Calendar className="h-3.5 w-3.5 opacity-70" />
                  {formatDate(post.postDate)}
                </span>
              )}
              <span className="opacity-40 text-base">·</span>
              <span className="flex items-center gap-1.5 lowercase">
                <Clock className="h-3.5 w-3.5 opacity-70" />
                {readingMinutes} min read
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator — bouncing arrow */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <span
            className="text-white/50 text-xs uppercase tracking-widest"
            style={{ fontSize: "0.6rem" }}
          >
            scroll
          </span>
          <ChevronDown
            className="h-5 w-5 text-white/60"
            style={{ animation: "bounce 2s infinite" }}
          />
        </div>
      </section>

      {/* ========== BREADCRUMBS ========== */}
      <div
        className="bg-white border-b"
        style={{ borderColor: "rgba(232,218,204,0.4)" }}
      >
        <div className="ceylon-container py-3.5">
          <Breadcrumb>
            <BreadcrumbList className="text-ceylon-stone text-xs">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/"
                    className="hover:text-ceylon-tea transition-colors"
                  >
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator style={{ color: "var(--ceylon-sand)" }} />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/blog"
                    className="hover:text-ceylon-tea transition-colors"
                  >
                    Travel Blog
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator style={{ color: "var(--ceylon-sand)" }} />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-ceylon-tea font-medium line-clamp-1">
                  {post.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ========== MAIN LAYOUT: ARTICLE + SIDEBAR ========== */}
      <div className="ceylon-container py-14 md:py-18">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-start">
          {/* ======= ARTICLE COLUMN ======= */}
          <main className="w-full lg:flex-1 min-w-0 space-y-10">
            {/* Excerpt / Lede */}
            {post.excerpt && (
              <p
                className="text-ceylon-stone leading-relaxed"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.25rem",
                  fontStyle: "italic",
                  lineHeight: "1.8",
                  borderLeft: "3px solid var(--ceylon-tea)",
                  paddingLeft: "1.25rem",
                  color: "#3d3d3d",
                }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Article body */}
            <article>
              <style>{`
                                .magazine-article {
                                    color: #1a1a1a;
                                    font-size: 1.0625rem;
                                    line-height: 1.9;
                                    letter-spacing: 0.01em;
                                }
                                .magazine-article > *:first-child::first-letter,
                                .magazine-article > p:first-of-type::first-letter {
                                    font-family: 'Playfair Display', Georgia, serif;
                                    font-size: 4.5rem;
                                    font-weight: 700;
                                    line-height: 0.8;
                                    float: left;
                                    margin: 0.08em 0.12em 0 0;
                                    color: var(--ceylon-tea);
                                }
                                .magazine-article h1,
                                .magazine-article h2,
                                .magazine-article h3,
                                .magazine-article h4 {
                                    font-family: 'Playfair Display', Georgia, serif;
                                    color: #1a1a1a;
                                    margin-top: 2.5rem;
                                    margin-bottom: 1rem;
                                    line-height: 1.25;
                                }
                                .magazine-article h2 {
                                    font-size: 1.65rem;
                                    padding-bottom: 0.5rem;
                                    border-bottom: 2px solid var(--ceylon-tea);
                                    display: inline-block;
                                }
                                .magazine-article h3 {
                                    font-size: 1.25rem;
                                    padding-left: 0.85rem;
                                    border-left: 3px solid var(--ceylon-gold);
                                }
                                .magazine-article p {
                                    margin-bottom: 1.6rem;
                                }
                                .magazine-article a {
                                    color: var(--ceylon-tea);
                                    text-decoration: underline;
                                    text-underline-offset: 3px;
                                }
                                .magazine-article a:hover {
                                    color: #1d6b3e;
                                }
                                .magazine-article blockquote {
                                    font-family: 'Playfair Display', Georgia, serif;
                                    font-size: 1.4rem;
                                    font-style: italic;
                                    color: #2a2a2a;
                                    border-left: 4px solid var(--ceylon-tea);
                                    margin: 2.5rem 0;
                                    padding: 1.5rem 0 1.5rem 2rem;
                                    background: rgba(46,139,87,0.04);
                                    border-radius: 0 0.5rem 0.5rem 0;
                                    line-height: 1.6;
                                }
                                .magazine-article blockquote::before {
                                    content: '\\201C';
                                    font-size: 4rem;
                                    color: var(--ceylon-tea);
                                    opacity: 0.25;
                                    display: block;
                                    line-height: 0.5;
                                    margin-bottom: 0.5rem;
                                }
                                .magazine-article ul,
                                .magazine-article ol {
                                    padding-left: 1.5rem;
                                    margin-bottom: 1.6rem;
                                }
                                .magazine-article ul li {
                                    list-style: disc;
                                    margin-bottom: 0.5rem;
                                }
                                .magazine-article ol li {
                                    list-style: decimal;
                                    margin-bottom: 0.5rem;
                                }
                                .magazine-article img {
                                    border-radius: 0.5rem;
                                    margin: 2rem 0;
                                    width: 100%;
                                    height: auto;
                                }
                                .magazine-article strong {
                                    color: #1a1a1a;
                                    font-weight: 700;
                                }
                                .magazine-article em {
                                    color: #2a2a2a;
                                }
                                .magazine-article hr {
                                    border: none;
                                    border-top: 1px solid rgba(232,218,204,0.7);
                                    margin: 2.5rem 0;
                                }
                                @keyframes bounce {
                                    0%, 100% { transform: translateY(0); }
                                    50% { transform: translateY(6px); }
                                }
                            `}</style>

              {post.content && (
                <div
                  className="magazine-article prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </article>

            {/* ===== SOCIAL SHARE STRIP ===== */}
            <div
              className="flex flex-wrap items-center gap-4 pt-8"
              style={{ borderTop: "1px solid rgba(232,218,204,0.6)" }}
            >
              <span
                className="text-sm font-semibold uppercase tracking-widest"
                style={{
                  color: "#888",
                  letterSpacing: "0.12em",
                  fontSize: "0.7rem",
                }}
              >
                Share this story
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="flex items-center justify-center h-10 w-10 rounded-full transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: "#1877F2", color: "#fff" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(fullUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                  className="flex items-center justify-center h-10 w-10 rounded-full transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: "#1DA1F2", color: "#fff" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.instagram.com/share?url=${encodeURIComponent(fullUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Instagram"
                  className="flex items-center justify-center h-10 w-10 rounded-full transition-all duration-200 hover:scale-110"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 110%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                    color: "#fff",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* ===== COMMENTS SECTION ===== */}
            <section
              className="rounded-2xl p-6 md:p-10"
              style={{
                backgroundColor: "#fff",
                boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
                border: "1px solid rgba(232,218,204,0.35)",
              }}
            >
              <BlogCommentsSection
                postId={id}
                initialComments={post.comments.map((c) => ({
                  id: c.id,
                  author: c.author ?? "Anonymous",
                  text: c.text ?? "",
                  createdAt: c.createdAt.toISOString(),
                  avatarUrl: c.avatarUrl ?? null,
                }))}
                initialCount={post.commentCount ?? 0}
              />
            </section>
          </main>

          {/* ======= SIDEBAR ======= */}
          <aside className="w-full lg:w-80 xl:w-88 shrink-0 space-y-7 lg:sticky lg:top-24 self-start">
            {/* Author Card */}
            {post.author && (
              <div
                className="rounded-2xl p-6 overflow-hidden relative"
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                  border: "1px solid rgba(232,218,204,0.3)",
                }}
              >
                {/* decorative accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-ceylon-tea"
                  style={{ borderRadius: "0.5rem 0.5rem 0 0" }}
                />
                <div className="flex items-center gap-4 mb-4">
                  <Avatar
                    className="h-16 w-16 shrink-0"
                    style={{
                      border: "2px solid var(--ceylon-tea)",
                      boxShadow: "0 0 0 3px rgba(46,139,87,0.12)",
                    }}
                  >
                    <AvatarFallback
                      style={{
                        background:
                          "linear-gradient(135deg, #2E8B57 0%, #1d6b3e 100%)",
                        color: "#fff",
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                      }}
                    >
                      {getInitials(post.author)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3
                      className="font-bold text-base leading-tight"
                      style={{
                        color: "#1a1a1a",
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {post.author}
                    </h3>
                    <p
                      className="text-xs uppercase tracking-widest mt-0.5"
                      style={{
                        color: "var(--ceylon-tea)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Travel Writer
                    </p>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#555", lineHeight: "1.75" }}
                >
                  An experienced travel writer with a passion for exploring Sri
                  Lanka&apos;s hidden treasures and sharing authentic cultural
                  experiences.
                </p>
                {/* Reading time badge */}
                <div
                  className="mt-4 flex items-center gap-2 text-xs"
                  style={{ color: "#888" }}
                >
                  <Clock
                    className="h-3.5 w-3.5"
                    style={{ color: "var(--ceylon-tea)" }}
                  />
                  <span>
                    {readingMinutes} minute read · {wordCount.toLocaleString()}{" "}
                    words
                  </span>
                </div>
              </div>
            )}

            {/* Related Articles Card */}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                  border: "1px solid rgba(232,218,204,0.3)",
                }}
              >
                <div className="px-6 pt-6 pb-2">
                  <h3
                    className="text-sm font-semibold uppercase tracking-widest pb-3"
                    style={{
                      color: "#1a1a1a",
                      letterSpacing: "0.1em",
                      borderBottom: "1.5px solid var(--ceylon-tea)",
                      display: "inline-block",
                    }}
                  >
                    Related Articles
                  </h3>
                </div>
                <div className="px-6 pb-6 pt-3 space-y-5">
                  {post.relatedPosts.map(({ related }) => (
                    <Link
                      href={`/blog/${related.id}`}
                      key={related.id}
                      className="group flex items-start gap-3 transition-all duration-200"
                    >
                      {/* Thumbnail with hover zoom */}
                      <div
                        className="shrink-0 overflow-hidden rounded-lg"
                        style={{
                          width: "72px",
                          height: "60px",
                          backgroundColor: "#f0ece8",
                        }}
                      >
                        {related.imageUrl ? (
                          <Image
                            src={related.imageUrl}
                            alt={related.title}
                            width={72}
                            height={60}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-ceylon-sand/30" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className="text-sm font-medium line-clamp-2 leading-snug transition-colors duration-150 group-hover:text-ceylon-tea"
                          style={{ color: "#1a1a1a" }}
                        >
                          {related.title}
                        </h4>
                        {related.postDate && (
                          <p className="text-xs mt-1" style={{ color: "#aaa" }}>
                            {formatDate(related.postDate)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Category Tags Card */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "#fff",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                border: "1px solid rgba(232,218,204,0.3)",
              }}
            >
              <h3
                className="text-sm font-semibold uppercase tracking-widest pb-3 mb-4"
                style={{
                  color: "#1a1a1a",
                  letterSpacing: "0.1em",
                  borderBottom: "1.5px solid var(--ceylon-tea)",
                  display: "inline-block",
                }}
              >
                Explore Topics
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  { id: "hidden-gems", name: "Hidden Gems" },
                  { id: "food", name: "Local Food" },
                  { id: "culture", name: "Cultural Events" },
                  { id: "stories", name: "Traveler Stories" },
                  { id: "beaches", name: "Beaches" },
                  { id: "wildlife", name: "Wildlife" },
                ].map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blog?category=${cat.id}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: "rgba(46,139,87,0.09)",
                      color: "var(--ceylon-tea)",
                      border: "1px solid rgba(46,139,87,0.2)",
                    }}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Tags Card */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "#fff",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                border: "1px solid rgba(232,218,204,0.3)",
              }}
            >
              <h3
                className="text-sm font-semibold uppercase tracking-widest pb-3 mb-4"
                style={{
                  color: "#1a1a1a",
                  letterSpacing: "0.1em",
                  borderBottom: "1.5px solid var(--ceylon-gold)",
                  display: "inline-block",
                }}
              >
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "beaches",
                  "wildlife",
                  "temples",
                  "hiking",
                  "photography",
                  "ayurveda",
                ].map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-all duration-200 capitalize hover:text-white"
                    style={{
                      backgroundColor: "rgba(212,175,55,0.10)",
                      color: "#9a7b1a",
                      border: "1px solid rgba(212,175,55,0.3)",
                    }}
                    onMouseOver={(e) => {
                      (
                        e.currentTarget as HTMLAnchorElement
                      ).style.backgroundColor = "var(--ceylon-gold)";
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#fff";
                    }}
                    onMouseOut={(e) => {
                      (
                        e.currentTarget as HTMLAnchorElement
                      ).style.backgroundColor = "rgba(212,175,55,0.10)";
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#9a7b1a";
                    }}
                  >
                    # {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Back to blog CTA */}
            <div className="text-center pt-2">
              <Button
                asChild
                className="w-full rounded-full font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "var(--ceylon-tea)",
                  color: "#fff",
                  boxShadow: "0 4px 14px rgba(46,139,87,0.3)",
                }}
              >
                <Link href="/blog">Browse All Articles</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
