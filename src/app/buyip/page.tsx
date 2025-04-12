"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
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
      scale: 1.1, // Reduced scale for a subtler zoom
      x: [0, 10, -10, 0], // Reduced panning
      y: [0, 5, -5, 0], // Reduced panning
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

  // Animation for blog cards and process cards on hover
  const cardVariants = {
    initial: { scale: 1, y: 0, backgroundColor: "#f0f9ff" },
    hover: {
      scale: 1.05,
      y: -10,
      backgroundColor: "#e0f2fe",
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
        {/* Background Image with Animation */}
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

        {/* Overlay with Text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10 flex flex-col items-center justify-center text-white">
          <motion.h2
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="text-3xl md:text-5xl font-bold text-center px-4 drop-shadow-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Buy IP Solution
          </motion.h2>
        </div>
      </section>

      {/* Secure & Reliable Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Secure & Reliable IP Address Solutions
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="md:w-1/2">
              <div className="bg-gray-300 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/buy.png"
                  alt="Buy IP Solution"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Buying IP Addresses
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
                We offer a 100% satisfaction guarantee, ensuring confidence in every purchase. Our IPv4 blocks are competitively priced.
              </p>
              <p className="text-gray-600 mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
                We maintain a sufficient IPv4 address range and assist in finding the best match from our database.
              </p>
              <p className="text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>
                As a trusted IPv4 broker, we ensure all transactions comply with due diligence and industry regulations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IPv4 Purchase Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            IPv4 Purchase Process
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Acquisition Request", text: "We locate a matching offer from our inventory or wait for a suitable one." },
              { title: "Contract", text: "After agreement and payment, we prepare the documentation for address transfer." },
              { title: "Ownership Transfer", text: "We draft agreements and handle all necessary documentation." },
              { title: "Concluding Transaction", text: "Upon ownership confirmation, funds are transferred to the seller." },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial="initial"
                whileHover="hover"
                variants={cardVariants}
                className="bg-blue-50 p-6 rounded-lg text-center"
              >
                <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>{step.title}</h3>
                <p className="text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Section with Hover Effects */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Latest Blogs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Blog Title 1", "Blog Title 2", "Blog Title 3"].map((title, index) => (
              <motion.div
                key={index}
                initial="initial"
                whileHover="hover"
                variants={cardVariants}
                className="p-6 rounded-lg shadow-md bg-white"
              >
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{title}</h3>
                <p className="text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy IP Request Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Submit a Buy IP Request
          </motion.h2>
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Desired IP Block (e.g., 192.168.1.0/24)"
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
          </div>
        </div>
      </section>
    </div>
  );
}