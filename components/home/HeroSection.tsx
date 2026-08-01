"use client";

import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 pb-24 sm:px-6 sm:pt-24 sm:pb-32 lg:px-8">
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

        <div className="mb-6 flex flex-wrap justify-center gap-2 lg:hidden">
          <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-md backdrop-blur-lg">
            Rent
          </span>
          <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-md backdrop-blur-lg">
            Buy
          </span>
          <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-md backdrop-blur-lg">
            Sell
          </span>
        </div>

        {/* Welcome pill */}
        <div className="mb-4 -rotate-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-lg sm:mb-6 sm:px-6 sm:py-2 sm:text-sm">
          ✨ Welcome To All State
        </div>

        {/* Main Heading */}
        <h1 className="max-w-5xl text-center text-3xl leading-[1.15] font-bold text-white drop-shadow-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          Find A Home That <br className="hidden sm:inline" />
          <span className="sm:hidden"> </span>
          Suits Your Lifestyle
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-2xl px-2 text-center text-sm text-white/90 drop-shadow-lg sm:mt-6 sm:text-base lg:text-lg">
          Discover premium properties tailored to your dreams. Rent, buy, or
          sell with confidence.
        </p>

        <div className="mt-8 w-full max-w-5xl sm:mt-12">
          
          {/* Desktop / Tablet Search (md+) */}
          <div className="hidden md:flex items-center gap-1 rounded-full bg-white/95 p-2 shadow-2xl backdrop-blur-md">
            {/* Category */}
            <div className="flex-1 px-4 py-2 lg:px-6">
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
            <div className="flex-1 px-4 py-2 lg:px-6">
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
            <div className="flex-1 px-4 py-2 lg:px-6">
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

            <div className="hidden h-10 w-px bg-slate-200 lg:block" />

            <div className="hidden flex-1 px-4 py-2 lg:block lg:px-6">
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
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e0b458] to-[#c99339] shadow-xl transition hover:from-[#c99339] hover:to-[#a87828] lg:h-14 lg:w-14"
            >
              <Search className="h-4 w-4 text-white lg:h-5 lg:w-5" />
            </Link>
          </div>

          <div className="flex flex-col gap-2 rounded-3xl bg-white/95 p-3 shadow-2xl backdrop-blur-md md:hidden">
            {/* Category */}
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2.5">
              <div className="flex-1">
                <label className="block text-[10px] text-slate-500">
                  Category
                </label>
                <select className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-slate-900 outline-none">
                  <option>Rent/Buy</option>
                  <option>Rent</option>
                  <option>Buy</option>
                </select>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
            </div>

            {/* Location */}
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2.5">
              <div className="flex-1">
                <label className="block text-[10px] text-slate-500">
                  Location
                </label>
                <select className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-slate-900 outline-none">
                  <option>New York</option>
                  <option>Dhaka</option>
                </select>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2.5">
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] text-slate-500">
                    Type
                  </label>
                  <select className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-slate-900 outline-none">
                    <option>House</option>
                    <option>Apt</option>
                    <option>Villa</option>
                  </select>
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2.5">
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] text-slate-500">
                    Price
                  </label>
                  <select className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-slate-900 outline-none">
                    <option>USD</option>
                    <option>BDT</option>
                  </select>
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
              </div>
            </div>

            <Link
              href="/properties"
              className="mt-1 flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#e0b458] to-[#c99339] font-semibold text-white shadow-xl transition hover:from-[#c99339] hover:to-[#a87828]"
            >
              <Search className="h-5 w-5" />
              Search Properties
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6 sm:mt-16 sm:flex sm:items-center sm:gap-12">
          <div className="text-center">
            <div className="text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
              10K+
            </div>
            <div className="text-[11px] text-white/80 sm:text-sm">
              Properties
            </div>
          </div>
          <div className="hidden h-10 w-px bg-white/30 sm:block" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
              5K+
            </div>
            <div className="text-[11px] text-white/80 sm:text-sm">
              Happy Clients
            </div>
          </div>
          <div className="hidden h-10 w-px bg-white/30 sm:block" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
              50+
            </div>
            <div className="text-[11px] text-white/80 sm:text-sm">Cities</div>
          </div>
        </div>
      </div>
    </section>
  );
}