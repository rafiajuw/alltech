"use client";

import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaSkype, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    service: [] as string[],
    message: ""
  });

  const [errors, setErrors] = useState({
    firstName: false,
    email: false,
    phone: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      service: checked 
        ? [...prev.service, value] 
        : prev.service.filter(item => item !== value)
    }));
  };

  const validateForm = () => {
    const newErrors = {
      firstName: !formData.firstName.trim(),
      email: !formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email),
      phone: !formData.phone.trim()
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form submitted:", formData);
        setSubmitSuccess(true);
        setFormData({
          firstName: "",
          email: "",
          phone: "",
          service: [],
          message: ""
        });
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Where Connectivity Meets Possibility
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Trusted by professionals worldwide for reliable IPv4 brokerage solutions.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:flex-row gap-12 bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Left Column - Form */}
        <motion.div 
          variants={itemVariants}
          className="w-full lg:w-1/2 p-8 md:p-12 bg-gradient-to-br from-blue-50 to-indigo-50"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Get in Touch with Us Today!
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
              <span className="block sm:inline"> Your message has been sent successfully.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">
                  First name {errors.firstName && (
                    <span className="text-red-500 text-sm">(required)</span>
                  )}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter your first name"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">
                  Email {errors.email && (
                    <span className="text-red-500 text-sm">(required)</span>
                  )}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone number {errors.phone && (
                    <span className="text-red-500 text-sm">(required)</span>
                  )}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                  placeholder="+1 (___) ___-____"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">
                  Services you're interested in
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["Buy IPv4", "Sell IPv4", "Rent IPv4", "Consultation"].map(service => (
                    <label key={service} className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition cursor-pointer">
                      <input
                        type="checkbox"
                        name="service"
                        value={service}
                        checked={formData.service.includes(service)}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Tell us about your requirements..."
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </motion.div>
            </form>
          )}
        </motion.div>

        {/* Right Column - Contact Info */}
        <motion.div 
          variants={itemVariants}
          className="w-full lg:w-1/2 p-8 md:p-12 bg-gray-900 text-white"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Contact Information</h2>
            <p className="text-gray-300">
              Have questions about IPv4 addresses? Reach out to our expert team anytime.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">EMAIL</h3>
                <a href="mailto:sales@alltechcloudservices.com" className="text-blue-300 hover:text-blue-100 transition block">
                  sales@alltechcloudservices.com
                </a>
                <a href="mailto:ipv4@alltechcloudservices.com" className="text-blue-300 hover:text-blue-100 transition block">
                  ipv4@alltechcloudservices.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-600 p-3 rounded-full">
                <FaPhone className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">PHONE</h3>
                <a href="tel:+17273045613" className="text-gray-300 hover:text-white transition block">
                  +1 (727) 304-5613
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-400 p-3 rounded-full">
                <FaSkype className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">SKYPE</h3>
                <p className="text-gray-300">live:cid.ca2886a158de9529</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-600 p-3 rounded-full">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">ADDRESS</h3>
                <p className="text-gray-300">5900 Balcones Drive, STE 1794 Austin, TX 78731</p>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-bold text-lg mb-4">FOLLOW US</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-blue-700 p-3 rounded-full transition">
                  <FaFacebook className="text-white text-xl" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-400 p-3 rounded-full transition">
                  <FaTwitter className="text-white text-xl" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-pink-600 p-3 rounded-full transition">
                  <FaInstagram className="text-white text-xl" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition">
                  <FaLinkedin className="text-white text-xl" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4">Our Location</h3>
            <p className="text-gray-300 mb-6">Visit us or drop by for a consultation on IPv4 solutions.</p>
            
            <section ref={ref} className="w-full rounded-xl overflow-hidden shadow-lg">
              {inView && (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.162194584305!2d-97.75456308414442!3d30.359188081767776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5e8b2e5b5e1%3A0x3e4a2b5e5b5e5b5e!2s5900%20Balcones%20Dr%2C%20Austin%2C%20TX%2078731%2C%20USA!5e0!3m2!1sen!2sin!4v1698191234567!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                  title="Our Location Map"
                />
              )}
            </section>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}