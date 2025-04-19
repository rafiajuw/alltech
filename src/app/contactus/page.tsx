"use client";

import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from "../Components/HeroSection";
import Confetti from 'react-confetti';
import { useInView } from 'react-intersection-observer';

// Constants for reusability
const SOCIAL_LINKS = [
  { href: "https://facebook.com", icon: <FaFacebookF className="w-5 h-5" />, label: "Facebook" },
  { href: "https://twitter.com", icon: <FaTwitter className="w-5 h-5" />, label: "Twitter" },
  { href: "https://instagram.com", icon: <FaInstagram className="w-5 h-5" />, label: "Instagram" },
  { href: "https://linkedin.com", icon: <FaLinkedinIn className="w-5 h-5" />, label: "LinkedIn" },
];

const CONTACT_INFO = [
  {
    label: "E-MAIL",
    content: (
      <>
        <a href="mailto:sales@alltechcloudservices.com" className="hover:underline hover:text-blue-300 transition-colors duration-300">
          sales@alltechcloudservices.com
        </a>
        <br />
        <a href="mailto:ipv4@alltechcloudservices.com" className="hover:underline hover:text-blue-300 transition-colors duration-300">
          ipv4@alltechcloudservices.com
        </a>
      </>
    ),
  },
  {
    label: "PHONE",
    content: (
      <a href="tel:+17273045613" className="hover:underline hover:text-blue-300 transition-colors duration-300">
        +1 (727) 304-5613
      </a>
    ),
  },
  {
    label: "SKYPE",
    content: (
      <a href="skype:live:cid.ebf5e564e562929?chat" className="hover:underline hover:text-blue-300 transition-colors duration-300">
        live:cid.ebf5e564e562929
      </a>
    ),
  },
  { label: "ADDRESS", content: "5900 Balcones Drive, STE 1794 Austin, TX 78731" },
];

const SERVICES = ["Buy IPv4", "Sell IPv4", "Rent IPv4"];

// Interfaces for type safety
interface FormData {
  firstName: string;
  email: string;
  phone: string;
  service: string[];
  message: string;
}

interface FormErrors {
  firstName?: string;
  email?: string;
  phone?: string;
}

// Type for string-valued FormData keys
type StringFormDataKeys = keyof Pick<FormData, 'firstName' | 'email' | 'phone' | 'message'>;

// Reusable Form Field Component
const FormField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
  error,
}: {
  type: string;
  name: StringFormDataKeys; // Use refined type
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: string;
}) => {
  const fieldVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    focus: { scale: 1.02, boxShadow: "0 0 6px rgba(37, 99, 235, 0.2)", transition: { duration: 0.2 } },
  };

  return (
    <div>
      <motion.input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 text-base border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
        required={required}
        whileHover="hover"
        whileFocus="focus"
        variants={fieldVariants}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
    service: [],
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showPopup, setShowPopup] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  // Validate form fields
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = "Please enter a valid phone number";
    }
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const errors = validateForm();
    setFormErrors((prev) => ({ ...prev, [name]: errors[name as keyof FormErrors] }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      service: checked ? [...prev.service, value] : prev.service.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setIsLoading(true);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to send email.");
      }

      setShowPopup(true);
      setFormData({ firstName: "", email: "", phone: "", service: [], message: "" });
      setFormErrors({});
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitError("Failed to submit the form. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const fieldVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    focus: { scale: 1.02, boxShadow: "0 0 6px rgba(37, 99, 235, 0.2)", transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 0 8px rgba(37, 99, 235, 0.4)", transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    hover: { scale: 1.2, y: -4, transition: { duration: 0.2 } },
  };

  const popupVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100">
      {/* SEO Meta Tags */}
      <head>
        <title>Contact Us | AllTech Cloud Services</title>
        <meta name="description" content="Get in touch with AllTech Cloud Services to buy, sell, or lease IPv4 addresses. Reach us via email, phone, or our Austin office." />
      </head>

      {/* Hero Section */}
      {HeroSection ? (
        <HeroSection />
      ) : (
        <p className="text-center text-red-500" role="alert">
          HeroSection component is missing.
        </p>
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
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {([
                { type: "text", name: "firstName", placeholder: "First Name", required: true },
                { type: "email", name: "email", placeholder: "Email", required: true },
                { type: "tel", name: "phone", placeholder: "Enter Phone Number", required: true },
              ] as const).map((field) => (
                <FormField
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required={field.required}
                  error={formErrors[field.name]}
                />
              ))}
              <div>
                <label
                  className="block text-gray-600 mb-2 font-medium"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  Service
                </label>
                <div className="space-y-2">
                  {SERVICES.map((service) => (
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
                        aria-label={service}
                      />
                      <span
                        className="text-gray-700 text-base"
                        style={{ fontFamily: "'Roboto', sans-serif" }}
                      >
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
                  aria-label="Message"
                />
              </div>
              {submitError && (
                <p className="text-red-500 text-sm" role="alert">
                  {submitError}
                </p>
              )}
              <motion.button
                type="submit"
                disabled={isLoading}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 text-base rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                aria-label="Submit contact form"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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
            {CONTACT_INFO.map((item) => (
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
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover="hover"
                    variants={iconVariants}
                    className="text-white hover:text-blue-300 transition-colors duration-300"
                    aria-label={`Follow us on ${social.label}`}
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
      <section ref={ref} className="w-full px-0 pb-16">
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 relative">
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full flex items-center shadow-lg z-10">
            <FaMapMarkerAlt className="w-5 h-5 mr-2" />
            <span className="font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our Location
            </span>
          </div>
          {inView && (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.162194584305!2d-97.75456308414442!3d30.359188081767776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5e8b2e5b5e1%3A0x3e4a2b5e5b5e5b5e!2s5900%20Balcones%20Dr%2C%20Austin%2C%20TX%2078731%2C%20USA!5e0!3m2!1sen!2sin!4v1698191234567!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl w-full sm:h-[300px] md:h-[350px] lg:h-[400px]"
              title="Our Location Map"
            />
          )}
        </div>
      </section>

      {/* Thank You Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            role="dialog"
            aria-labelledby="popup-title"
            aria-modal="true"
          >
            <div className="relative bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={150}
                gravity={0.15}
                className="absolute inset-0"
              />
              <h3
                id="popup-title"
                className="text-2xl font-bold mb-4 text-gray-800"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Thank You!
              </h3>
              <p
                className="text-gray-600 mb-6"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                Your message has been successfully submitted. We’ll get back to you soon.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPopup(false)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                aria-label="Close popup"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
