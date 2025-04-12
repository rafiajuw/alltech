"use client";

import { useState, useEffect, useCallback } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { debounce, DebouncedFunc } from 'lodash-es';

interface WhatsAppConnectProps {
  phoneNumber: string;
  defaultMessage?: string;
  popupMessage?: string;
  popupDelay?: number;
  scrollThreshold?: number;
}

const WhatsAppConnect = ({
  phoneNumber,
  defaultMessage = "Hello, I need help!",
  popupMessage = "How can I help you?",
  popupDelay = 300,
  scrollThreshold = 300,
}: WhatsAppConnectProps) => {
  const [showPopup, setShowPopup] = useState(false);

  // Typed debounced scroll handler
  const handleScroll: DebouncedFunc<() => void> = useCallback(
    debounce(() => {
      if (window.scrollY > scrollThreshold && !showPopup) {
        setTimeout(() => {
          setShowPopup(true);
        }, popupDelay);
      }
    }, 100),
    [showPopup, scrollThreshold, popupDelay]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>

      {showPopup && (
        <div className="absolute bottom-16 right-0 bg-white p-4 rounded-lg shadow-lg flex items-center justify-between space-x-3 w-48 sm:w-64 md:w-72 transition-all duration-300 animate-fadeIn">
          <p className="text-gray-800 text-sm">{popupMessage}</p>
          <button
            onClick={closePopup}
            className="text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
            aria-label="Close WhatsApp popup"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default WhatsAppConnect;