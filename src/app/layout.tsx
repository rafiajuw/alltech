import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins, Roboto } from 'next/font/google';
import HeaderNavbar from "./Components/HeaderNavbar";
import Navbar from "./Components/Navbar";
import Whatsup from "./Components/Whatsup";
import Footer from "./Components/Footer";

const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderNavbar/>
        <Navbar/>
        {children}
        <Whatsup
          phoneNumber="03322530689" // Replace with your WhatsApp number
          defaultMessage="Hello, I need assistance with IPv4!"
          popupMessage="Need help with IPv4? Chat with us!"
          popupDelay={500}
          scrollThreshold={200}
        />
        <Footer/>
      </body>
    </html>
  );
}
