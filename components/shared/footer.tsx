// components/shared/Footer.tsx
"use client";

import { ChevronUp, Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa6";

const siteMapLinks = [
  { label: "Homepage", href: "/", active: true },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Properties", href: "/properties" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Services", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Refund Policy", href: "/refund" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
];

const contactInfo = [
  { icon: Phone, text: "+880 1234 567 890", href: "tel:+8801234567890" },
  { icon: Mail, text: "hello@rentnest.com", href: "mailto:hello@rentnest.com" },
  { icon: MapPin, text: "Dhanmondi, Dhaka, Bangladesh", href: "#" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary-foreground p-2 sm:p-4 lg:p-6">
      <div className="relative bg-[#1e3a3a] rounded-2xl sm:rounded-3xl overflow-hidden">
        {/* Decorative mountain lines background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          viewBox="0 0 1200 600"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 400 L300 200 L500 350 L800 100 L1000 300 L1200 150"
            stroke="#d4a24c"
            strokeWidth="1"
            opacity="0.4"
          />
          <path
            d="M0 500 L200 350 L450 450 L700 250 L950 400 L1200 300"
            stroke="#d4a24c"
            strokeWidth="1"
            opacity="0.3"
          />
          <path
            d="M100 600 L400 400 L600 500 L900 350 L1100 450 L1200 400"
            stroke="#d4a24c"
            strokeWidth="1"
            opacity="0.25"
          />
        </svg>

        {/* Newsletter Section */}
        <div className="relative border-b border-white/10">
          <div className="px-5 sm:px-8 lg:px-16 py-8 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div className="text-center lg:text-left">
                <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-white/70 text-xs sm:text-sm">
                  Get the latest property listings and exclusive deals delivered
                  to your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-full p-2">
                <div className="flex items-center flex-1 gap-2 px-3 py-1">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 shrink-0" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent outline-none text-white placeholder:text-white/50 text-sm min-w-0"
                  />
                </div>
                <button className="bg-[#d4a24c] hover:bg-[#b8892f] text-white px-5 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition shrink-0">
                  Subscribe
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative px-5 sm:px-8 lg:px-16 py-10 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 sm:gap-10">
            {/* Brand Section */}
            <div className="sm:col-span-2 md:col-span-3 lg:col-span-4">
              <Link
                href="/"
                className="flex items-center justify-center sm:justify-start gap-3 mb-4 sm:mb-6"
              >
                <div className="size-9 sm:size-10 rounded-lg bg-gradient-to-b from-[#1f6feb] via-[#3b82f6] to-[#60a5fa] flex items-center justify-center shadow-lg">
                  <span className="text-sm sm:text-base font-bold text-white">
                    PP
                  </span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  RentNest
                </span>
              </Link>

              <p className="text-white/80 text-sm leading-relaxed mb-5 sm:mb-6 text-center sm:text-left max-w-md mx-auto sm:mx-0">
                Empowering renters and property owners with modern tools to find,
                list and manage perfect homes effortlessly across the country.
              </p>

              {/* Contact Info */}
              <ul className="space-y-3 mb-5 sm:mb-6">
                {contactInfo.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-center sm:justify-start gap-3 text-white/80 hover:text-[#d4a24c] transition text-xs sm:text-sm group"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#d4a24c]/20 transition shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="break-all sm:break-normal">
                          {item.text}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Social Icons */}
              <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 flex-wrap">
                {[FaXTwitter, FaLinkedin, FaInstagram, FaFacebook, FaYoutube].map(
                  (Icon, idx) => (
                    <Link
                      key={idx}
                      href="#"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d4a24c] flex items-center justify-center text-white transition"
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Site Map */}
            <div className="lg:col-span-2 text-center sm:text-left">
              <h3 className="text-white text-base font-semibold mb-5 sm:mb-6 relative inline-block">
                Site Map
                <span className="absolute -bottom-2 left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 w-8 h-0.5 bg-[#d4a24c]" />
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {siteMapLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`text-white/70 hover:text-[#d4a24c] transition text-sm inline-flex items-center gap-2 group ${
                        link.active ? "text-white" : ""
                      }`}
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition hidden sm:inline" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="lg:col-span-2 text-center sm:text-left">
              <h3 className="text-white text-base font-semibold mb-5 sm:mb-6 relative inline-block">
                Support
                <span className="absolute -bottom-2 left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 w-8 h-0.5 bg-[#d4a24c]" />
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-[#d4a24c] transition text-sm inline-flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition hidden sm:inline" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="lg:col-span-2 text-center sm:text-left">
              <h3 className="text-white text-base font-semibold mb-5 sm:mb-6 relative inline-block">
                Legal
                <span className="absolute -bottom-2 left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 w-8 h-0.5 bg-[#d4a24c]" />
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-[#d4a24c] transition text-sm inline-flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition hidden sm:inline" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download App */}
            <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 text-center sm:text-left">
              <h3 className="text-white text-base font-semibold mb-5 sm:mb-6 relative inline-block">
                Get the App
                <span className="absolute -bottom-2 left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 w-8 h-0.5 bg-[#d4a24c]" />
              </h3>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 items-center sm:items-stretch">
                <Link
                  href="#"
                  className="w-full sm:w-auto lg:w-full flex items-center justify-center sm:justify-start gap-3 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition"
                >
                  <FaApple className="w-6 h-6 text-white shrink-0" />
                  <div className="text-left">
                    <div className="text-[10px] text-white/60 leading-none">
                      Download on
                    </div>
                    <div className="text-white text-sm font-semibold">
                      App Store
                    </div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="w-full sm:w-auto lg:w-full flex items-center justify-center sm:justify-start gap-3 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition"
                >
                  <FaGooglePlay className="w-5 h-5 text-white shrink-0" />
                  <div className="text-left">
                    <div className="text-[10px] text-white/60 leading-none">
                      Get it on
                    </div>
                    <div className="text-white text-sm font-semibold">
                      Google Play
                    </div>
                  </div>
                </Link>
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="mt-5 sm:mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-white/40 rounded-md text-white text-xs font-semibold tracking-widest hover:bg-white/10 transition"
              >
                <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
                BACK TO TOP
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative bg-chart-2 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
            <p className="text-black/80 text-[11px] sm:text-xs font-medium text-center sm:text-left order-2 sm:order-1">
              Copyright © {new Date().getFullYear()} RentNest.com. All Rights
              Reserved.
            </p>
            <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-black/80 font-medium order-1 sm:order-2">
              <Link href="/privacy" className="hover:text-black transition">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-black transition">
                Terms
              </Link>
              <span>•</span>
              <Link href="/sitemap" className="hover:text-black transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}