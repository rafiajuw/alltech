// app/Components/FAQ.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: "What is an IPv4 Address?", answer: "An IPv4 (Internet Protocol version 4) address is a unique numerical identifier assigned to devices connected to a network. It enables devices to communicate and access the internet, forming the backbone of global connectivity." },
    { question: "Why Are IPv4 Addresses Still Important?", answer: "IPv4 addresses remain critical due to their widespread use, compatibility with existing infrastructure, and the slow transition to IPv6." },
    { question: "Why Are IPv4 Addresses Running Out?", answer: "The limited pool of IPv4 addresses (approximately 4.3 billion) has been exhausted due to the rapid growth of internet-connected devices." },
    { question: "What is IPv4 Address Trading?", answer: "IPv4 address trading involves buying, selling, or leasing IPv4 address blocks in the secondary market to meet demand." },
    { question: "What is an ASN (Autonomous System Number)?", answer: "An ASN is a unique identifier assigned to an autonomous system (a network under a single administrative control) for routing purposes." },
    { question: "Why Do Organizations Need an ASN?", answer: "Organizations need an ASN to manage their own routing policies and connect to the global internet independently." },
    { question: "How Do I Obtain an ASN?", answer: "You can obtain an ASN by applying through a Regional Internet Registry (RIR) like ARIN, RIPE NCC, or APNIC." },
    { question: "Can I Sell or Transfer an ASN?", answer: "Yes, ASNs can be transferred or sold, subject to RIR policies and approval." },
    { question: "Do I Need Technical Expertise to Manage an ASN?", answer: "While technical knowledge helps, many providers offer support to manage ASNs effectively." },
    { question: "How Does the IPv4 Address Transfer Process Work?", answer: "The process involves verifying ownership, complying with RIR policies, and executing a legal transfer agreement." },
    { question: "What Are Regional Internet Registries (RIRs)?", answer: "RIRs are organizations that manage the allocation and registration of IP addresses and ASNs globally." },
    { question: "Why Choose All Tech Cloud Services?", answer: "We offer reliable, cost-effective solutions with expert support and a proven track record." },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const bgVariants = {
    initial: { scale: 1, x: 0, y: 0 },
    animate: {
      scale: 1.05,
      x: [0, 5, -5, 0],
      y: [0, 3, -3, 0],
      transition: {
        scale: { duration: 15, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
        x: { duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
        y: { duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
      },
    },
  };

  const textVariants = {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: [1, 1.02, 1],
      opacity: 1,
      transition: {
        scale: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
        opacity: { duration: 1, ease: "easeInOut" },
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const hoverVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.03,
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const answerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const contactTextVariants = {
    initial: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.5 },
    },
  };

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 overflow-hidden">
      {/* Animated Background Image with Fallback */}
      <motion.div
        variants={bgVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900 to-indigo-900"
      >
        <Image
          src="/haxagon.jpg"
          alt="Background"
          fill
          className="object-cover"
          style={{ zIndex: -1 }}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            console.error("Failed to load background image:", target.src);
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 text-white"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          FAQ
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={hoverVariants}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-xl shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left text-white font-medium text-lg sm:text-xl flex justify-between items-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl"
                >
                  {openIndex === index ? '×' : '+'}
                </motion.span>
              </button>
              <motion.div
                variants={answerVariants}
                initial="hidden"
                animate={openIndex === index ? "visible" : "hidden"}
              >
                {openIndex === index && (
                  <p
                    className="mt-3 text-white text-sm sm:text-base bg-blue-700 p-3 rounded-lg"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    {faq.answer}
                  </p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={contactTextVariants}
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-8 text-white text-sm sm:text-base"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Have more questions?{' '}
          <a
            href="/contact"
            className="text-blue-300 hover:text-blue-100 underline transition-colors duration-300"
          >
            Contact us
          </a>{' '}
          today to learn how we can support your IPv4 and ASN needs!
        </motion.p>
      </div>
    </section>
  );
};

export default FAQ;