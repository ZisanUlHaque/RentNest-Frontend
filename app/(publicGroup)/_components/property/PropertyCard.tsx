// components/properties/PropertyCard.tsx

"use client"

import Image from "next/image"
import { MapPin, Star, Loader2, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { IProperty } from "@/lib/types"
import { Button } from "@/components/ui/button"

type PropertyCardProps = {
  post: IProperty
}

export function PropertyCard({ post }: PropertyCardProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const reviewCount = post._count?.reviews ?? post.reviews?.length ?? 0
  const loading = isPending

  const handleViewDetails = () => {
    startTransition(() => {
      router.push(`/properties/${post.id}`)
    })
  }

  const handleMouseEnter = () => {
    router.prefetch(`/properties/${post.id}`)
  }

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      className="group flex flex-col overflow-hidden pt-0"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={post.images[0]}
          alt={post.title}
          fill
          unoptimized
          className="object-cover transition-transform"
        />

        <Badge
          variant="outline"
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
            post.status === "AVAILABLE"
              ? "border-emerald-200 bg-emerald-500/90 text-white"
              : post.status === "RENTED"
                ? "border-orange-200 bg-orange-500/90 text-white"
                : "border-blue-200 bg-blue-500/90 text-white"
          }`}
        >
          {post.status}
        </Badge>

        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2 text-white">
              <Loader2 className="size-8 animate-spin" />
              <p className="text-xs font-medium">Loading details...</p>
            </div>
          </div>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col space-y-4 p-4">
        <div>
          <h3 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {post.location}
          </div>
        </div>

        <p className="line-clamp-3 text-sm text-muted-foreground">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.amenities.slice(0, 3).map((item) => (
            <Badge key={item} variant="secondary">
              {item}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-primary">
              ৳{post.rentPerMonth.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {reviewCount} Reviews
          </div>
        </div>

        <Button
          onClick={handleViewDetails}
          disabled={loading}
          className="w-full bg-chart-4 text-white transition-all hover:bg-chart-3 disabled:cursor-wait disabled:opacity-100"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              View Details
              <ArrowRight className="ml-2 size-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
