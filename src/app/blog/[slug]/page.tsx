// File: D:\muneb\final1\all-tech\src\app\blog\[slug]\page.tsx
import { client } from '@/sanity/lib/client';
import { POST_QUERY, PREV_NEXT_POSTS_QUERY, POST_SLUGS_QUERY } from '@/sanity/lib/quries';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';

// Type definitions
interface Slug {
  current: string;
  _type: string;
}

interface BlogPost {
  title: string;
  slug: Slug;
  author: string;
  publishedAt: string;
  body: PortableTextBlock[];
}

interface PrevNextPost {
  title: string;
  slug: Slug;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Fetch the blog post
  const post = await client.fetch<BlogPost | null>(POST_QUERY, { slug });
  if (!post) {
    notFound();
  }

  // Sanitize the post data to avoid circular references or excessive nesting
  const sanitizedPost = {
    title: post.title,
    slug: { current: post.slug.current, _type: post.slug._type },
    author: post.author,
    publishedAt: post.publishedAt,
    body: post.body, // Ensure this isn't too large or circular
  };

  // Fetch all posts for prev/next navigation
  const allPosts = await client.fetch<PrevNextPost[]>(PREV_NEXT_POSTS_QUERY);
  const currentIndex = allPosts.findIndex(
    (p) => p.slug.current.toLowerCase() === slug.toLowerCase()
  );

  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Sanitize prev/next posts
  const sanitizedPrevPost = prevPost ? { title: prevPost.title, slug: prevPost.slug } : null;
  const sanitizedNextPost = nextPost ? { title: nextPost.title, slug: nextPost.slug } : null;

  return (
    <BlogPostClient
      post={sanitizedPost}
      prevPost={sanitizedPrevPost}
      nextPost={sanitizedNextPost}
    />
  );
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await client.fetch<{ slug: string }[]>(POST_SLUGS_QUERY);
  return slugs.map((item) => ({ slug: item.slug }));
}

export const revalidate = 60; // ISR every 60 seconds