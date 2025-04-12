// app/Components/Broker.tsx
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Broker = () => {
  // List of RIRs with their logos and links
  const rirs = [
    { name: "RIPE NCC", logo: "/images/r1.jpeg", url: "https://www.ripe.net" },
    { name: "AFRINIC", logo: "/images/r6.png", url: "https://afrinic.net" },
    { name: "ARIN", logo: "/images/r3.png", url: "https://www.arin.net" },
    { name: "APNIC", logo: "/images/r4.png", url: "https://www.apnic.net" },
    { name: "LACNIC", logo: "/images/r5.png", url: "https://www.lacnic.net" },
  ];

  // Animation for the section background
  const bgVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      background: [
        "linear-gradient(to bottom, #f3f4f6, #e5e7eb)",
        "linear-gradient(to bottom, #e5e7eb, #f3f4f6)",
      ],
      transition: {
        opacity: { duration: 1, ease: "easeInOut" },
        background: { duration: 5, repeat: Infinity, repeatType: "reverse" },
      },
    },
  };

  // Animation for the heading
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation for the main logo
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
  };

  // Animation for the paragraph
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
    },
  };

  // Animation for RIR logos on entrance
  const rirLogoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.6,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  // Animation for RIR logos on hover
  const rirHoverVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.1,
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      variants={bgVariants}
      initial="initial"
      animate="animate"
      className="py-16 bg-gradient-to-b from-gray-100 to-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Heading */}
        <motion.h2
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Recognized IPv4 Transfer Broker
        </motion.h2>

        {/* Main Logo */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/images/r1.jpeg"
              alt="RIPE NCC Logo"
              fill
              className="object-contain p-4 bg-white"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                console.error("Failed to load RIPE NCC logo:", target.src);
              }}
            />
          </div>
        </motion.div>

        {/* Paragraph */}
        <motion.p
          variants={paragraphVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-gray-600 mb-8 text-sm sm:text-base"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          We Deal with All RIR Subnets
        </motion.p>

        {/* RIR Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8">
          {rirs.map((rir, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={rirLogoVariants}
              whileHover={rirHoverVariants}
              className="relative group"
            >
              <Link href={rir.url} target="_blank" rel="noopener noreferrer">
                <div className="relative w-full h-24 sm:h-32 rounded-lg overflow-hidden shadow-md bg-white p-4">
                  <Image
                    src={rir.logo}
                    alt={`${rir.name} Logo`}
                    fill
                    className="object-contain"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement;
                      console.error(`Failed to load ${rir.name} logo:`, target.src);
                    }}
                  />
                </div>
                {/* Tooltip on Hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <span
                    className="text-white text-sm font-medium"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    Visit {rir.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Broker;