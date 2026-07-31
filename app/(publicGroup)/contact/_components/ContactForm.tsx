"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function ContactFormLeft() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success("Message sent successfully!")
      setFormData({ name: "", email: "", message: "" })
    } catch {
      toast.error("Failed to send message")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-5xl font-bold text-primary">Let&apos;s talk</h1>
        <p className="text-muted-foreground leading-relaxed max-w-sm">
          To request a quote or want to meet up for coffee, contact us directly
          or fill out the form and we will get back to you promptly.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-primary">
            Your Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            className="w-full h-12 px-4 rounded-full bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border-0"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-primary">
            Your Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full h-12 px-4 rounded-full bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border-0"
          />
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-primary">
            Your Message
          </label>
          <textarea
            placeholder="Type something if you want..."
            rows={4}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            className="w-full px-4 py-3 rounded-2xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none border-0"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/40 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/50 hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}