import { MapPin, Phone, Mail,  Camera } from "lucide-react"

export function ContactIllustration() {
  return (
    <div className="space-y-8 flex flex-col justify-between">
      <div className="relative flex items-center justify-center min-h-[280px]">
        {/* Background circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-56 rounded-full bg-primary/10" />
        </div>

        <FloatingShapes />

        <div className="relative z-10">
          <EnvelopeIllustration />
        </div>
      </div>

      <div className="space-y-4 pt-8">
        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground">
              House 42, Road 11, Block C
            </p>
            <p className="text-sm text-foreground">Gulshan-2, Dhaka 1212</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <Phone className="size-5 text-primary shrink-0" />
          <p className="text-sm text-foreground">+880 1XXX-XXXXXX</p>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail className="size-5 text-primary shrink-0" />
          <p className="text-sm text-foreground">support@rentnest.com</p>
        </div>
      </div>
    </div>
  )
}

function EnvelopeIllustration() {
  return (
    <div className="relative">
      {/* Envelope Body */}
      <div className="relative">
        {/* Back of envelope */}
        <div className="w-40 h-28 bg-primary rounded-lg shadow-xl relative overflow-hidden">
          {/* Paper inside */}
          <div className="absolute inset-x-2 top-2 h-24 bg-card rounded shadow-sm p-2 space-y-1">
            <div className="h-1 bg-muted-foreground/30 rounded w-3/4" />
            <div className="h-1 bg-muted-foreground/30 rounded w-full" />
            <div className="h-1 bg-muted-foreground/30 rounded w-5/6" />
            <div className="h-1 bg-muted-foreground/30 rounded w-2/3" />
            <div className="h-1 bg-muted-foreground/30 rounded w-3/4" />
            <div className="h-1 bg-muted-foreground/30 rounded w-full" />
            <div className="h-1 bg-muted-foreground/30 rounded w-4/5" />
          </div>
        </div>

        {/* Envelope Flap */}
        <div
          className="absolute -top-0 left-0 w-40 h-14 bg-primary/90"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          }}
        />
      </div>

      {/* Paper Plane */}
      <div className="absolute -right-8 -top-4">
        <div className="relative">
          <div
            className="w-10 h-8 bg-primary"
            style={{
              clipPath: "polygon(0 50%, 100% 0, 100% 100%)",
            }}
          />
          <div
            className="absolute top-1 right-0 w-6 h-6 bg-primary/70"
            style={{
              clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
            }}
          />
        </div>
      </div>

      {/* Chat Bubble */}
      <div className="absolute -left-8 -top-6">
        <div className="relative">
          <div className="size-12 rounded-2xl rounded-bl-none bg-primary/80 flex items-center justify-center shadow-lg">
            <div className="flex gap-1">
              <div className="size-1.5 rounded-full bg-primary-foreground" />
              <div className="size-1.5 rounded-full bg-primary-foreground" />
              <div className="size-1.5 rounded-full bg-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Small chat bubble */}
      <div className="absolute -left-2 -top-10">
        <div className="size-8 rounded-full bg-primary/60 flex items-center justify-center shadow-md">
          <div className="w-3 h-2 bg-primary-foreground rounded-sm" />
        </div>
      </div>
    </div>
  )
}

/* ═══════ Floating Decorative Shapes ═══════ */
function FloatingShapes() {
  return (
    <>
      {/* Circles */}
      <div className="absolute top-4 right-12 size-3 rounded-full border-2 border-primary/60" />
      <div className="absolute top-16 right-4 size-2 rounded-full bg-primary/70" />
      <div className="absolute bottom-8 right-16 size-4 rounded-full bg-primary/60" />
      <div className="absolute bottom-16 right-8 size-3 rounded-full border-2 border-primary/50" />
      <div className="absolute top-8 left-8 size-2 rounded-full bg-primary/50" />
      <div className="absolute bottom-4 left-4 size-3 rounded-full border-2 border-primary/60" />
      <div className="absolute top-1/2 left-2 size-2 rounded-full bg-primary/70" />
      <div className="absolute top-1/3 right-2 size-2 rounded-full bg-primary/60" />

      {/* X marks */}
      <div className="absolute top-6 right-20 text-primary/60 font-bold text-lg">
        ✕
      </div>
      <div className="absolute bottom-12 left-8 text-primary/60 font-bold">
        ✕
      </div>
      <div className="absolute top-12 left-16 text-primary/70 font-bold">
        ✕
      </div>

      {/* Plus marks */}
      <div className="absolute bottom-6 right-4 text-primary/70 font-bold text-xl">
        +
      </div>
      <div className="absolute top-4 left-4 text-primary/60 font-bold text-lg">
        +
      </div>

      {/* Triangle */}
      <div
        className="absolute bottom-16 right-4 w-0 h-0"
        style={{
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderBottom: "10px solid var(--primary)",
          opacity: 0.6,
        }}
      />
      <div
        className="absolute top-16 left-10 w-0 h-0"
        style={{
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderBottom: "8px solid var(--primary)",
          opacity: 0.5,
        }}
      />

      {/* Wavy line */}
      <svg
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary/60"
        width="30"
        height="6"
        viewBox="0 0 30 6"
      >
        <path
          d="M0 3 Q7.5 0 15 3 T30 3"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Curved arc */}
      <svg
        className="absolute bottom-12 right-8 text-primary/60"
        width="20"
        height="10"
        viewBox="0 0 20 10"
      >
        <path
          d="M0 10 Q10 -5 20 10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </>
  )
}