// app/components/Navbar.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll effect for shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation for the logo
  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Animation for the links
  const linkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Animation for the hamburger icon
  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90, transition: { duration: 0.3, ease: "easeOut" } },
  };

  // Animation for the mobile menu
  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeOut" } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } },
  };

  // Animation for mobile menu links
  const mobileLinkVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/Aboutus", label: "ABOUT US" },
    { href: "/blog_menu", label: "BLOGS" },
    { href: "/sellip", label: "SELL IPV4" },
    { href: "/buyip", label: "BUY IPV4" },
    { href: "/Leaseip", label: "LEASE IPV4" },
    { href: "/contactus", label: "CONTACT US" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 bg-gradient-to-r from-white to-gray-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex items-center"
          >
            <Image
              src="/images/main.jpg"
              alt="All Tech Logo"
              width={100}
              height={100}
              className="h-20  w-auto  shadow-sm"
              onError={() => console.log("Image failed to load")}
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                custom={index}
                variants={linkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="relative group"
              >
                <Link
                  href={link.href}
                  className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-semibold text-sm"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {link.label}
                </Link>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </motion.div>
            ))}
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
              animate={isOpen ? "open" : "closed"}
              variants={iconVariants}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={mobileMenuVariants}
        >
          <ul className="flex flex-col space-y-4 mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href}
                custom={index}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={mobileLinkVariants}
              >
                <Link
                  href={link.href}
                  onClick={toggleMenu}
                  className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-semibold text-sm"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;