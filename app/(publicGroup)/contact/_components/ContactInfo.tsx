// app/(publicGroup)/contact/_components/ContactFormRight.tsx

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export function ContactFormRight() {
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      toast.error("Please agree to the terms and privacy policy");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        message: "",
      });
      setAgreed(false);
    } catch {
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Your name */}
      <input
        type="text"
        placeholder="Your name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="w-full h-12 px-4 rounded-md bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="w-full h-12 px-4 rounded-md bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />

      {/* Phone */}
      <input
        type="tel"
        placeholder="Phone number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full h-12 px-4 rounded-md bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />

      {/* Company */}
      <input
        type="text"
        placeholder="Company name"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        className="w-full h-12 px-4 rounded-md bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />

      {/* Country */}
      <input
        type="text"
        placeholder="Country"
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        className="w-full h-12 px-4 rounded-md bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      />

      {/* Message */}
      <textarea
        placeholder="Message"
        rows={5}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        className="w-full px-4 py-3 rounded-md bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
      />

      {/* Agreement */}
      <label className="flex items-start gap-3 cursor-pointer pt-1">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 size-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
        />
        <span className="text-xs text-gray-600 leading-relaxed">
          *I agree to RentNest&apos;s storage and processing of the data
          according to the guidelines set to{" "}
          <Link
            href="/terms"
            className="text-primary font-medium hover:underline"
          >
            Terms & Privacy Policy.
          </Link>
        </span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 rounded-md bg-gray-900 hover:bg-gray-800 text-white font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send"
        )}
      </button>
    </form>
  );
}