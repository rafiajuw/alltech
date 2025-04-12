import Link from 'next/link';

export default function HeaderNavbar() {
  return (
    <header className="bg-blue-900 text-white py-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left Side: Contact Information */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <span className="text-sm">+1 (737) 304 5613</span>
          <span className="text-sm">| </span>
          <a href="mailto:sales@alltechcloudservices.com" className="text-sm hover:text-blue-300 transition-colors">
            sales@alltechcloudservices.com
          </a>
        </div>

        {/* Right Side: Links */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="/FAQ" className="text-sm hover:text-blue-300 transition-colors">
            FAQ
          </Link>
          <span className="text-sm">|</span>
          <Link href="/Privacy-Policy" className="text-sm hover:text-blue-300 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </header>
  );
}
