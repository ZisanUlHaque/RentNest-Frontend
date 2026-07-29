// components/home/HeroSection.tsx
"use client";

import { Search, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image - Higher Quality Villa */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        {/* Floating Pill Tags */}
        <div className="absolute top-32 left-[10%] hidden lg:block">
          <div className="relative flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-lg ring-4 ring-white/20" />
            <div className="w-px h-6 bg-white/40" />
            <div className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/30 text-white text-sm font-medium shadow-lg">
              Rent Property
            </div>
          </div>
        </div>

        <div className="absolute top-24 right-[35%] hidden lg:block">
          <div className="relative flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-lg ring-4 ring-white/20" />
            <div className="w-px h-6 bg-white/40" />
            <div className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/30 text-white text-sm font-medium shadow-lg">
              Buy Property
            </div>
          </div>
        </div>

        <div className="absolute top-40 right-[8%] hidden lg:block">
          <div className="relative flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-lg ring-4 ring-white/20" />
            <div className="w-px h-6 bg-white/40" />
            <div className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/30 text-white text-sm font-medium shadow-lg">
              Sell Property
            </div>
          </div>
        </div>

        {/* Welcome pill */}
        <div className="mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/30 text-white text-sm font-medium shadow-lg -rotate-2">
          ✨ Welcome To All State
        </div>

        {/* Main Heading */}
        <h1 className="text-center text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] max-w-5xl drop-shadow-2xl">
          Find A Home That <br />
          Suits Your Lifestyle
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-center text-white/90 text-base sm:text-lg max-w-2xl drop-shadow-lg">
          Discover premium properties tailored to your dreams. Rent, buy, or sell with confidence.
        </p>

        {/* Search Bar */}
        <div className="mt-12 w-full max-w-5xl">
          <div className="bg-white/95 backdrop-blur-md rounded-full shadow-2xl p-2 flex items-center gap-1">
            {/* Category */}
            <div className="flex-1 px-6 py-2">
              <label className="text-xs text-slate-500 block mb-1">Category</label>
              <div className="flex items-center justify-between">
                <select className="w-full text-sm font-semibold text-slate-900 bg-transparent outline-none appearance-none cursor-pointer">
                  <option>Rent/Buy</option>
                  <option>Rent</option>
                  <option>Buy</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
              </div>
            </div>

            <div className="w-px h-10 bg-slate-200" />

            {/* Location */}
            <div className="flex-1 px-6 py-2">
              <label className="text-xs text-slate-500 block mb-1">Location</label>
              <div className="flex items-center justify-between">
                <select className="w-full text-sm font-semibold text-slate-900 bg-transparent outline-none appearance-none cursor-pointer">
                  <option>New York</option>
                  <option>Dhaka</option>
                  <option>London</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
              </div>
            </div>

            <div className="w-px h-10 bg-slate-200" />

            {/* Type */}
            <div className="flex-1 px-6 py-2">
              <label className="text-xs text-slate-500 block mb-1">Type</label>
              <div className="flex items-center justify-between">
                <select className="w-full text-sm font-semibold text-slate-900 bg-transparent outline-none appearance-none cursor-pointer">
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
              </div>
            </div>

            <div className="w-px h-10 bg-slate-200" />

            {/* Price */}
            <div className="flex-1 px-6 py-2">
              <label className="text-xs text-slate-500 block mb-1">Price</label>
              <div className="flex items-center justify-between">
                <select className="w-full text-sm font-semibold text-slate-900 bg-transparent outline-none appearance-none cursor-pointer">
                  <option>IDR/Month</option>
                  <option>USD/Month</option>
                  <option>BDT/Month</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
              </div>
            </div>

            {/* Search Button */}
            <button className="w-14 h-14 bg-gradient-to-br from-[#e0b458] to-[#c99339] hover:from-[#c99339] hover:to-[#a87828] rounded-full flex items-center justify-center transition shrink-0 shadow-xl">
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Stats Row (Optional bottom accent) */}
        <div className="mt-16 hidden md:flex items-center gap-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-white drop-shadow-lg">10K+</div>
            <div className="text-sm text-white/80">Properties</div>
          </div>
          <div className="w-px h-10 bg-white/30" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white drop-shadow-lg">5K+</div>
            <div className="text-sm text-white/80">Happy Clients</div>
          </div>
          <div className="w-px h-10 bg-white/30" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white drop-shadow-lg">50+</div>
            <div className="text-sm text-white/80">Cities</div>
          </div>
        </div>
      </div>
    </section>
  );
}