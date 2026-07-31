// components/home/HeroSection.tsx
"use client"

import { Search, ChevronDown } from "lucide-react"
import Link from "next/link"

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
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-32 sm:px-6 lg:px-8">
        {/* Floating Pill Tags */}
        <div className="absolute top-32 left-[10%] hidden lg:block">
          <div className="relative flex flex-col items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-white shadow-lg ring-4 ring-white/20" />
            <div className="h-6 w-px bg-white/40" />
            <div className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-lg">
              Rent Property
            </div>
          </div>
        </div>

        <div className="absolute top-24 right-[35%] hidden lg:block">
          <div className="relative flex flex-col items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-white shadow-lg ring-4 ring-white/20" />
            <div className="h-6 w-px bg-white/40" />
            <div className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-lg">
              Buy Property
            </div>
          </div>
        </div>

        <div className="absolute top-40 right-[8%] hidden lg:block">
          <div className="relative flex flex-col items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-white shadow-lg ring-4 ring-white/20" />
            <div className="h-6 w-px bg-white/40" />
            <div className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-lg">
              Sell Property
            </div>
          </div>
        </div>

        {/* Welcome pill */}
        <div className="mb-6 -rotate-2 rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-lg">
          ✨ Welcome To All State
        </div>

        {/* Main Heading */}
        <h1 className="max-w-5xl text-center text-4xl leading-[1.1] font-bold text-white drop-shadow-2xl sm:text-5xl lg:text-6xl xl:text-7xl">
          Find A Home That <br />
          Suits Your Lifestyle
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-center text-base text-white/90 drop-shadow-lg sm:text-lg">
          Discover premium properties tailored to your dreams. Rent, buy, or
          sell with confidence.
        </p>

        {/* Search Bar */}
        <div className="mt-12 w-full max-w-5xl">
          <div className="flex items-center gap-1 rounded-full bg-white/95 p-2 shadow-2xl backdrop-blur-md">
            {/* Category */}
            <div className="flex-1 px-6 py-2">
              <label className="mb-1 block text-xs text-slate-500">
                Category
              </label>
              <div className="flex items-center justify-between">
                <select className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-slate-900 outline-none">
                  <option>Rent/Buy</option>
                  <option>Rent</option>
                  <option>Buy</option>
                </select>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            {/* Location */}
            <div className="flex-1 px-6 py-2">
              <label className="mb-1 block text-xs text-slate-500">
                Location
              </label>
              <div className="flex items-center justify-between">
                <select className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-slate-900 outline-none">
                  <option>New York</option>
                  <option>Dhaka</option>
                </select>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            {/* Type */}
            <div className="flex-1 px-6 py-2">
              <label className="mb-1 block text-xs text-slate-500">Type</label>
              <div className="flex items-center justify-between">
                <select className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-slate-900 outline-none">
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                </select>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            {/* Price */}
            <div className="flex-1 px-6 py-2">
              <label className="mb-1 block text-xs text-slate-500">Price</label>
              <div className="flex items-center justify-between">
                <select className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-slate-900 outline-none">
                  <option>USD/Month</option>
                  <option>BDT/Month</option>
                </select>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
              </div>
            </div>

            <Link
              href="/properties"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e0b458] to-[#c99339] shadow-xl transition hover:from-[#c99339] hover:to-[#a87828]"
            >
              <Search className="h-5 w-5 text-white" />
            </Link>
          </div>
        </div>

        {/* Stats Row (Optional bottom accent) */}
        <div className="mt-16 hidden items-center gap-12 md:flex">
          <div className="text-center">
            <div className="text-3xl font-bold text-white drop-shadow-lg">
              10K+
            </div>
            <div className="text-sm text-white/80">Properties</div>
          </div>
          <div className="h-10 w-px bg-white/30" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white drop-shadow-lg">
              5K+
            </div>
            <div className="text-sm text-white/80">Happy Clients</div>
          </div>
          <div className="h-10 w-px bg-white/30" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white drop-shadow-lg">
              50+
            </div>
            <div className="text-sm text-white/80">Cities</div>
          </div>
        </div>
      </div>
    </section>
  )
}
