import type { CollectionEntry } from 'astro:content';

export interface BlogPost extends CollectionEntry<'blog'> {
  data: {
    title: string;
    description: string;
    pubDate: Date;
    author: string;
    image: string;
    tags?: string[];
    draft: boolean;
  };
}

export interface PaginatedBlogPosts {
  currentPage: number;
  lastPage: number;
  url: {
    current: string;
    prev: string | undefined;
    next: string | undefined;
  };
  data: BlogPost[];
}