"use client";

import LeaseIPv4 from '../Components/LeaseIPV4';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  ipBlock: string;
  leaseDuration: string;
  message: string;
}

export default function LeaseIPv4Page() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    ipBlock: "",
    leaseDuration: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setShowSuccess(false);

    if (!formData.name || !formData.email || !formData.ipBlock || !formData.leaseDuration) {
      setError("Please fill in all required fields.");
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

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const result = await response.json();
      console.log(result);
      setShowSuccess(true);
      setFormData({ name: "", email: "", ipBlock: "", leaseDuration: "", message: "" });
    } catch (err) {
      setError("An error occurred while submitting the form. Please try again.");
      console.error("Form submission error:", err);
    }
  };

  // Animation variants with proper typing
  const buyIPBgVariants: Variants = {
    initial: { scale: 1, x: 0, y: 0 },
    animate: {
      scale: 1.05,
      x: [0, 5, -5, 0],
      y: [0, 3, -3, 0],
      transition: {
        scale: { duration: 15, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" as const },
        x: { duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "loop" as const },
        y: { duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "loop" as const },
      },
    },
  };

  const textVariants: Variants = {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: [1, 1.02, 1],
      opacity: 1,
      transition: {
        scale: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" as const },
        opacity: { duration: 1, ease: "easeInOut" },
      },
    },
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants: Variants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.03,
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const fieldVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    focus: {
      scale: 1.03,
      boxShadow: "0 0 6px rgba(37, 99, 235, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const buttonVariants: Variants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 0 8px rgba(37, 99, 235, 0.4)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: { scale: 0.97 },
  };

  const successVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <section className="relative h-[50vh] overflow-hidden">
        <motion.div
          variants={buyIPBgVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0"
        >
          <Image
            src="/images/haxagon.jpg"
            alt="Lease IP Solution Background"
            fill
            className="object-cover"
            priority
            quality={80}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40 z-10 flex flex-col items-center justify-center text-white">
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
          >
            <h2
              className="text-3xl md:text-5xl font-bold text-center px-4 drop-shadow-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              LEASE IPV4 SOLUTION
            </h2>
          </motion.div>
        </div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-16"
      >
        <LeaseIPv4 cardVariants={cardVariants} sectionVariants={sectionVariants} />
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Submit a Lease IPv4 Request
          </h2>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "Your Name", type: "text", name: "name", placeholder: "Enter your name", required: true },
                { label: "Your Email", type: "email", name: "email", placeholder: "Enter your email", required: true },
                { label: "Desired IP Block", type: "text", name: "ipBlock", placeholder: "e.g., 192.168.1.0/24", required: true },
                { label: "Lease Duration", type: "text", name: "leaseDuration", placeholder: "e.g., 6 months", required: true },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    {field.label}
                  </label>
                  <motion.input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="w-full p-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-gray-50"
                    required={field.required}
                    whileHover="hover"
                    whileFocus="focus"
                    variants={fieldVariants}
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  Additional Details
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Any additional details or requirements"
                  className="w-full p-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-gray-50"
                  rows={4}
                  whileHover="hover"
                  whileFocus="focus"
                  variants={fieldVariants}
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 text-base rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              >
                Submit Request
              </motion.button>
            </form>
          </div>
        </div>
      </motion.section>

      {showSuccess && (
        <motion.div
          variants={successVariants}
          initial="hidden"
          animate="visible"
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Request Submitted!
            </h3>
            <p className="text-gray-600 mb-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Your lease request has been successfully submitted. Well get back to you soon.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSuccess(false)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}