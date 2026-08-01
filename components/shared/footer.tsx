"use client"

import { ChevronUp, Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa6"

const siteMapLinks = [
  { label: "Homepage", href: "/", active: true },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Properties", href: "/properties" },
  { label: "Contact Us", href: "/contact" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Services", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Refund Policy", href: "/refund" },
]

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
]

const contactInfo = [
  { icon: Phone, text: "+880 1234 567 890", href: "tel:+8801234567890" },
  { icon: Mail, text: "hello@rentnest.com", href: "mailto:hello@rentnest.com" },
  { icon: MapPin, text: "Dhanmondi, Dhaka, Bangladesh", href: "#" },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-primary-foreground p-2 pb-28 sm:p-4 md:pb-6 lg:p-6">
      {" "}
      <div className="relative overflow-hidden rounded-2xl bg-[#1e3a3a] sm:rounded-3xl">
        {/* Decorative mountain lines background */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
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
          <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-16">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
              <div className="text-center lg:text-left">
                <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-xs text-white/70 sm:text-sm">
                  Get the latest property listings and exclusive deals delivered
                  to your inbox.
                </p>
              </div>
              <div className="flex flex-col items-stretch gap-2 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-md sm:flex-row sm:items-center sm:gap-2 sm:rounded-full">
                <div className="flex flex-1 items-center gap-2 px-3 py-1">
                  <Mail className="h-4 w-4 shrink-0 text-white/60 sm:h-5 sm:w-5" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/50"
                  />
                </div>
                <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#d4a24c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b8892f] sm:rounded-full sm:px-6">
                  Subscribe
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-16 lg:py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 lg:grid-cols-12">
            {/* Brand Section */}
            <div className="sm:col-span-2 md:col-span-3 lg:col-span-4">
              <Link
                href="/"
                className="mb-4 flex items-center justify-center gap-1 sm:mb-6 sm:justify-start"
              >
                <div className="size-12 overflow-hidden rounded-lg">
                  <Image
                    src="/logo.png"
                    alt="RentNest Logo"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <span className="text-xl font-bold tracking-wide text-white sm:text-2xl">
                  RentNest
                </span>
              </Link>

              <p className="mx-auto mb-5 max-w-md text-center text-sm leading-relaxed text-white/80 sm:mx-0 sm:mb-6 sm:text-left">
                Empowering renters and property owners with modern tools to
                find, list and manage perfect homes effortlessly across the
                country.
              </p>

              {/* Contact Info */}
              <ul className="mb-5 space-y-3 sm:mb-6">
                {contactInfo.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-center gap-3 text-xs text-white/80 transition hover:text-[#d4a24c] sm:justify-start sm:text-sm"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-[#d4a24c]/20">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="break-all sm:break-normal">
                          {item.text}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Social Icons */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-3">
                {[
                  FaXTwitter,
                  FaLinkedin,
                  FaInstagram,
                  FaFacebook,
                  FaYoutube,
                ].map((Icon, idx) => (
                  <Link
                    key={idx}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#d4a24c]"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Site Map */}
            <div className="text-center sm:text-left lg:col-span-2">
              <h3 className="relative mb-5 inline-block text-base font-semibold text-white sm:mb-6">
                Site Map
                <span className="absolute -bottom-2 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-[#d4a24c] sm:left-0 sm:translate-x-0" />
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {siteMapLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-[#d4a24c] ${
                        link.active ? "text-white" : ""
                      }`}
                    >
                      <ArrowRight className="hidden h-3 w-3 opacity-0 transition group-hover:opacity-100 sm:inline" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="text-center sm:text-left lg:col-span-2">
              <h3 className="relative mb-5 inline-block text-base font-semibold text-white sm:mb-6">
                Support
                <span className="absolute -bottom-2 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-[#d4a24c] sm:left-0 sm:translate-x-0" />
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-[#d4a24c]"
                    >
                      <ArrowRight className="hidden h-3 w-3 opacity-0 transition group-hover:opacity-100 sm:inline" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="text-center sm:text-left lg:col-span-2">
              <h3 className="relative mb-5 inline-block text-base font-semibold text-white sm:mb-6">
                Legal
                <span className="absolute -bottom-2 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-[#d4a24c] sm:left-0 sm:translate-x-0" />
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-[#d4a24c]"
                    >
                      <ArrowRight className="hidden h-3 w-3 opacity-0 transition group-hover:opacity-100 sm:inline" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download App */}
            <div className="text-center sm:col-span-2 sm:text-left md:col-span-3 lg:col-span-2">
              <h3 className="relative mb-5 inline-block text-base font-semibold text-white sm:mb-6">
                Get the App
                <span className="absolute -bottom-2 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-[#d4a24c] sm:left-0 sm:translate-x-0" />
              </h3>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-stretch lg:flex-col">
                <Link
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 transition hover:bg-white/20 sm:w-auto sm:justify-start lg:w-full"
                >
                  <FaApple className="h-6 w-6 shrink-0 text-white" />
                  <div className="text-left">
                    <div className="text-[10px] leading-none text-white/60">
                      Download on
                    </div>
                    <div className="text-sm font-semibold text-white">
                      App Store
                    </div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 transition hover:bg-white/20 sm:w-auto sm:justify-start lg:w-full"
                >
                  <FaGooglePlay className="h-5 w-5 shrink-0 text-white" />
                  <div className="text-left">
                    <div className="text-[10px] leading-none text-white/60">
                      Get it on
                    </div>
                    <div className="text-sm font-semibold text-white">
                      Google Play
                    </div>
                  </div>
                </Link>
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/40 px-4 py-2.5 text-xs font-semibold tracking-widest text-white transition hover:bg-white/10 sm:mt-6"
              >
                <ChevronUp className="h-4 w-4" strokeWidth={2.5} />
                BACK TO TOP
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative bg-chart-2 py-3 sm:py-4">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 sm:flex-row sm:gap-3 sm:px-6">
            <p className="order-2 text-center text-[11px] font-medium text-black/80 sm:order-1 sm:text-left sm:text-xs">
              Copyright © {new Date().getFullYear()} RentNest.com. All Rights
              Reserved.
            </p>
            <div className="order-1 flex items-center gap-3 text-[11px] font-medium text-black/80 sm:order-2 sm:gap-4 sm:text-xs">
              <Link href="/privacy" className="transition hover:text-black">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/terms" className="transition hover:text-black">
                Terms
              </Link>
              <span>•</span>
              <Link href="/sitemap" className="transition hover:text-black">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
