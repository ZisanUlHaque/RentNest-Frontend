"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Eye } from "lucide-react"
import { ICategory, IProperty } from "@/lib/types"
import { PropertyFormDialog } from "./PropertyFormDialog"
import { DeletePropertyDialog } from "./DeletePropertyDialog"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Props = {
  property: IProperty
  categories: ICategory[]
}

export function MyPropertyCard({ property, categories }: Props) {
  const requestCount = property._count?.rentalRequests ?? 0

  return (
    <Card className="overflow-hidden pt-0 flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          unoptimized
          className="object-cover"
        />
        <Badge
          className={`absolute top-3 right-3 ${
            property.status === "AVAILABLE"
              ? "bg-green-500"
              : property.status === "RENTED"
              ? "bg-orange-500"
              : "bg-blue-500"
          } text-white border-0`}
        >
          {property.status}
        </Badge>
      </div>

      <CardContent className="flex flex-col flex-1 space-y-3 p-4">
        <div>
          <h3 className="font-semibold line-clamp-1">{property.title}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="size-3.5" />
            {property.location}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-primary text-lg">
            ৳{property.rentPerMonth.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Users className="size-3.5" />
            {requestCount} requests
          </span>
        </div>

        <div className="flex gap-2 mt-auto pt-2">
          <Link
            href={`/properties/${property.id}`}
            className="flex-1"
            target="_blank"
          >
            <Button variant="ghost" size="sm" className="w-full">
              <Eye className="mr-2 size-3" />
              View
            </Button>
          </Link>
          <PropertyFormDialog
            mode="edit"
            property={property}
            categories={categories}
          />
          <DeletePropertyDialog propertyId={property.id} title={property.title} />
        </div>
      </CardContent>
    </Card>
  )
}