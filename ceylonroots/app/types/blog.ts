export interface BlogPost {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  postDate: string;
  author: string;
  category: string;
  commentCount: number ;
  comments: BlogComment[];
  relatedPosts: BlogPost[];
}

export interface BlogComment {
  id: number;
  author: string;
  avatar?: string;
  date: string;
  text: string;
}
