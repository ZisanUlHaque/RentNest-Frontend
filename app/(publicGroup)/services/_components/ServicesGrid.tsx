import {
  Search,
  Home,
  Shield,
  CreditCard,
  MessageSquare,
  BarChart3,
} from "lucide-react"
import { ServiceCard } from "./ServiceCard"

const services = [
  {
    icon: Search,
    title: "Smart Property Search",
    description:
      "Find your perfect rental with advanced filters, real-time updates, and personalized recommendations.",
    features: [
      "Advanced Filtering",
      "Map-based Search",
      "Saved Searches",
    ],
    color: "red" as const,
  },
  {
    icon: Home,
    title: "Property Listings",
    description:
      "List your properties with ease. Reach thousands of verified tenants and manage requests effortlessly.",
    features: [
      "Unlimited Listings",
      "Photo Gallery",
      "Instant Publishing",
    ],
    color: "blue" as const,
  },
  {
    icon: Shield,
    title: "Verified Users",
    description:
      "Every user is verified for safety. Rent or list with confidence knowing you're dealing with real people.",
    features: [
      "Identity Verification",
      "Background Checks",
      "Secure Profiles",
    ],
    color: "yellow" as const,
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Powered by Stripe, our payment system ensures safe, fast, and encrypted transactions every time.",
    features: [
      "Stripe Integration",
      "Multiple Payment Methods",
      "Automatic Receipts",
    ],
    color: "purple" as const,
  },
  {
    icon: MessageSquare,
    title: "Rental Management",
    description:
      "Track requests, approve tenants, and manage active rentals — all from one intuitive dashboard.",
    features: [
      "Request Approvals",
      "Tenant Communication",
      "Status Tracking",
    ],
    color: "orange" as const,
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Get powerful insights into your properties, earnings, occupancy rates, and tenant satisfaction.",
    features: [
      "Revenue Reports",
      "Occupancy Metrics",
      "Performance Trends",
    ],
    color: "cyan" as const,
  },
]

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  )
}