// src/app/page.tsx (or src/app/blog_menu/page.tsx)
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface BlogPost {
  title: string;
  category: string;
  description: string;
  date: string;
  link: string;
  image: string;
}

export default function BlogPage() {
  const blogs: BlogPost[] = [
    {
      title: "Wish To Through To A Great Jackpot Slot > Enjoy 100 Percent Free",
      category: "Uncategorized",
      description: "Discover the best strategies for playing jackpot slots and how to enjoy 100% free spins without any initial investment.",
      date: "March 4, 2015",
      link: "/blog1",
      image: "/images/image1.jpg",
    },
    {
      title: "What Are IPv4 Address Block Sizes? Your Complete Guide",
      category: "Uncategorized",
      description: "Learn about IPv4 address block sizes, their importance, and how to choose the right block for your network needs.",
      date: "February 23, 2025",
      link: "/blog/what-are-ipv4",
      image: "/images/image2.jpeg",
    },
    {
      title: "Noxwin Local Casino 20 Signal-Right Up Totally Free Revolves",
      category: "Uncategorized",
      description: "Explore the benefits of Noxwin Local Casino's 20 free spins offer and how to make the most of your gaming experience.",
      date: "February 23, 2025",
      link: "/blog/noxwin-local-casino",
      image: "/images/image3.jpeg",
    },
  ];

  // Animation variants for the heading
  const headingVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation variants for blog cards
  const blogCardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white">
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            variants={headingVariants}
            initial="initial"
            animate="animate"
            className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Our Blogs
          </motion.h1>

          {blogs.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">No blogs available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.map((blog, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={blogCardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow duration-300"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  <div className="w-full h-32 relative overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/fallback.jpg";
                      }}
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] text-gray-500 uppercase mb-1.5">
                      {blog.category}
                    </p>
                    <h2 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-3 leading-tight">
                      {blog.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] text-gray-400">{blog.date}</p>
                      <Link
                        href={blog.link}
                        className="text-blue-600 font-medium text-xs hover:text-blue-700 transition-colors"
                        passHref
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-5 py-1.5 rounded-md font-medium text-sm shadow-sm hover:bg-blue-700 transition-all duration-300"
            >
              Load More
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}