// app/(publicGroup)/_components/property/PropertyInfo.tsx

import { Card } from "@/components/ui/card"
import {
  Wifi,
  Car,
  Zap,
  Wind,
  Utensils,
  Tv,
  Home,
  Shield,
  Waves,
  Dumbbell,
  Info,
  CheckCircle2,
  Building,
  type LucideIcon,
} from "lucide-react"

const AMENITY_ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  parking: Car,
  generator: Zap,
  ac: Wind,
  "air conditioning": Wind,
  kitchen: Utensils,
  tv: Tv,
  elevator: Building,
  security: Shield,
  pool: Waves,
  gym: Dumbbell,
  default: Home,
}

const getAmenityIcon = (amenity: string) => {
  const key = amenity.toLowerCase()
  for (const [name, Icon] of Object.entries(AMENITY_ICONS)) {
    if (key.includes(name)) return Icon
  }
  return AMENITY_ICONS.default
}

type Props = {
  property: {
    description: string
    amenities: string[]
  }
}

export function PropertyInfo({ property }: Props) {
  return (
    <div className="space-y-6">
      {/* Description Card - Premium */}
      <Card className="relative overflow-hidden border-border/50 p-6 shadow-lg shadow-black/5 sm:p-8 dark:shadow-black/20">
        <div className="absolute -top-20 -right-20 size-40 rounded-full bg-primary/5 blur-2xl" />

        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-chart-3/20">
              <Info className="size-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">About This Property</h2>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {property.description}
          </p>
        </div>
      </Card>

      {/* Amenities Card - Premium */}
      {property.amenities && property.amenities.length > 0 && (
        <Card className="relative overflow-hidden border-border/50 p-6 shadow-lg shadow-black/5 sm:p-8 dark:shadow-black/20">
          <div className="absolute -bottom-20 -left-20 size-40 rounded-full bg-chart-3/5 blur-2xl" />

          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-chart-3/20 to-primary/20">
                <CheckCircle2 className="size-5 text-chart-3" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Amenities</h2>
                <p className="text-xs text-muted-foreground">
                  {property.amenities.length} features available
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {property.amenities.map((amenity) => {
                const Icon = getAmenityIcon(amenity)
                return (
                  <div
                    key={amenity}
                    className="group flex items-center gap-3 rounded-xl border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 p-3 transition-all hover:-translate-y-1 hover:border-primary/50 hover:from-primary/5 hover:to-chart-3/5 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-chart-3/10 transition-all group-hover:from-primary/20 group-hover:to-chart-3/20">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <span className="text-sm font-semibold">{amenity}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}