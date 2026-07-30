import { Badge } from "@/components/ui/badge"
import { MapPin, Home, Star, CheckCircle2 } from "lucide-react"
import { IProperty } from "@/lib/types"
import { Separator } from "@/components/ui/separator"

type Props = {
  property: IProperty
}

export function PropertyInfo({ property }: Props) {
  const reviewCount = property._count?.reviews ?? 0

  return (
    <div className="space-y-10">
      {/* Amenities */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Home className="size-5 text-primary" />
          Amenities & Features
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {property.amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <CheckCircle2 className="size-4 text-green-500 shrink-0" />
              <span className="text-sm font-medium">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold mb-4">About This Property</h3>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p className="leading-relaxed whitespace-pre-wrap">
            {property.description}
          </p>
        </div>
      </div>

      <Separator />

      {/* Details Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Property Details</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <DetailItem
            label="Location"
            value={property.location}
            icon={<MapPin className="size-4" />}
          />
          <DetailItem
            label="Category"
            value={property.category?.name || "N/A"}
            icon={<Home className="size-4" />}
          />
          <DetailItem
            label="Monthly Rent"
            value={`৳${property.rentPerMonth.toLocaleString()}`}
          />
          <DetailItem
            label="Reviews"
            value={`${reviewCount} reviews`}
            icon={<Star className="size-4" />}
          />
          <DetailItem
            label="Status"
            value={property.status}
          />
          <DetailItem
            label="Listed On"
            value={new Date(property.createdAt).toLocaleDateString()}
          />
        </div>
      </div>
    </div>
  )
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) {
  return (
    <div className="p-4 rounded-xl border bg-card hover:shadow-sm transition-shadow">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-primary">{icon}</span>}
        <p className="font-semibold text-sm">{value}</p>
      </div>
    </div>
  )
}