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
import { PropertyReviews } from "../../_components/property/PropertyReviews"

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [property, user] = await Promise.all([getPropertyById(id), getMe()])

  if (!property) notFound()

  const isLoggedIn = user?.success === true
  const reviewCount = property._count?.reviews ?? 0
  const requestCount = property._count?.rentalRequests ?? 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/properties"
            className="transition-colors hover:text-primary"
          >
            Properties
          </Link>
          <span>/</span>
          <span className="max-w-48 truncate font-medium text-foreground">
            {property.title}
          </span>
        </div>

        {/* Back Button */}
        <Link
          href="/properties"
          className="group mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            {/* Image Gallery */}
            <PropertyImageGallery
              images={property.images}
              title={property.title}
            />

            {/* Title Section */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 animate-pulse rounded-full bg-primary" />
                      <span>{property.location}</span>
                    </div>
                    {property.category && (
                      <>
                        <span>•</span>
                        <Badge variant="outline">
                          {property.category.name}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <Badge
                  className={`px-4 py-1.5 text-sm ${
                    property.status === "AVAILABLE"
                      ? "border-emerald-200 bg-emerald-500/10 text-emerald-600"
                      : property.status === "RENTED"
                        ? "border-orange-200 bg-orange-500/10 text-orange-600"
                        : "border-blue-200 bg-blue-500/10 text-blue-600"
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
            <PropertyReviews propertyId={property.id} />
          </div>

          <div className="space-y-6 lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <Card className="overflow-hidden">
                {/* Price Header */}
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-primary">
                      ৳{property.rentPerMonth.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / month
                    </span>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  {/* Property Quick Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-muted/50 p-3 text-center">
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="mt-1 text-sm font-semibold">
                        {property.status}
                      </p>
                    </div>
                    <div className="rounded-xl bg-muted/50 p-3 text-center">
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="mt-1 text-sm font-semibold">
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
                            className="w-full cursor-pointer text-lg font-semibold"
                          >
                            Login to Request
                          </Button>
                        </Link>
                        <p className="text-center text-xs text-muted-foreground">
                          You need to be logged in to submit a rental request
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="rounded-xl border border-orange-200 bg-orange-50 px-3 py-4 text-center">
                      <p className="font-medium text-orange-600">
                        This property is currently not available
                      </p>
                      <p className="mt-1 text-xs text-orange-500">
                        Check back later or explore other listings
                      </p>
                    </div>
                  )}

                  {/* Trust Badge */}
                  <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
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
