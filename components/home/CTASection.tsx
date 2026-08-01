// src/components/home/CTASection.tsx

import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[380px] sm:min-h-[440px]">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=800&fit=crop"
          alt="Modern property"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-end p-8 sm:p-12 lg:p-16 min-h-[380px] sm:min-h-[440px]">
          <div className="max-w-2xl w-full">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Start Your Property
                <br />
                Journey Today
              </h2>

              {/* Description */}
              <p className="text-white/85 text-sm sm:text-base max-w-xs">
                Search, Compare, And Secure Your Dream Property With Ease And
                Confidence.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3 bg-chart-3 hover:bg-chart-4 text-white font-semibold rounded-full transition shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center px-7 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}