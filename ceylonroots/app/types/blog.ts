export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string[];
    image: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
    commentCount: number;
    comments?: BlogComment[];
    relatedPosts?: {
        id: number;
        title: string;
        image: string;
        date: string;
    }[];
}

export interface BlogComment {
    id: number;
    author: string;
    avatar?: string;
    date: string;
    text: string;
}
