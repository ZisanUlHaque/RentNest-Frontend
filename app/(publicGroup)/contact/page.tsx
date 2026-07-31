import { ContactFormLeft } from "./_components/ContactForm";
import { ContactIllustration } from "./_components/ContactInfo";


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/70 via-primary to-primary/80 flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-10 left-20 size-64 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute bottom-10 right-20 size-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 size-48 rounded-full bg-white/5 blur-2xl" />

      {/* Wavy card container */}
      <div className="relative max-w-6xl w-full">
        {/* Main White Card with wavy edges */}
        <div className="relative bg-card rounded-4xl shadow-2xl overflow-hidden">
          {/* Wave decorations on left side */}
          <div className="absolute -left-16 top-1/4 size-32 rounded-full bg-primary/80" />
          <div className="absolute -left-8 bottom-1/4 size-24 rounded-full bg-primary/80" />

          {/* Wave decorations on right side */}
          <div className="absolute -right-20 top-1/3 size-40 rounded-full bg-primary/80" />
          <div className="absolute -right-12 bottom-1/4 size-28 rounded-full bg-primary/80" />

          {/* Content */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-10 sm:p-14 lg:p-16">
            {/* Left: Form */}
            <ContactFormLeft />

            {/* Right: Illustration + Info */}
            <ContactIllustration />
          </div>
        </div>
      </div>
    </div>
  )
}