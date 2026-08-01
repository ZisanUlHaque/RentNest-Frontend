// app/(publicGroup)/contact/page.tsx (or wherever your contact page lives)

import { ContactInfoLeft } from "./_components/ContactForm";
import { ContactFormRight } from "./_components/ContactInfo";
import { OurOffices } from "./_components/OurOffices";


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-chart-2">
      {/* Header */}
      <div className="pt-16 pb-8 text-center">
        <h1 className="text-2xl font-bold text-white inline-block">
          Contact us
          <span className="block w-12 h-1 bg-white mx-auto mt-2 rounded-full" />
        </h1>
      </div>

      {/* Curved Top Wave */}
      <div className="relative">
        <svg
          className="w-full h-16 -mb-1 text-gray-50"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,30 Q360,0 720,30 T1440,30 L1440,60 L0,60 Z"
          />
        </svg>
      </div>

      {/* Main Contact Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Info + Illustration */}
            <ContactInfoLeft />

            {/* Right: Form */}
            <ContactFormRight />
          </div>
        </div>
      </section>

      {/* Our Offices */}
      <OurOffices />
    </div>
  );
}