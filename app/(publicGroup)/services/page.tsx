import Link from "next/link"
import { ServicesHeader } from "./_components/ServicesHeader"
import { ServicesGrid } from "./_components/ServicesGrid"
import { ArrowRight } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-20 left-10 size-96 rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 size-96 rounded-full bg-primary/10 blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <ServicesHeader />

        {/* Services Grid */}
        <ServicesGrid />

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Link href="/contact">
            <button className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 hover:scale-105 transition-all">
              Get In Touch
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}