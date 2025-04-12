// app/components/ServicesSection.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  const services = [
    {
      title: 'Buying IP Addresses',
      description: 'We stand behind our services with a 100% satisfaction guarantee, giving you confidence in every purchase. Our IPv4 blocks come at competitive prices, so you know you\'re getting a great deal.',
      icon: '/images/01.png',
      image: '/images/b8.jpg',
      link: '/buyip',
    },
    {
      title: 'Selling IP Addresses',
      description: 'We excel as an IPv4 block sales platform, linking buyers and sellers across the globe. As part of our comprehensive service offering, we work with you and the potential buyer to facilitate the IPv4 transfer legally, safely, and efficiently.',
      icon: '/images/02.png',
      image: '/images/b9.avif',
      link: '/sellip',
    },
    {
      title: 'Leasing IP Addresses',
      description: 'Looking for a reliable IP address provider? You can now lease IPv4 blocks from us and enjoy a seamless experience with: - Secure and stable IP addresses - Flexible rental plans - Quick and hassle-free setup',
      icon: '/images/03.png',
      image: '/images/b10.webp',
      link: '/leaseip',
    },
  ];

  // Animation for the heading
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation for service cards on entrance
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  // Animation for service cards on hover
  const hoverVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Animation for the background image on hover
  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Animation for the "Read More" button
  const buttonVariants = {
    hover: {
      scale: 1.1,
      background: "linear-gradient(to right, #1d4ed8, #3b82f6)",
      boxShadow: "0 0 12px rgba(29, 78, 216, 0.5)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.section
      className="py-16 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Heading */}
        <motion.h2
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 text-gray-800"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          ATCS IP Solutions Provides Best Solutions
        </motion.h2>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={hoverVariants}
              className="relative overflow-hidden rounded-xl shadow-lg border border-gray-200 group"
            >
              {/* Background Image */}
              <motion.div
                variants={imageVariants}
                initial="initial"
                whileHover="hover"
                className="w-full h-72 sm:h-80 relative"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    console.error(`Failed to load service image ${service.image}:`, target.src);
                  }}
                />
              </motion.div>

              {/* Overlay with Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-blue-900/50 flex flex-col items-center justify-center text-white p-6">
                <div className="relative w-12 h-12 mb-4">
                  <Image
                    src={service.icon}
                    alt={`${service.title} Icon`}
                    fill
                    className="object-contain"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement;
                      console.error(`Failed to load icon ${service.icon}:`, target.src);
                    }}
                  />
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-3 text-center"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm sm:text-base text-center mb-6 line-clamp-4"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  {service.description}
                </p>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href={service.link}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    Read More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}