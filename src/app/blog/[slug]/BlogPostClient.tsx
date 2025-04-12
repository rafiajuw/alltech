// File: D:\muneb\final1\all-tech\src\app\blog\[slug]\BlogPostClient.tsx
"use client";

import HeroSection from '@/app/Components/HeroSection1';
import BlogContent from '@/app/Components/blogcontent';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  hover: {
    scale: 1.05,
    color: '#1E90FF',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

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

interface BlogPostClientProps {
  post: BlogPost;
  prevPost: PrevNextPost | null;
  nextPost: PrevNextPost | null;
}

export default function BlogPostClient({ post, prevPost, nextPost }: BlogPostClientProps) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection
          title={post.title}
          author={`By ${post.author}`}
          date={new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
          description="Read more about this post"
        />
        <BlogContent>
          <section className="mb-16">
            <div
              className="text-base sm:text-lg text-gray-800 leading-relaxed"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              <PortableText
                value={post.body}
                components={{
                  block: {
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
                    ),
                    normal: ({ children }) => (
                      <p className="mb-4 text-gray-800 leading-relaxed">{children}</p>
                    ),
                  },
                }}
              />
            </div>
          </section>
          <section className="flex justify-between items-center mt-12 border-t border-gray-300 pt-8">
            {prevPost ? (
              <motion.div
                variants={linkVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <Link
                  href={`/blog/${prevPost.slug.current}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-sm font-semibold uppercase"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  ← Previous: {prevPost.title}
                </Link>
              </motion.div>
            ) : (
              <div />
            )}
            {nextPost ? (
              <motion.div
                variants={linkVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <Link
                  href={`/blog/${nextPost.slug.current}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-sm font-semibold uppercase"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Next: {nextPost.title} →
                </Link>
              </motion.div>
            ) : (
              <div />
            )}
          </section>
        </BlogContent>
      </div>
    </div>
  );
}