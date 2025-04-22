"use client";

import LeaseIPv4 from "../Components/LeaseIPV4";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  ipBlock: string;
  leaseDuration: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  ipBlock?: string;
  leaseDuration?: string;
}

export default function LeaseIPv4Page() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    ipBlock: "",
    leaseDuration: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  // Validate form fields
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.ipBlock.trim()) {
      errors.ipBlock = "IP block is required";
    } else if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(formData.ipBlock)) {
      errors.ipBlock = "Please enter a valid IP block (e.g., 192.168.1.0/24)";
    }
    if (!formData.leaseDuration.trim()) errors.leaseDuration = "Lease duration is required";
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const errors = validateForm();
    setFormErrors((prev) => ({ ...prev, [name]: errors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setShowSuccess(false);
    setFormErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitError("Please fix the errors in the form");
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      setShowSuccess(true);
      setFormData({ name: "", email: "", ipBlock: "", leaseDuration: "", message: "" });
    } catch (error: unknown) {
      console.error("Form submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred while submitting the form. Please try again.";
      setSubmitError(errorMessage);
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
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                    className={`w-full p-3 text-base border ${formErrors[field.name as keyof FormErrors] ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-gray-50`}
                    required={field.required}
                    whileHover="hover"
                    whileFocus="focus"
                    variants={fieldVariants}
                    aria-invalid={formErrors[field.name as keyof FormErrors] ? "true" : "false"}
                    aria-describedby={formErrors[field.name as keyof FormErrors] ? `${field.name}-error` : undefined}
                  />
                  {formErrors[field.name as keyof FormErrors] && (
                    <p id={`${field.name}-error`} className="text-red-500 text-sm mt-1" role="alert">
                      {formErrors[field.name as keyof FormErrors]}
                    </p>
                  )}
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
                  aria-label="Additional Details"
                />
              </div>
              {submitError && (
                <p className="text-red-500 text-sm text-center" role="alert">{submitError}</p>
              )}
              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 text-base rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                aria-label="Submit Lease Request"
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
          role="dialog"
          aria-labelledby="success-title"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
            <h3
              id="success-title"
              className="text-2xl font-bold mb-4 text-gray-800"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Request Submitted!
            </h3>
            <p className="text-gray-600 mb-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Your lease request has been successfully submitted. We’ll get back to you soon.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSuccess(false)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              aria-label="Close success message"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}