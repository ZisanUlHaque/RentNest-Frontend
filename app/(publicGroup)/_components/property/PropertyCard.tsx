import Image from "next/image"
import { MapPin, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { IProperty } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type PropertyCardProps = {
  post: IProperty
}

export function PropertyCard({ post }: PropertyCardProps) {
  const reviewCount = post._count?.reviews ?? post.reviews?.length ?? 0

  return (
    <Card className="flex flex-col overflow-hidden pt-0">
      <div className="relative h-56 w-full">
        <Image
          src={post.images[0]}
          alt={post.title}
          fill
          unoptimized
          className="object-cover"
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
      </div>

      <CardContent className="flex flex-1 flex-col space-y-4 p-4">
        <div>
          <h3 className="line-clamp-1 text-lg font-semibold">{post.title}</h3>
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

        <Link href={`/properties/${post.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full bg-chart-4 text-white hover:bg-chart-3"
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
