// app/blog_menu/page.tsx
import { client } from '@/sanity/lib/client';
import { POSTS_QUERY } from '@/sanity/lib/quries';
import BlogMenuClient from './BlogMenuClient';

interface BlogPost {
  title: string;
  slug: { current: string };
  author: string;
  publishedAt: string;
}

export default async function BlogMenuPage() {
  const blogPosts: BlogPost[] = await client.fetch(POSTS_QUERY);
  console.log('Blog Posts:', blogPosts); // Debug
  return <BlogMenuClient blogPosts={blogPosts} />;
}