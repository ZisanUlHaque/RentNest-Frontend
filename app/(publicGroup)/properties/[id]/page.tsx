
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  Home as HomeIcon,
  MapPin,
  ChevronRight,
  BedDouble,
  Bath,
  Square,
  Car,
  Info,
  CheckCircle2,
  Wifi,
  Zap,
  Wind,
  Shield,
  Waves,
  Utensils,
  Tv,
  Building,
  Dumbbell,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import { PropertyImageGallery } from "../../_components/property/PropertyImageGallery"
import { RequestToRentModal } from "../../_components/property/RequestToRentModal"
import { LandlordCard } from "../../_components/property/LandlordCard"
import { getPropertyById } from "../../_actions/getPropertyById"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getMe } from "@/service/getMe"
import { PropertyReviews } from "../../_components/property/PropertyReviews"
import Image from "next/image"

const AMENITY_ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  parking: Car,
  generator: Zap,
  ac: Wind,
  "air conditioning": Wind,
  kitchen: Utensils,
  tv: Tv,
  elevator: Building,
  lift: Building,
  security: Shield,
  pool: Waves,
  gym: Dumbbell,
}

const getAmenityIcon = (amenity: string) => {
  const key = amenity.toLowerCase()
  for (const [name, Icon] of Object.entries(AMENITY_ICONS)) {
    if (key.includes(name)) return Icon
  }
  return CheckCircle2
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [property, user] = await Promise.all([getPropertyById(id), getMe()])

  if (!property) notFound()

  const isLoggedIn = user?.success === true
  const requestCount = property._count?.rentalRequests ?? 0

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link
            href="/properties"
            className="hover:text-primary transition-colors"
          >
            Properties
          </Link>
          <ChevronRight className="size-3" />
          <span className="font-semibold text-foreground truncate max-w-[200px]">
            {property.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            {/* Image Gallery */}
            <PropertyImageGallery
              images={property.images}
              title={property.title}
            />

            <Card className="p-6 border-border/50">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    {property.title}
                  </h1>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    <span>{property.location}</span>
                  </div>
                </div>

                {/* Price - Right aligned like reference */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary sm:text-3xl">
                    ৳{property.rentPerMonth.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-4">
                {property.category && (
                  <div className="flex items-center gap-2 text-sm">
                    <HomeIcon className="size-4 text-primary" />
                    <span className="font-medium">
                      {property.category.name}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Square className="size-4 text-primary" />
                  <span className="font-medium">1200 sq ft</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge
                    className={`${
                      property.status === "AVAILABLE"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                        : property.status === "RENTED"
                          ? "bg-orange-500/10 text-orange-600 border-orange-500/30"
                          : "bg-blue-500/10 text-blue-600 border-blue-500/30"
                    }`}
                    variant="outline"
                  >
                    {property.status}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6 border-border/50">
              <div className="mb-4 flex items-center gap-2">
                <Info className="size-5 text-primary" />
                <h2 className="text-xl font-bold">Description</h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {property.description}
              </p>
            </Card>

            {/* Property Details Table */}
            <Card className="p-6 border-border/50">
              <div className="mb-5 flex items-center gap-2">
                <HomeIcon className="size-5 text-primary" />
                <h2 className="text-xl font-bold">Property Details</h2>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                <DetailRow
                  label="Property Type"
                  value={property.category?.name ?? "N/A"}
                />
                <DetailRow
                  label="Property ID"
                  value={property.id.slice(0, 8).toUpperCase()}
                />
                <DetailRow label="Status" value={property.status} />
                <DetailRow
                  label="Monthly Rent"
                  value={`৳${property.rentPerMonth.toLocaleString()}`}
                />
                <DetailRow
                  label="Available From"
                  value={new Date(property.createdAt).toLocaleDateString(
                    "en-US",
                    { day: "numeric", month: "short", year: "numeric" }
                  )}
                />
                <DetailRow label="Total Requests" value={requestCount} />
                <DetailRow label="Location" value={property.location} />
                <DetailRow
                  label="Total Reviews"
                  value={property._count?.reviews ?? 0}
                />
              </div>
            </Card>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <Card className="p-6 border-border/50">
                <div className="mb-5 flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-primary" />
                  <h2 className="text-xl font-bold">Amenities</h2>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
                  {property.amenities.map((amenity: string) => {
                    const Icon = getAmenityIcon(amenity)
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Icon className="size-4 text-primary shrink-0" />
                        <span className="font-medium truncate">{amenity}</span>
                      </div>
                    )
                  })}
                </div>

                {property.amenities.length > 8 && (
                  <button className="mt-4 text-xs font-semibold text-primary hover:underline">
                    View All ({property.amenities.length})
                  </button>
                )}
              </Card>
            )}

            {/* Property Location */}
            <Card className="p-6 border-border/50">
              <div className="mb-5 flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                <h2 className="text-xl font-bold">Property Location</h2>
              </div>

              {/* Map placeholder */}
              <div className="relative aspect-[16/6] w-full overflow-hidden rounded-xl bg-muted">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    property.location
                  )}&output=embed`}
                  className="size-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                <span>{property.location}</span>
              </div>
            </Card>

            {/* Reviews */}
            <PropertyReviews propertyId={property.id} />
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Landlord Card */}
              {property.landlord && (
                <LandlordCard landlord={property.landlord} />
              )}

              {/* Request/CTA Card */}
              <Card className="p-6 border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
                <h3 className="mb-1 text-base font-bold">Interested?</h3>
                <p className="mb-4 text-xs text-muted-foreground">
                  Submit a request and get response within 24 hours
                </p>

                {property.status === "AVAILABLE" ? (
                  isLoggedIn ? (
                    <RequestToRentModal property={property} />
                  ) : (
                    <Link href="/login" className="block">
                      <Button size="lg" className="w-full">
                        Login to Request
                      </Button>
                    </Link>
                  )
                ) : (
                  <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-center">
                    <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                      Currently Unavailable
                    </p>
                  </div>
                )}

                {/* Trust badges */}
                <div className="mt-5 space-y-2 border-t pt-4">
                  <TrustItem text="Verified Listing" />
                  <TrustItem text="Secure Payment" />
                  <TrustItem text="24/7 Support" />
                </div>
              </Card>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        <OtherProperties currentId={property.id} />
      </div>
    </div>
  )
}


function DetailRow({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="flex items-center justify-between border-b border-border/30 py-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  )
}

function TrustItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <CheckCircle2 className="size-3.5 text-emerald-500" />
      <span className="font-medium">{text}</span>
    </div>
  )
}


type OtherProperty = {
  id: string
  title: string
  images: string[]
  location: string
  category?: { name: string }
  rentPerMonth: number
}

async function OtherProperties({ currentId }: { currentId: string }) {
  // fetch other properties
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?limit=3`,
    { next: { revalidate: 300 } }
  )
  const data = await res.json()
  const properties = (data?.data?.data ?? []).filter(
    (p: OtherProperty) => p.id !== currentId
  )

  if (properties.length === 0) return null

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold text-primary underline underline-offset-8">
          Other Properties
        </h2>
        <Link
          href="/properties"
          className="flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
        >
          View All <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {properties.slice(0, 3).map((prop: OtherProperty) => (
          <OtherPropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </div>
  )
}

function OtherPropertyCard({ property }: { property: OtherProperty }) {
  return (
    <Card className="overflow-hidden border-border/50 p-0">
      <div className="relative h-40 w-full">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 font-bold">{property.title}</h3>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Square className="size-3 text-primary" />
            <span className="truncate">{property.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <HomeIcon className="size-3 text-primary" />
            <span>{property.category?.name ?? "Property"}</span>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-lg font-bold text-primary">
            ৳{property.rentPerMonth.toLocaleString()}
          </p>
          <p className="text-[10px] text-muted-foreground">per month</p>
        </div>

        <Link href={`/properties/${property.id}`} className="block mt-3">
          <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  )
}