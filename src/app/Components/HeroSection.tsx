"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Variants } from 'framer-motion';

// Constants for reusability
const HERO_CONTENT = {
  title: "Where Connectivity Meets Possibility",
  subtitle: "Trusted by professionals, chosen for reliability — your IPv4 brokerage partner.",
  buttonText: "Contact Us",
  buttonHref: "/contactus",
  backgroundImage: "/images/haxagon.jpg",
};

// Animation variants with proper typing
const bgVariants: Variants = {
  initial: { scale: 1, opacity: 0.8 },
  animate: {
    scale: 1.1, // Reduced scale for performance
    opacity: 1,
    transition: {
      duration: 8, // Slightly faster for smoother experience
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
  hover: {
    scale: 1.12, // Subtle hover effect
    transition: { duration: 0.3 },
  },
};

const textVariants: Variants = {
  initial: { y: 20, opacity: 0 }, // Adjusted for smoother entrance
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const buttonVariants: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.6, ease: "easeOut" },
  },
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95 }, // Added tap effect for better UX
};

// Reusable Button Component (aligned with Contact page style)
const HeroButton = ({ href, text }: { href: string; text: string }) => (
  <Link href={href} passHref>
    <motion.button
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-colors duration-300 text-base md:text-lg"
      aria-label={text}
    >
      {text}
    </motion.button>
  </Link>
);

export default function HeroSection() {
  return (
    <section
      className="relative h-[80vh] overflow-hidden"
      role="banner"
      aria-label="Hero Section"
    >
      {/* Background Image */}
      <motion.div
        variants={bgVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="absolute inset-0"
      >
        <Image
          src={HERO_CONTENT.backgroundImage}
          alt="IPv4 brokerage background with hexagonal pattern"
          fill
          className="object-cover"
          priority
          quality={75} // Slightly reduced for performance
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" // Responsive image sizes
        />
      </motion.div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10 flex flex-col items-center justify-center text-white px-4">
        <motion.h1
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center drop-shadow-lg leading-tight"
          style={{ fontFamily: "'Poppins', sans-serif'" }}
        >
          {HERO_CONTENT.title}
        </motion.h1>

        <motion.p
          variants={textVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl mb-6 text-center drop-shadow-md max-w-2xl"
          style={{ fontFamily: "'Roboto', sans-serif'" }}
        >
          {HERO_CONTENT.subtitle}
        </motion.p>

        {/* Button with margin-top to move lower */}
        <div className="mt-6"> {/* Added mt-6 to move button lower */}
          <HeroButton href={HERO_CONTENT.buttonHref} text={HERO_CONTENT.buttonText} />
        </div>
      </div>
    </section>
  );
}
