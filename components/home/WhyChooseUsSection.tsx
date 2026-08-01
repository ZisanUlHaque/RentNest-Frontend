
import Link from "next/link";
import { ChevronRight, Home, Award, Wallet, Users } from "lucide-react";

const features = [
  {
    icon: Home,
    title: "Competitive Pricing",
    description:
      "Experience quality without breaking the bank—we offer fair and competitive pricing.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Award,
    title: "Certified Experts",
    description:
      "Choose RentNest for proven excellence backed by certified professionals.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Wallet,
    title: "Easy Financing",
    description: (
      <>
        Don&apos;t let budget constraints stop you—explore our hassle-free{" "}
        <Link
          href="#"
          className="text-red-600 underline underline-offset-2 hover:text-red-700"
        >
          Financing
        </Link>{" "}
        options.
      </>
    ),
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Users,
    title: "100% Satisfaction",
    description: (
      <>
        Don&apos;t just take our word for it—
        <Link
          href="#"
          className="text-red-600 underline underline-offset-2 hover:text-red-700"
        >
          see
        </Link>{" "}
        what homeowners of Dhaka say about RentNest.
      </>
    ),
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="space-y-6">
            {/* Small label */}
            <p className="text-3xl text-primary">
               Why RentNest?
            </p>

            {/* Big Heading */}
            <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-[1.05] tracking-tight">
              The RentNest
              <br />
              Difference
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed max-w-md">
              For over a decade, we&apos;ve been a proud service provider,
              earning and maintaining the trust of the community in Dhaka,
              Chittagong, and surrounding areas.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-chart-3 font-semibold hover:text-chart-4 group"
              >
                Call Now
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center gap-1 text-chart-3 font-semibold hover:text-chart-4 group"
              >
                Browse Properties
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>

          <div className="lg:border-r lg:border-gray-200 lg:pr-8 space-y-10">
            {features.slice(0, 2).map((feature, index) => (
              <div key={feature.title}>
                <FeatureItem feature={feature} />
                {index === 0 && (
                  <div className="border-b border-gray-200 mt-10" />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-10">
            {features.slice(2, 4).map((feature, index) => (
              <div key={feature.title}>
                <FeatureItem feature={feature} />
                {index === 0 && (
                  <div className="border-b border-gray-200 mt-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureItemProps {
  feature: {
    icon: React.ElementType;
    title: string;
    description: React.ReactNode;
    iconBg: string;
    iconColor: string;
  };
}

function FeatureItem({ feature }: FeatureItemProps) {
  const Icon = feature.icon;
  return (
    <div className="flex gap-4">
      <div
        className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center shrink-0`}
      >
        <Icon size={26} className={feature.iconColor} strokeWidth={2} />
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-2">
          {feature.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}