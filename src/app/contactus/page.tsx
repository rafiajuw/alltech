"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import HeroSection from "../Components/HeroSection";
import Confetti from 'react-confetti';

interface FormData {
  firstName: string;
  email: string;
  phone: string;
  service: string[];
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
    service: [],
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Contact component mounted");
    console.log("Form data:", formData);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({ ...prev, service: [...prev.service, value] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        service: prev.service.filter((item) => item !== value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.firstName || !formData.email || !formData.phone) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send email.");
      }

      setShowPopup(true);
      setFormData({
        firstName: "",
        email: "",
        phone: "",
        service: [],
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setError("There was an error submitting the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

  // Animation for the "Submit" button (hover only)
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 10px rgba(37, 99, 235, 0.5)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  // Animation for social media icons (hover only)
  const iconVariants = {
    hover: {
      scale: 1.2,
      y: -5,
      transition: { duration: 0.3 },
    },
  };

  // Animation for the popup (simple fade-in)
  const popupVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100">
      {/* Hero Section */}
      {HeroSection ? (
        <HeroSection />
      ) : (
        <p className="text-center text-red-500">HeroSection component is missing.</p>
      )}

      {/* Contact Form Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl sm:text-5xl font-extrabold text-center mb-6 text-gray-800"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Get in Touch with Us Today!
        </h2>
        <p
          className="text-gray-600 text-center mb-12 text-lg"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Buy, sell, or lease IPv4 addresses with our proven expertise.
        </p>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { type: "text", name: "firstName", placeholder: "First Name", required: true },
                { type: "email", name: "email", placeholder: "Email", required: true },
                { type: "tel", name: "phone", placeholder: "Enter Phone Number", required: true },
              ].map((field) => (
                <div key={field.name}>
                  <motion.input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required={field.required}
                    whileHover="hover"
                    whileFocus="focus"
                    variants={fieldVariants}
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-600 mb-2 font-medium" style={{ fontFamily: "'Roboto', sans-serif" }}>
                  Service
                </label>
                <div className="space-y-2">
                  {["Buy IPv4", "Sell IPv4", "Rent IPv4"].map((service) => (
                    <motion.label
                      key={service}
                      className="flex items-center"
                      whileHover="hover"
                      variants={fieldVariants}
                    >
                      <input
                        type="checkbox"
                        name="service"
                        value={service}
                        checked={formData.service.includes(service)}
                        onChange={handleCheckboxChange}
                        className="mr-2 accent-blue-600 w-4 h-4"
                      />
                      <span className="text-gray-700 text-base" style={{ fontFamily: "'Roboto', sans-serif" }}>
                        {service}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </div>
              <div>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message/Comments Box"
                  className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  rows={4}
                  whileHover="hover"
                  whileFocus="focus"
                  variants={fieldVariants}
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm">
                  {error}
                </p>
              )}
              <motion.button
                type="submit"
                disabled={isLoading}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 text-base rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : null}
                {isLoading ? "Submitting..." : "Submit"}
              </motion.button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-1/2 bg-gray-800 text-white p-6 rounded-xl shadow-lg">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Our Contact
            </h3>
            {[
              { label: "E-MAIL", content: (
                <>
                  <a href="mailto:sales@alltechcloudservices.com" className="hover:underline hover:text-blue-300 transition-colors duration-300">
                    sales@alltechcloudservices.com
                  </a>
                  <br />
                  <a href="mailto:info@alltechcloudservices.com" className="hover:underline hover:text-blue-300 transition-colors duration-300">
                    info@alltechcloudservices.com
                  </a>
                </>
              )},
              { label: "PHONE", content: (
                <a href="tel:+17273045613" className="hover:underline hover:text-blue-300 transition-colors duration-300">
                  +1 (727) 304-5613
                </a>
              )},
              { label: "SKYPE", content: (
                <a href="skype:live:cid.ebf5e564e562929?chat" className="hover:underline hover:text-blue-300 transition-colors duration-300">
                  live:cid.ebf5e564e562929
                </a>
              )},
              { label: "ADDRESS", content: "5900 Balcones Drive, STE 1794 Austin, TX 78731" },
            ].map((item) => (
              <p
                key={item.label}
                className="mb-4"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                <strong>{item.label}</strong>
                <br />
                {item.content}
              </p>
            ))}
            <p style={{ fontFamily: "'Roboto', sans-serif" }}>
              <strong>SOCIAL MEDIA</strong>
              <br />
              <div className="flex space-x-4 mt-2">
                {[
                  { href: "https://facebook.com", icon: <FaFacebookF className="w-5 h-5" /> },
                  { href: "https://twitter.com", icon: <FaTwitter className="w-5 h-5" /> },
                  { href: "https://instagram.com", icon: <FaInstagram className="w-5 h-5" /> },
                  { href: "https://linkedin.com", icon: <FaLinkedinIn className="w-5 h-5" /> },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover="hover"
                    variants={iconVariants}
                    className="text-white hover:text-blue-300 transition-colors duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"> {/* Reduced max width from 6xl to 4xl */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 relative">
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full flex items-center shadow-lg z-10">
            <FaMapMarkerAlt className="w-5 h-5 mr-2" />
            <span className="font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our Location
            </span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.162194584305!2d-97.75456308414442!3d30.359188081767776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5e8b2e5b5e1%3A0x3e4a2b5e5b5e5b5e!2s5900%20Balcones%20Dr%2C%20Austin%2C%20TX%2078731%2C%20USA!5e0!3m2!1sen!2sin!4v1698191234567!5m2!1sen!2sin"
            width="100%"
            height="600" // Height remains the same
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          />
        </div>
      </section>

      {/* Thank You Popup */}
      {showPopup && (
        <motion.div
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <div className="relative bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={200}
              gravity={0.2}
              className="absolute inset-0"
            />
            <h3 className="text-2xl font-bold mb-4 text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Thank You!
            </h3>
            <p className="text-gray-600 mb-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Your message has been successfully submitted. We will get back to you soon.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPopup(false)}
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