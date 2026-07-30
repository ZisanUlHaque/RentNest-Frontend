import { notFound } from "next/navigation"
import { ArrowLeft, Shield, CalendarDays, Eye, Tag } from "lucide-react"
import Link from "next/link"
import { PropertyImageGallery } from "../../_components/property/PropertyImageGallery"
import { PropertyInfo } from "../../_components/property/PropertyInfo"
import { RequestToRentModal } from "../../_components/property/RequestToRentModal"
import { LandlordCard } from "../../_components/property/LandlordCard"
import { getPropertyById } from "../../_actions/getPropertyById"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getMe } from "@/service/getMe"

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [property, user] = await Promise.all([
    getPropertyById(id),
    getMe(),
  ])

  if (!property) notFound()

  const isLoggedIn = user?.success === true
  const reviewCount = property._count?.reviews ?? 0
  const requestCount = property._count?.rentalRequests ?? 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/properties"
            className="hover:text-primary transition-colors"
          >
            Properties
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-48">
            {property.title}
          </span>
        </div>

        {/* Back Button */}
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 group transition-colors"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ════════════ Left Column ════════════ */}
          <div className="lg:col-span-8 space-y-8">
            {/* Image Gallery */}
            <PropertyImageGallery
              images={property.images}
              title={property.title}
            />

            {/* Title Section */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 rounded-full bg-primary animate-pulse" />
                      <span>{property.location}</span>
                    </div>
                    {property.category && (
                      <>
                        <span>•</span>
                        <Badge variant="outline">{property.category.name}</Badge>
                      </>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <Badge
                  className={`text-sm px-4 py-1.5 ${
                    property.status === "AVAILABLE"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
                      : property.status === "RENTED"
                      ? "bg-orange-500/10 text-orange-600 border-orange-200"
                      : "bg-blue-500/10 text-blue-600 border-blue-200"
                  }`}
                  variant="outline"
                >
                  {property.status}
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="size-4" />
                  <span>{requestCount} Rental Requests</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="size-4" />
                  <span>
                    Listed{" "}
                    {new Date(property.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tag className="size-4" />
                  <span>{reviewCount} Reviews</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Property Info */}
            <PropertyInfo property={property} />
          </div>

          {/* ════════════ Right Column - Sidebar ════════════ */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <Card className="overflow-hidden">
                {/* Price Header */}
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-primary">
                      ৳{property.rentPerMonth.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      / month
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Property Quick Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="font-semibold text-sm mt-1">
                        {property.status}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="font-semibold text-sm mt-1">
                        {property.category?.name ?? "N/A"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* CTA Section */}
                  {property.status === "AVAILABLE" ? (
                    isLoggedIn ? (
                      <RequestToRentModal property={property} />
                    ) : (
                      <div className="space-y-3">
                        <Link href="/login" className="block">
                          <Button
                            size="lg"
                            className="w-full text-lg font-semibold cursor-pointer"
                          >
                            Login to Request
                          </Button>
                        </Link>
                        <p className="text-xs text-center text-muted-foreground">
                          You need to be logged in to submit a rental request
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-4 px-3 rounded-xl bg-orange-50 border border-orange-200">
                      <p className="text-orange-600 font-medium">
                        This property is currently not available
                      </p>
                      <p className="text-xs text-orange-500 mt-1">
                        Check back later or explore other listings
                      </p>
                    </div>
                  )}

                  {/* Trust Badge */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                    <Shield className="size-4 text-green-500" />
                    <span>Verified listing • Secure transaction</span>
                  </div>
                </div>
              </Card>

              {/* Landlord Card */}
              {property.landlord && (
                <LandlordCard landlord={property.landlord} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}