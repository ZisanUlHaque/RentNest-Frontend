
import Image from "next/image";
import Link from "next/link";
import { Mail, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book a property?",
    answer:
      "Browse available properties, open the property details page, and click Request to Rent. The landlord will review your request and respond through your Tenant Dashboard.",
  },
  {
    question: "Is the payment secure?",
    answer:
      "Yes. RentNest uses Stripe for secure payment processing. Your card information is never stored directly on our platform.",
  },
  {
    question: "Can I cancel my rental request?",
    answer:
      "Yes. You can cancel a rental request while it is still pending. Visit your Tenant Dashboard, open My Requests, and choose the request you want to cancel.",
  },
  {
    question: "How long does landlord approval take?",
    answer:
      "Most landlords respond within 24 hours. You can track the current request status from your Tenant Dashboard.",
  },
  {
    question: "Can I review a property after renting?",
    answer:
      "Yes. Once your rental is completed, you can submit a rating and review from your Tenant Dashboard to help future tenants.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Need Help?
          </p>

          <h2 className="text-4xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-4xl lg:text-4xl">
            Frequently Asked
            <span className="mt-1 block font-serif text-5xl font-semibold italic sm:text-5xl lg:text-5xl">
              Questions
            </span>
          </h2>
        </div>

        {/* Main Content - Fixed Height Container */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left FAQ Card - Fixed Height */}
          <div className="flex h-[600px] flex-col rounded-3xl bg-card p-5 shadow-xl shadow-black/5 ring-1 ring-border sm:p-7 dark:shadow-black/30">
            {/* Contact top - Fixed */}
            <div className="mb-6 flex shrink-0 flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Email
                </p>
                <a
                  href="mailto:support@rentnest.com"
                  className="font-semibold text-foreground transition-colors hover:text-primary"
                >
                  support@rentnest.com
                </a>
              </div>

              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-chart-4 px-5 text-sm font-semibold text-background shadow-lg transition hover:opacity-90"
              >
                <Mail className="size-4" />
                Get in touch
              </Link>
            </div>

            {/* Accordion - Scrollable */}
            <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-track]:bg-transparent">
              <Accordion className="w-full space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={`faq-${index}`}
                    className="group rounded-xl border-0 bg-muted/50 px-4 transition-colors hover:bg-muted data-[state=open]:bg-muted"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:no-underline sm:text-base [&>svg]:hidden">
                      <span className="flex flex-1 items-center justify-between gap-4">
                        <span>{faq.question}</span>

                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-background transition-transform duration-300 group-data-[state=open]:rotate-45">
                          <Plus className="size-4 bg-primary" />
                        </span>
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Right Image Card - Same Fixed Height */}
          <div className="relative h-[600px] overflow-hidden rounded-3xl shadow-xl shadow-black/20">
            <Image
              src="https://plus.unsplash.com/premium_photo-1687960116833-f96f224aabea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt="Featured rental property"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

            {/* Property label */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-white/80">
                  Featured Property
                </p>
                <p className="mt-1 text-lg font-bold text-white sm:text-xl">
                  Find Your Perfect Home
                </p>
              </div>

              <Link
                href="/properties"
                className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg transition hover:bg-primary/90"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Brand */}
        <div className="mt-10 text-center sm:mt-14">
          <p className="font-serif text-2xl font-semibold italic text-foreground sm:text-3xl">
            crafted for <span className="text-primary">renters</span>
          </p>
          <p className="mt-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground uppercase">
            <span className="text-primary">RentNest</span> Property Rental
          </p>
        </div>
      </div>
    </section>
  );
}