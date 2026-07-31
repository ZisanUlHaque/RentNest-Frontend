// src/components/home/TestimonialsSection.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

interface Testimonial {
  id: number;
  rating: number;
  content: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
  propertyImage: string;
  secondaryImage: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    content:
      "From our first meeting, the team understood exactly what we were looking for and the timeline we were under. They provided weekly market updates, arranged pre-screened showings.",
    authorName: "Jessica Liu",
    authorTitle: "Senior Communications Manager",
    authorImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    propertyImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=500&fit=crop",
    secondaryImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    rating: 5,
    content:
      "The RentBridge platform made our home search seamless. Every property we viewed matched our criteria perfectly, and the landlords were verified and responsive throughout.",
    authorName: "Michael Rahman",
    authorTitle: "Software Engineer",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    propertyImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=500&fit=crop",
    secondaryImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    rating: 5,
    content:
      "As a first-time renter, I was nervous about the process. RentBridge walked me through every step, and I found my dream apartment within two weeks. Truly a game-changer.",
    authorName: "Sarah Ahmed",
    authorTitle: "Marketing Director",
    authorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    propertyImage:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&h=500&fit=crop",
    secondaryImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonial = testimonials[currentIndex];

  const goPrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  const goNext = () =>
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
          Trusted by Homeowners Like You
        </h2>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Main Property Image */}
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image
                src={testimonial.propertyImage}
                alt="Happy homeowners"
                fill
                className="object-cover transition-all duration-500"
                key={`main-${testimonial.id}`}
              />
            </div>
          </div>

          {/* Middle: Testimonial Content */}
          <div className="lg:col-span-5 space-y-5">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < testimonial.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200 fill-gray-200"
                  }
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-gray-700 text-lg leading-relaxed">
              {testimonial.content}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-2">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-gray-100">
                <Image
                  src={testimonial.authorImage}
                  alt={testimonial.authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {testimonial.authorName}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial.authorTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Secondary Image + Nav */}
          <div className="lg:col-span-3 flex flex-col items-end gap-6">
            <div className="relative w-full max-w-[220px] aspect-square rounded-2xl overflow-hidden shadow-md">
              <Image
                src={testimonial.secondaryImage}
                alt="Client"
                fill
                className="object-cover transition-all duration-500"
                key={`secondary-${testimonial.id}`}
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
              >
                <ArrowLeft size={18} className="text-gray-700" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition"
              >
                <ArrowRight size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}