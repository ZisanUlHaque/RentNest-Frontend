// app/page.tsx
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks></HowItWorks>
      <TestimonialsSection></TestimonialsSection>
      <CTASection></CTASection>
    </main>
  );
}