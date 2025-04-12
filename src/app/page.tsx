


import HeroSection from "./Components/HeroSection";
import AboutUsSection from "./Components/AboutSection";



import ServicesSection from "./Components/ServicesSection";
import BlogMenuPage from "./blog_menu/page";
import Payment from "./Components/payment";
import Broker from "./Components/Broker";

export default function Home() {
  return (
    <div className="bg-white">
      
     
      <HeroSection />
      
      
      <AboutUsSection/>
      
      <ServicesSection />
      <BlogMenuPage/>
      <Broker />
      <Payment />
      
      
    </div>         
    )};