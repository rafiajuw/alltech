import React from 'react'

const PrivacyPolicy = () => {
    const sections = [
      {
        title: "1. Information We Collect",
        content:
          "At All Tech Cloud Services, we prioritize the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your data when you visit our website, engage with our services, or interact with us.",
      },
      {
        title: "1.1. Personal Information",
        content:
          "This includes details that can identify you, such as your name, email address, phone number, company name, and billing information.",
      },
      {
        title: "1.2. IP Addresses & Technical Data",
        content:
          "We may collect IP addresses, browser type, operating system details, and other technical data to enhance security, monitor website performance, and improve our services.",
      },
      {
        title: "1.3. Usage Information",
        content:
          "We gather data on how you interact with our website and services, including log files, device, browsing behaviors, and preferences.",
      },
      {
        title: "2. How We Use Your Information",
        content:
          "We use the collected data to facilitate the buying, selling, and leasing of IPv4 addresses, ensuring seamless transactions.",
      },
      {
        title: "2.1. Service Delivery",
        content:
          "To facilitate the buying, selling, and leasing of IPv4 addresses, ensuring seamless transactions.",
      },
      {
        title: "2.2. Customer Communication",
        content:
          "To send service-related updates, respond to inquiries, and provide support.",
      },
      {
        title: "2.3. Security & Compliance",
        content:
          "To protect the platform, prevent fraud, and comply with applicable legal requirements.",
      },
      {
        title: "2.4. Service Improvement & Analytics",
        content:
          "To analyze trends, optimize user experience, and enhance our website and services.",
      },
      {
        title: "3. Sharing Your Information",
        content:
          "We may share necessary data with third-party service providers who assist in delivering our services under strict confidentiality agreements.",
      },
      {
        title: "3.1. Trusted Service Providers",
        content:
          "We may share necessary data with third-party service providers who assist in delivering our services under strict confidentiality agreements.",
      },
      {
        title: "3.2. Legal Requirements",
        content:
          "We may disclose your information as required by law, regulatory authorities, or legal proceedings.",
      },
      {
        title: "4. Cookies & Tracking Technologies",
        content:
          "We use cookies and tracking technologies to personalize your experience, analyze website performance, and improve our services. You can adjust your browser settings to manage cookie preferences.",
      },
      {
        title: "5. Your Rights & Choices",
        content:
          "You can opt out of receiving promotional emails or marketing communications at any time.",
      },
      {
        title: "5.1. Opt-Out",
        content:
          "You can opt out of receiving promotional emails or marketing communications at any time.",
      },
      {
        title: "5.2. Data Access & Updates",
        content:
          "You may request access, correction, or deletion of your personal information.",
      },
      {
        title: "6. Data Security",
        content:
          "We implement industry-standard security measures to protect your data from unauthorized access, misuse, or breaches. However, no online platform is entirely risk-free, so we recommend safeguarding your credentials.",
      },
      {
        title: "7. Children’s Privacy",
        content:
          "Our services are intended for businesses and individuals over the age of 18. We do not knowingly collect data from minors.",
      },
      {
        title: "8. Changes To This Privacy Policy",
        content:
          "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Please review this page regularly for updates.",
      },
      {
        title: "9. Contact Us",
        content:
          "For any questions or concerns regarding this Privacy Policy, contact us at:\n\nEmail: info@alltechcloudservices.com",
      },
    ];
  
    return (
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-8 animate-fadeIn text-center">
            Privacy Policy for All Tech Cloud Services – IPv4 Brokerage Company
          </h2>
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 delay-100"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default PrivacyPolicy;
  
