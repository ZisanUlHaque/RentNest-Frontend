// app/(publicGroup)/contact/_components/ContactInfoLeft.tsx

import { Phone, Mail } from "lucide-react";

export function ContactInfoLeft() {
  return (
    <div className="space-y-8">
      {/* Heading */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">Get in touch</h2>
        <p className="text-gray-600 leading-relaxed max-w-sm">
          Contact us and we will come back to you as soon as possible.
        </p>
      </div>

      {/* Illustration */}
      <div className="relative flex items-center justify-center py-8">
        <EnvelopeIllustration />
      </div>

      {/* Quick Contact */}
      <div className="flex flex-wrap items-center gap-6 pt-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center">
            <Phone className="size-4 text-gray-800" />
          </div>
          <span className="text-sm font-medium text-gray-800">
            (+880) 1XXX-XXXXXX
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center">
            <Mail className="size-4 text-gray-800" />
          </div>
          <span className="text-sm font-medium text-gray-800">
            info@rentnest.com
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Envelope Illustration ─── */
function EnvelopeIllustration() {
  return (
    <div className="relative">
      {/* Background circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-64 sm:size-72 rounded-full bg-primary/10" />
      </div>

      {/* Main content */}
      <div className="relative flex items-end justify-center min-h-[260px] gap-4">
        {/* Person figure (left) */}
        <div className="relative flex flex-col items-center z-10">
          {/* Head */}
          <div className="w-8 h-8 rounded-full bg-gray-800 mb-1" />
          {/* Body */}
          <div className="w-14 h-16 bg-primary/80 rounded-t-2xl" />
          {/* Arm holding paper */}
          <div className="absolute top-10 right-0 w-8 h-2 bg-primary/80 rounded-full rotate-45" />
          {/* Paper in hand */}
          <div className="absolute top-8 -right-4 w-6 h-8 bg-white border border-gray-300 shadow-sm rotate-12" />
          {/* Legs */}
          <div className="flex gap-1 mt-1">
            <div className="w-2 h-10 bg-gray-800 rounded" />
            <div className="w-2 h-10 bg-gray-800 rounded" />
          </div>
        </div>

        {/* Big Envelope (center-right) */}
        <div className="relative z-10 mb-2">
          {/* Envelope body */}
          <div className="w-32 h-24 bg-primary rounded-md shadow-xl relative overflow-hidden">
            {/* Paper sticking out */}
            <div className="absolute inset-x-2 -top-2 h-16 bg-white rounded-sm shadow-sm p-1.5 space-y-1">
              <div className="h-0.5 bg-gray-300 rounded w-3/4" />
              <div className="h-0.5 bg-gray-300 rounded w-full" />
              <div className="h-0.5 bg-gray-300 rounded w-5/6" />
              <div className="h-0.5 bg-gray-300 rounded w-2/3" />
              <div className="h-0.5 bg-gray-300 rounded w-3/4" />
            </div>
          </div>
          {/* Envelope flap (bottom triangle) */}
          <div
            className="absolute bottom-0 left-0 w-32 h-12 bg-primary/90"
            style={{
              clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
            }}
          />
        </div>

        {/* Flying letters (top-right) */}
        <div className="absolute top-2 right-8 w-8 h-6 bg-red-400 rounded-sm shadow-md rotate-12">
          <div
            className="w-full h-full bg-red-500"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 60%)",
            }}
          />
        </div>
        <div className="absolute top-8 right-16 w-8 h-6 bg-primary rounded-sm shadow-md -rotate-6">
          <div
            className="w-full h-full bg-primary/80"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 60%)",
            }}
          />
        </div>
      </div>

      {/* Floating decorations */}
      <FloatingDecorations />
    </div>
  );
}

function FloatingDecorations() {
  return (
    <>
      {/* Sparkles */}
      <div className="absolute top-8 left-8 text-primary text-lg">✦</div>
      <div className="absolute top-16 right-4 text-primary/70 text-sm">✦</div>
      <div className="absolute bottom-8 right-8 text-primary text-lg">✦</div>
      <div className="absolute bottom-16 left-6 text-primary/70 text-sm">
        ✦
      </div>

      {/* Dots */}
      <div className="absolute top-4 right-20 size-1.5 rounded-full bg-primary/60" />
      <div className="absolute bottom-4 left-16 size-1.5 rounded-full bg-primary/60" />
      <div className="absolute top-1/2 -right-2 size-2 rounded-full bg-primary/40" />

      {/* Squiggle lines */}
      <svg
        className="absolute top-12 right-2 text-primary/40"
        width="24"
        height="8"
        viewBox="0 0 24 8"
      >
        <path
          d="M0 4 Q6 0 12 4 T24 4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="absolute bottom-12 left-2 text-primary/40 rotate-12"
        width="20"
        height="8"
        viewBox="0 0 20 8"
      >
        <path
          d="M0 4 Q5 0 10 4 T20 4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}