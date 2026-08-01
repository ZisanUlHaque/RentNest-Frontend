export function HowItWorks() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-1 rounded-full bg-primary" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            How it works
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Renting your dream property has never been easier. Follow these
            simple steps and get started with RentNest in minutes.
          </p>
        </div>

        <div className="relative">
          <DottedConnectors />

          {/* Steps Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center">
              <SearchIllustration />
              <p className="mt-6 font-semibold text-foreground">Search Properties</p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center md:mt-16">
              <RequestIllustration />
              <p className="mt-6 font-semibold text-foreground">Send Request</p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center">
              <PaymentIllustration />
              <p className="mt-6 font-semibold text-foreground">Secure Payment</p>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col items-center text-center md:mt-16">
              <MoveInIllustration />
              <p className="mt-6 font-semibold text-foreground">Move In</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DottedConnectors() {
  return (
    <div className="absolute inset-0 hidden lg:block pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Curve 1: Step 1 to Step 2 (up and right) */}
        <path
          d="M 200 100 Q 300 20, 450 180"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeDasharray="4 6"
          fill="none"
          opacity="0.5"
        />

        {/* Curve 2: Step 2 to Step 3 (down and right) */}
        <path
          d="M 500 200 Q 650 280, 750 100"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeDasharray="4 6"
          fill="none"
          opacity="0.5"
        />

        {/* Curve 3: Step 3 to Step 4 (up and right) */}
        <path
          d="M 850 100 Q 950 20, 1050 180"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeDasharray="4 6"
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}

function SearchIllustration() {
  return (
    <div className="relative w-52">
      {/* Main window */}
      <div className="bg-white dark:bg-card rounded-lg shadow-xl border overflow-hidden">
        {/* Header bar */}
        <div className="bg-slate-900 dark:bg-slate-800 h-6 flex items-center px-2 gap-1">
          <div className="size-1.5 rounded-full bg-slate-600" />
          <div className="size-1.5 rounded-full bg-slate-600" />
          <div className="size-1.5 rounded-full bg-slate-600" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Search box */}
          <div className="h-6 rounded bg-emerald-500 w-1/3" />

          {/* Result rows */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-2 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-2 w-8 rounded bg-emerald-400" />
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-2 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-2 w-8 rounded bg-slate-300 dark:bg-slate-600" />
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-2 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-2 w-8 rounded bg-emerald-400" />
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-2 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-2 w-8 rounded bg-slate-300 dark:bg-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RequestIllustration() {
  return (
    <div className="relative w-52 h-40">
      {/* Card 3 (back) */}
      <div className="absolute top-0 left-0 w-40 bg-white dark:bg-card rounded-lg shadow-lg border p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-4 rounded bg-emerald-400" />
          <div className="h-1.5 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="h-2 rounded bg-primary/70 w-2/3" />
      </div>

      {/* Card 2 (middle) */}
      <div className="absolute top-8 left-8 w-40 bg-white dark:bg-card rounded-lg shadow-lg border p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-4 rounded bg-emerald-400" />
          <div className="h-1.5 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="h-2 rounded bg-primary/70 w-3/4" />
      </div>

      {/* Card 1 (front) */}
      <div className="absolute top-16 left-16 w-40 bg-white dark:bg-card rounded-lg shadow-xl border p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-4 rounded bg-emerald-500" />
          <div className="h-1.5 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="h-2 rounded bg-primary w-4/5" />
      </div>
    </div>
  )
}

function PaymentIllustration() {
  return (
    <div className="relative w-52 h-40">
      {/* Back window */}
      <div className="absolute top-0 left-0 w-40 bg-white dark:bg-card rounded-lg shadow-lg border overflow-hidden">
        <div className="bg-slate-900 dark:bg-slate-800 h-5 flex items-center px-2 gap-1">
          <div className="size-1 rounded-full bg-slate-600" />
          <div className="size-1 rounded-full bg-slate-600" />
        </div>
        <div className="p-3 space-y-2">
          <div className="size-6 rounded bg-emerald-500" />
          <div className="space-y-1">
            <div className="h-1 rounded bg-slate-300 dark:bg-slate-600 w-full" />
            <div className="h-1 rounded bg-slate-300 dark:bg-slate-600 w-4/5" />
            <div className="h-1 rounded bg-slate-300 dark:bg-slate-600 w-3/4" />
          </div>
        </div>
      </div>

      {/* Front window */}
      <div className="absolute top-6 left-12 w-40 bg-white dark:bg-card rounded-lg shadow-xl border overflow-hidden">
        <div className="bg-slate-900 dark:bg-slate-800 h-5 flex items-center px-2 gap-1">
          <div className="size-1 rounded-full bg-slate-600" />
          <div className="size-1 rounded-full bg-slate-600" />
        </div>
        <div className="p-3 space-y-2">
          <div className="h-2 rounded bg-primary w-3/4" />
          <div className="space-y-1.5">
            <div className="h-2 rounded bg-slate-200 dark:bg-slate-700 w-full" />
            <div className="h-2 rounded bg-slate-200 dark:bg-slate-700 w-full" />
            <div className="h-2 rounded bg-primary/70 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}

function MoveInIllustration() {
  return (
    <div className="relative w-52 h-40">
      {/* Left doc */}
      <div className="absolute top-4 left-0 w-16 h-24 bg-white dark:bg-card rounded-md shadow-md border p-2 space-y-1">
        <div className="h-1 rounded bg-slate-200 dark:bg-slate-700 w-full" />
        <div className="h-1 rounded bg-slate-200 dark:bg-slate-700 w-4/5" />
        <div className="h-1 rounded bg-slate-200 dark:bg-slate-700 w-full" />
        <div className="h-1 rounded bg-slate-200 dark:bg-slate-700 w-3/5" />
      </div>

      {/* Center doc (highlighted) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-28 bg-white dark:bg-card rounded-md shadow-xl border p-2 space-y-1 z-10">
        <div className="h-1 rounded bg-slate-200 dark:bg-slate-700 w-full" />
        <div className="h-1 rounded bg-slate-200 dark:bg-slate-700 w-full" />
        {/* Bar chart */}
        <div className="flex items-end gap-0.5 h-10 pt-2">
          <div className="w-2 h-3 bg-primary/40 rounded-sm" />
          <div className="w-2 h-5 bg-primary/60 rounded-sm" />
          <div className="w-2 h-7 bg-primary rounded-sm" />
          <div className="w-2 h-4 bg-primary/50 rounded-sm" />
        </div>

        {/* Checkmark badge */}
        <div className="absolute -top-2 -right-2 size-7 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <svg
            className="size-4 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Right doc */}
      <div className="absolute top-4 right-0 w-16 h-24 bg-white dark:bg-card rounded-md shadow-md border p-2 space-y-1">
        <div className="h-1 rounded bg-slate-200 dark:bg-slate-700 w-full" />
        <div className="h-1 rounded bg-slate-200 dark:bg-slate-700 w-3/4" />
        <div className="h-1 rounded bg-slate-200 dark:bg-slate-700 w-full" />
        <div className="h-1 rounded bg-slate-200 dark:bg-slate-700 w-2/3" />
      </div>
    </div>
  )
}