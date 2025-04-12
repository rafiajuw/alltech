// app/Components/AboutUsSection.tsx
"use client";

import { motion } from 'framer-motion';
import { FaUsers, FaProjectDiagram, FaCogs, FaGlobe } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import React from 'react';

interface StatItem {
  icon: React.ReactNode;
  number: number;
  label: string;
}

export default function AboutUsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Animation variants
  const headingVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const paragraphVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
  };

  const statVariants = {
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
  };

  const stats: StatItem[] = [
    { icon: <FaUsers size={40} />, number: 6, label: "Years Experienced Consultants" },
    { icon: <FaProjectDiagram size={40} />, number: 1200, label: "Successful Projects" },
    { icon: <FaCogs size={40} />, number: 20, label: "Experts Employee" },
    { icon: <FaGlobe size={40} />, number: 50, label: "Operating Across the Globe" },
  ];

  return (
    <section
      className="py-16 bg-white relative"
      style={{
        backgroundImage: "url('/images/circuit-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for Background Image */}
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.h1
          variants={headingVariants}
          initial="initial"
          animate="animate"
          className="text-4xl sm:text-5xl font-bold text-center mb-6 text-gray-800"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          About Us
        </motion.h1>
        <div className="w-20 h-1 bg-gray-300 mx-auto mb-8"></div>

        {/* Paragraph */}
        <motion.p
          variants={paragraphVariants}
          initial="initial"
          animate="animate"
          className="text-gray-600 text-center mb-16 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          AllTechCloudServices was founded in 2019 with the mission of supplying businesses with the most dependable and cost-effective IP addresses. ATCS is a privately held company headquartered in Austin, Texas, with an office at 5900 Balcones Drive, STE 19704, Austin, TX 78731. We are a registered IPv4 broker on APNIC and have a strong commitment to customer satisfaction.
        </motion.p>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={statVariants}
              initial="initial"
              animate="animate"
              className="flex flex-col items-center text-center"
            >
              <div className="text-gray-600 mb-3">{stat.icon}</div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                {inView ? (
                  <CountUp
                    end={stat.number}
                    duration={1.5}
                    separator=","
                    suffix={stat.label.includes("Experts Employee") || stat.label.includes("Operating Across the Globe") ? "+" : ""}
                  />
                ) : (
                  0
                )}
              </h3>
              <p className="text-gray-500 text-base mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}