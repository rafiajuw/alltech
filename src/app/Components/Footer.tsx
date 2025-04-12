import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-alltech-blue text-white p-6 mt-auto bg-blue-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us Section */}
        <div>
          <h3 className="font-bold mb-2 text-lg">ABOUT US</h3>
          <p className="text-sm">
            AllTechCloudServices was founded in 2019 with the mission of supplying businesses with the most dependable and cost-effective IP addresses. ATCS is a privately held company headquartered in Austin, Texas, with an office at 5900 Balcones Drive, STE 17904, Austin, TX 78731.
          </p>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="font-bold mb-2 text-lg">SERVICES</h3>
          <ul className="text-sm space-y-2">
            {[
              { name: "Rent IPv4", href: "/Leaseip" },
              { name: "Buy IPv4", href: "/buyip" },
              { name: "Sell IPv4", href: "/sellip" },
            ].map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  {item.name}
                </Link>
                <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-bold mb-2 text-lg">COMPANY</h3>
          <ul className="text-sm space-y-2">
            {[
              { name: "About Us", href: "/Aboutus" },
              { name: "Contact Us", href: "/contactus" },
            ].map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  {item.name}
                </Link>
                <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="font-bold mb-2 text-lg">CONTACT US</h3>
          <p className="text-sm space-y-2">
            <span className="block">
              5900 Balcones Drive, STE 17904 Austin, TX 78731
            </span>
            <span className="block">+1 (727) 304-5613</span>
            <span className="block">
              <a
                href="mailto:sales@alltechcloudservices.com"
                className="relative group hover:text-gray-300 transition-colors duration-300"
              >
                sales@alltechcloudservices.com
                <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            </span>
            <span className="block">
              <a
                href="mailto:ipv4@alltechcloudservices.com"
                className="relative group hover:text-gray-300 transition-colors duration-300"
              >
                ipv4@alltechcloudservices.com
                <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            </span>
          </p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-6 text-xs">
        Copyright © 2024 AllTechCloudServices | All Rights Reserved |
        <Link
          href="/FAQ"
          className="ml-2 relative group hover:text-gray-300 transition-colors duration-300"
        >
          FAQ?
          <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
        |
        <Link
          href="/PrivicyPolicy"
          className="ml-2 relative group hover:text-gray-300 transition-colors duration-300"
        >
          Privacy Policy
          <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;