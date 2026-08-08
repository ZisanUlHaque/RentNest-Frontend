import CTASection from "@/components/home/CTASection";
import FAQSection from "@/components/home/FAQSection";
import HeroSection from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks></HowItWorks>
      <WhyChooseUsSection></WhyChooseUsSection>
      <TestimonialsSection></TestimonialsSection>
      <FAQSection></FAQSection>
      <CTASection></CTASection>
    </main>
  );
}