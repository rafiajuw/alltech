"use client"
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

export default function AboutUs() {
  const buyIPBgVariants = {
    initial: { scale: 1, x: 0, y: 0 },
    animate: {
      scale: 1.2, // Zoom-in effect
      x: [0, 20, -20, 0], // Panning left and right
      y: [0, 10, -10, 0], // Panning up and down
      transition: {
        scale: { duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
        x: { duration: 15, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
        y: { duration: 12, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        {/* Background Image with Animation */}
        <motion.div variants={buyIPBgVariants} initial="initial" animate="animate" className="absolute inset-0">
          <Image
            src="/images/haxagon.jpg"
            alt="Lease IP Solution Background"
            fill
            className="object-cover"
            priority
            quality={80}
          />
        </motion.div>

        {/* Overlay with Animated Text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 flex flex-col items-center justify-center text-white text-center">
          <motion.h2
            initial={{ y: 0, opacity: 1 }}
            animate={{
              y: [0, -10, 0],
              x: [0, 5, -5, 0],
              transition: {
                y: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
                x: { duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
              },
            }}
            className="text-3xl md:text-5xl font-bold px-4 drop-shadow-lg"
          >
            EMPOWERING BUSINESS WITH CLOUD SOLUTION
          </motion.h2>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Cloud Icon */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/a1.jpg"
              alt="Cloud Icon"
              width={350}
              height={250}
              className="object-contain rounded-lg shadow-lg"
            />
          </div>
          
          {/* Right Side: About Us Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">About Us</h2>
            <p className="text-lg text-gray-700">
              AllTech Cloud Services was founded in 2019 with the mission of supplying businesses with the most
              dependable and cost-effective cloud solutions. Based in Saudi Arabia with an office in Jeddah, we are a
              registered IPv4 broker with APNIC and committed to customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Expertise</h2>
            <p className="text-lg text-gray-700">
              As leaders in the cloud space, AllTech Cloud Services is dedicated to providing businesses with
              transparent and cost-effective cloud solutions. We assist in buying and selling IP blocks and have
              executed more transfers than any other company worldwide. Our experience ensures success.
            </p>
          </div>
          
          {/* Right Side: Person with Laptop Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/a2.jpg"
              alt="Person with Laptop"
              width={350}
              height={250}
              className="object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
