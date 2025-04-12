"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Variants } from 'framer-motion';

export default function HeroSection() {
  const backgroundImage = '/images/haxagon.jpg';

  // Animation variants with proper typing
  const bgVariants: Variants = {
    initial: { scale: 1 },
    animate: {
      scale: 1.2,
      transition: {
        duration: 10,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const, // Explicitly type as "reverse"
      },
    },
  };

  const textVariants: Variants = {
    initial: { y: -50, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 1, 
        ease: "easeOut" 
      } 
    },
  };

  const buttonVariants: Variants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 1, 
        delay: 0.5, 
        ease: "easeOut" 
      },
    },
    hover: { 
      scale: 1.05, 
      transition: { 
        duration: 0.3 
      } 
    },
  };

  return (
    <section className="relative h-[80vh] overflow-hidden">
      <motion.div
        variants={bgVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0"
      >
        <Image
          src={backgroundImage}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          quality={80}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10 flex flex-col items-center justify-center text-white">
        <motion.h1
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="text-4xl md:text-6xl font-bold mb-4 text-center px-4 drop-shadow-lg"
        >
          WHERE CONNECTIVITY MEETS POSSIBILITY
        </motion.h1>

        <motion.p
          variants={textVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl mb-6 text-center px-4 drop-shadow-md"
        >
          Trusted by professionals, chosen for reliability — your IPv4 brokerage partner.
        </motion.p>

        <Link href="/contactus" passHref>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Contact Us
          </motion.button>
        </Link>
      </div>
    </section>
  );
}