"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

// Constants for reusability
const HEADING_TEXT = "Our Blogs";
const FONT_STYLES = {
  poppins: "'Poppins', sans-serif",
  roboto: "'Roboto', sans-serif",
};
const GRADIENT_CLASSES = "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700";

// Animation variants
const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut", delay: i * 0.1 }, // Matches animate-fadeIn duration
  }),
  hover: {
    scale: 1.03,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
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
    <section
      className="py-12 bg-gradient-to-b from-gray-50 to-white"
      aria-label="Blog Posts Section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10 text-center animate-fadeIn"
          style={{
            fontFamily: FONT_STYLES.poppins,
            background: "linear-gradient(to right, #FFD700, #DAA520)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {HEADING_TEXT}
        </motion.h1>

        {/* Mobile Slider (flex) / Desktop Grid */}
        <div
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8"
          role="region"
          aria-label="Blog posts carousel"
        >
          {blogPosts.map((post: BlogPost, index: number) => (
            <motion.div
              key={post.slug.current}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="flex-none w-[85%] sm:w-auto snap-center bg-white rounded-lg shadow-md overflow-hidden mx-2 sm:mx-0 first:ml-4 last:mr-4 sm:first:ml-0 sm:last:mr-0 animate-fadeIn"
            >
              <div className="p-5 sm:p-6">
                <h2
                  className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 line-clamp-2"
                  style={{ fontFamily: FONT_STYLES.poppins }}
                >
                  {post.title}
                </h2>
                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-4">
                  <span style={{ fontFamily: FONT_STYLES.roboto }}>
                    {post.author}
                  </span>
                  <span style={{ fontFamily: FONT_STYLES.roboto }}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className={`inline-block ${GRADIENT_CLASSES} text-white font-semibold py-2 px-4 rounded text-sm sm:text-base transition-colors duration-300`}
                  style={{ fontFamily: FONT_STYLES.poppins }}
                  aria-label={`Read more about ${post.title}`}
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