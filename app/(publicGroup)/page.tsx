// app/page.tsx
import HeroSection from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks></HowItWorks>
    </main>
  );
}