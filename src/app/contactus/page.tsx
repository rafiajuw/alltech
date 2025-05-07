"use client";

import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaSkype,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    service: [] as string[],
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    email: false,
    phone: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      service: checked
        ? [...prev.service, value]
        : prev.service.filter((item) => item !== value),
    }));
  };

  const validateForm = () => {
    const newErrors = {
      firstName: !formData.firstName.trim(),
      email: !formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email),
      phone: !formData.phone.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            to: "ipv4@alltechcloudservices.com",
            subject: "New Contact Form Submission from IPv4 Brokerage",
          }),
        });

        if (response.ok) {
          setSubmitSuccess(true);
          setFormData({
            firstName: "",
            email: "",
            phone: "",
            service: [],
            message: "",
          });
        } else {
          throw new Error("Failed to send email");
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("There was an error sending your message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Where Connectivity Meets Possibility
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Trusted by professionals worldwide for reliable IPv4 brokerage
          solutions.
        </p>
      </motion.div>

      <motion.div className="flex flex-col lg:flex-row gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Get in Touch With Us Today!
            </h2>
            <p className="text-gray-600">
              Complete this form and our team will contact you within 24 hours.
            </p>
          </div>

          {submitSuccess ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
            >
              <strong className="font-bold">Thank you!</strong>
              <span className="block sm:inline">
                {" "}
                Your message has been sent successfully.
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    First name is required.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    Valid email is required.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    Phone number is required.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Services Interested In
                </label>
                <div className="space-y-2">
                  {["IPv4 Buy", "IPv4 Sell", "Lease IPv4", "Transfer Support"].map(
                    (service) => (
                      <label key={service} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={service}
                          checked={formData.service.includes(service)}
                          onChange={handleCheckboxChange}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">{service}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Info Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Contact Information</h2>
            <p className="text-gray-300">
              Have questions about IPv4 addresses? Reach out to our expert team
              anytime.
            </p>
          </div>

          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-indigo-400" />
              <span>1234 Tech Drive, Silicon Valley, CA</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhone className="text-indigo-400" />
              <span>+1 800 555 1234</span>
            </li>
            <li
              className="flex items-center space-x-3 cursor-pointer hover:text-indigo-400 transition-colors"
              onClick={() => handleEmailClick("ipv4@alltechcloudservices.com")}
            >
              <FaEnvelope className="text-indigo-400" />
              <span>ipv4@alltechcloudservices.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaSkype className="text-indigo-400" />
              <span>ipv4.broker</span>
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}