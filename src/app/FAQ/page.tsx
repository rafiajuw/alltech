import Faq from '@/app/Components/Faq';
import HeroSection from '../Components/HeroSection';

export default function FAQPage() {
  return (
    <div className="relative">
     <HeroSection/>
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-10">
        <Faq />
      </div>
    </div>
  );
}
