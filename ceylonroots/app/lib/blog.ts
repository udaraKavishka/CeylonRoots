import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogFrontmatter = {
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  image: string;
  tags?: string[];
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
  readingTime: number;
};

const wordsPerMinute = 220;

const getReadingTime = (content: string) => {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const ensureBlogDirectory = () => {
  if (!fs.existsSync(BLOG_DIR)) {
    return [] as string[];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .sort();
};

export const getAllBlogPosts = (): BlogPost[] => {
  const files = ensureBlogDirectory();

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as BlogFrontmatter;

    return {
      ...frontmatter,
      slug,
      content,
      readingTime: getReadingTime(content),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getRelatedBlogPosts = (slug: string, limit = 3): BlogPost[] => {
  const current = getBlogPostBySlug(slug);
  const all = getAllBlogPosts().filter((post) => post.slug !== slug);

  if (!current) {
    return all.slice(0, limit);
  }

  const currentTags = new Set(
    (current.tags || []).map((tag) => tag.toLowerCase())
  );

  return all
    .map((post) => {
      const overlap = (post.tags || []).filter((tag) =>
        currentTags.has(tag.toLowerCase())
      ).length;
      return { post, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap)
    .map((entry) => entry.post)
    .slice(0, limit);
};

export const getBlogPostBySlug = (slug: string): BlogPost | null => {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    if (/^\d+$/.test(slug)) {
      const index = Number(slug) - 1;
      const posts = getAllBlogPosts();
      if (index >= 0 && index < posts.length) {
        return posts[index];
      }
    }
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: getReadingTime(content),
  };
};
