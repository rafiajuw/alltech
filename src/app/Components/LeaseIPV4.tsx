// app/Components/LeaseIPv4.tsx
"use client";

import { motion, Variants } from 'framer-motion';
import React from 'react';

interface LeaseIPv4Props {
  cardVariants: Variants;
  sectionVariants: Variants;
}

const LeaseIPv4 = ({ cardVariants, sectionVariants }: LeaseIPv4Props) => {
  const steps = [
    {
      number: 1,
      title: "Service Contract",
      description: "Once confirmed on the total number of the IPv4 addresses and leasing period, Our IP specialist will prepare the service contract."
    },
    {
      number: 2,
      title: "Payment",
      description: "After the service contract is signed, you will receive an invoice from us and proceed to make the payments."
    },
    {
      number: 3,
      title: "Requirement",
      description: "After payment is received, our IP specialist will prepare the letter of Authorization and you will get the IP address from us."
    }
  ];

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-16 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6"
          variants={itemVariants}
          custom={0}
        >
          Lease IPv4
        </motion.h2>
        
        <motion.h3 
          className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4"
          variants={itemVariants}
          custom={0.2}
        >
          3 Steps To Lease IPv4 Addresses Within 48 Hours
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 mb-8 text-sm sm:text-base"
          variants={itemVariants}
          custom={0.4}
        >
          Prepare yourself for a quick and easy IPv4 addresses leasing process with All Tech Cloud Services. 
          You may quickly get the IP addresses your network needs by following these three simple procedures. 
          You will obtain the addresses in less than 48 hours thanks to our smooth and effective approach.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              initial="initial"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
              </div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">{step.title}</h4>
              <p className="text-gray-700 text-sm sm:text-base">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default LeaseIPv4;