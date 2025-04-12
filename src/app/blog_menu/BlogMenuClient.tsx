// app/blog_menu/BlogMenuClient.tsx
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.2 },
  }),
  hover: {
    scale: 1.03,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

interface BlogPost {
  title: string;
  slug: { current: string };
  author: string;
  publishedAt: string;
}

interface BlogMenuClientProps {
  blogPosts: BlogPost[];
}

export default function BlogMenuClient({ blogPosts }: BlogMenuClientProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-12 text-center"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(to right, #FFD700, #DAA520)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Our Blogs
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post: BlogPost, index: number) => (
            <motion.div
              key={post.slug.current}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2
                  className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {post.title}
                </h2>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span style={{ fontFamily: "'Roboto', sans-serif" }}>
                    {post.author}
                  </span>
                  <span style={{ fontFamily: "'Roboto', sans-serif" }}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}