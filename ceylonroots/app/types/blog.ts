export interface BlogPost {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  excerpt: string;
  content: string | string[];
  imageUrl?: string;
  image?: string;
  postDate?: string;
  date?: string;
  author?: string;
  category: string;
  commentCount: number;
  comments?: BlogComment[];
  relatedPosts?: Partial<BlogPost>[];
  tags?: string[];
}

export interface BlogComment {
  id: number;
  author: string;
  avatar?: string;
  date: string;
  text: string;
}
