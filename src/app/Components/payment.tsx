// app/components/Payment.tsx
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const Payment = () => {
  const paymentMethods = [
    { src: "/images/p11.png", alt: "PayPal Logo" },
    { src: "/images/p2.jpeg", alt: "Mastercard Logo" },
    { src: "/images/p13.png", alt: "Visa Logo" },
    { src: "/images/p4.jpeg", alt: "Bank Transfer Logo" },
    { src: "/images/p61.png", alt: "Wise Logo" },
  ];

  // Animation for the heading
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation for the paragraph
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
  };

  // Animation for the images
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Heading */}
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Payment Methods
        </motion.h2>

        {/* Animated Paragraph */}
        <motion.p
          variants={paragraphVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-gray-600 mb-10 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          We offer a variety of payment options to make your transactions as convenient as possible. You can choose from traditional methods like Bank Transfer, Visa, Mastercard, American Express, Diners Club International, and JCB, or opt for digital alternatives like PayPal, Bitcoin, USDT, and Plaid. No matter your preference, we’ve got you covered with secure and seamless payment processing.
        </motion.p>

        {/* Grid of Payment Method Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="relative flex items-center justify-center bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm"
            >
              <Image
                src={method.src}
                alt={method.alt}
                width={80}
                height={40}
                className="object-contain w-full h-10"
                onError={(e) => console.error(`Failed to load image ${method.src}:`, e)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Payment;