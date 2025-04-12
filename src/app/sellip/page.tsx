"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from 'framer-motion';

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ipBlock: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null); // To show success/error messages

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null); // Reset status

    // Validate required fields
    if (!formData.name || !formData.email || !formData.ipBlock) {
      setStatus('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Request submitted successfully! We’ll get back to you soon.');
        setFormData({ name: "", email: "", ipBlock: "", message: "" }); // Reset form
      } else {
        setStatus(result.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Failed to submit request');
    }
  };

  // Subtle background animation
  const buyIPBgVariants = {
    initial: { scale: 1, x: 0, y: 0 },
    animate: {
      scale: 1.1,
      x: [0, 10, -10, 0],
      y: [0, 5, -5, 0],
      transition: {
        scale: { duration: 12, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
        x: { duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
        y: { duration: 15, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
      },
    },
  };

  // Animation for text overlay
  const textVariants = {
    initial: { y: 0, opacity: 1 },
    animate: {
      y: [0, -5, 0],
      x: [0, 3, -3, 0],
      transition: {
        y: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
        x: { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
      },
    },
  };

  // Animation for content sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation for process cards on hover
  const cardVariants = {
    initial: { y: 0 },
    hover: {
      y: -10,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Animation for form fields on hover and focus
  const fieldVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
    focus: {
      scale: 1.05,
      boxShadow: "0 0 8px rgba(37, 99, 235, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  // Animation for the "Submit" button
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 10px rgba(37, 99, 235, 0.5)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Buy IP Solution Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <motion.div
          variants={buyIPBgVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0"
        >
          <Image
            src="/images/haxagon.jpg"
            alt="Buy IP Solution Background"
            fill
            className="object-cover"
            priority
            quality={80}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10 flex flex-col items-center justify-center text-white">
          <motion.h2
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="text-3xl md:text-5xl font-bold text-center px-4 drop-shadow-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            SELL IP ADDRESS
          </motion.h2>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Secure & Efficient IP Address Sales
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="flex flex-col md:flex-row items-center mb-12"
        >
          <div className="md:w-1/2 mb-6 md:mb-0">
            <p className="text-gray-600 text-lg font-extrabold" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Selling IP Addresses<br />
            </p>
            <p className="text-black text-lg" style={{ fontFamily: "'Roboto', sans-serif" }}>
              We excel as an IPv4 block sales platform, linking buyers and sellers across the globe. We facilitate IPv4 transfers legally, safely, and efficiently.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image src="/images/SELL.png" alt="IP Selling Process" width={400} height={300} className="rounded-lg shadow-md" />
          </div>
        </motion.div>

        {/* IPv4 Selling Process */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          IPv4 Selling Process
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Selling Request", desc: "Submit an application, receive our offer, and agree with terms.", img: "/images/01.png" },
            { title: "Ownership Check", desc: "We verify your ownership of the network.", img: "/images/01.png" },
            { title: "Agreement & Transfer", desc: "We prepare a formal agreement between buyer and seller.", img: "/images/02.png" },
            { title: "Transaction Complete", desc: "We release funds using your preferred payment option.", img: "/images/03.png" },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial="initial"
              whileHover="hover"
              variants={cardVariants}
              className="bg-blue-100 p-6 rounded-lg text-center"
            >
              <Image src={step.img} alt={step.title} width={50} height={50} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{step.title}</h3>
              <p className="text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Selling Request Form */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mt-12 bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Submit a Selling Request
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
            <div>
              <motion.input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
                whileHover="hover"
                whileFocus="focus"
                variants={fieldVariants}
              />
            </div>
            <div>
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
                whileHover="hover"
                whileFocus="focus"
                variants={fieldVariants}
              />
            </div>
            <div>
              <motion.input
                type="text"
                name="ipBlock"
                value={formData.ipBlock}
                onChange={handleInputChange}
                placeholder="IP Block (e.g., 192.168.1.0/24)"
                className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
                whileHover="hover"
                whileFocus="focus"
                variants={fieldVariants}
              />
            </div>
            <div>
              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Additional Details"
                className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                rows={4}
                whileHover="hover"
                whileFocus="focus"
                variants={fieldVariants}
              />
            </div>
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 text-base rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              Submit Request
            </motion.button>
            {status && (
              <p className={`text-center mt-4 ${status.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {status}
              </p>
            )}
          </form>
        </motion.section>
      </section>
    </div>
  );
}