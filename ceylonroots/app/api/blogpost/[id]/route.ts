import { prisma } from "@/app/lib/prisma";
import { formatBlogPost } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const blogPostInclude = {
  comments: true,
  relatedPosts: {
    include: { related: true },
  },
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { id: parseInt(id) },
      include: blogPostInclude,
    });
    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(formatBlogPost(post));
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, excerpt, content, imageUrl, postDate, author, category, commentCount } = body;

    const post = await prisma.blogPost.update({
      where: { id: parseInt(id) },
      data: {
        ...(title !== undefined && { title }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content !== undefined && { content }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(postDate !== undefined && { postDate: new Date(postDate) }),
        ...(author !== undefined && { author }),
        ...(category !== undefined && { category }),
        ...(commentCount !== undefined && { commentCount }),
      },
      include: blogPostInclude,
    });

    return NextResponse.json(formatBlogPost(post));
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.blogPost.delete({ where: { id: parseInt(id) } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
