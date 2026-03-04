import { prisma } from "@/app/lib/prisma";
import { formatBlogPost } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const blogPostInclude = {
  comments: true,
  relatedPosts: {
    include: { related: true },
  },
};

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      include: blogPostInclude,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts.map(formatBlogPost));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      imageUrl,
      postDate,
      author,
      category,
      commentCount,
    } = body;

    const post = await prisma.blogPost.create({
      data: {
        title,
        excerpt,
        content,
        imageUrl,
        postDate: postDate ? new Date(postDate) : null,
        author,
        category,
        commentCount: commentCount ?? 0,
      },
      include: blogPostInclude,
    });

    return NextResponse.json(formatBlogPost(post));
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
