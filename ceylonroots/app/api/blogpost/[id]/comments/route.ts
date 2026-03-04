import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const postId = parseInt(id);

        const body = await request.json();
        const { author, text } = body;

        if (!author?.trim() || !text?.trim()) {
            return NextResponse.json(
                { error: "Name and comment are required" },
                { status: 400 }
            );
        }

        // Verify post exists
        const post = await prisma.blogPost.findUnique({ where: { id: postId } });
        if (!post) {
            return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
        }

        // Create comment and increment comment count in a transaction
        const [comment] = await prisma.$transaction([
            prisma.blogComment.create({
                data: {
                    postId,
                    author: author.trim(),
                    text: text.trim(),
                    commentDate: new Date(),
                },
            }),
            prisma.blogPost.update({
                where: { id: postId },
                data: { commentCount: { increment: 1 } },
            }),
        ]);

        return NextResponse.json(
            {
                id: comment.id,
                author: comment.author,
                text: comment.text,
                createdAt: comment.createdAt.toISOString(),
                avatarUrl: null,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error posting comment:", error);
        return NextResponse.json(
            { error: "Failed to post comment" },
            { status: 500 }
        );
    }
}
