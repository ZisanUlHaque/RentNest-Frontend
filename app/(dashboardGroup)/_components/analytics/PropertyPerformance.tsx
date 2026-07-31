import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  IProperty,
  IRentalRequest,
  IPayment,
} from "@/lib/types"
import { Building2, TrendingUp, Users, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Props = {
  properties: IProperty[]
  requests: IRentalRequest[]
  payments: IPayment[]
}

export function PropertyPerformance({
  properties,
  requests,
  payments,
}: Props) {
  // Calculate performance for each property
  const performance = properties
    .map((property) => {
      const propertyRequests = requests.filter(
        (r) => r.propertyId === property.id
      )
      const propertyEarnings = payments
        .filter(
          (p) =>
            p.status === "COMPLETED" &&
            p.rentalRequest?.propertyId === property.id
        )
        .reduce((sum, p) => sum + Number(p.amount ?? 0), 0)

      return {
        property,
        requests: propertyRequests.length,
        earnings: propertyEarnings,
      }
    })
    .sort((a, b) => b.earnings - a.earnings)
    .slice(0, 5)

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Building2 className="size-5 text-primary" />
            Top Performing Properties
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Ranked by total earnings
          </p>
        </div>

        <Link href="/landlord-dashboard/properties">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-1 size-3" />
          </Button>
        </Link>
      </div>

      {performance.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Building2 className="size-10 mx-auto mb-2 opacity-50" />
          <p>No properties to show</p>
        </div>
      ) : (
        <div className="space-y-3">
          {performance.map(({ property, requests, earnings }, index) => (
            <div
              key={property.id}
              className="flex items-center gap-4 p-3 rounded-xl border hover:bg-muted/30 transition-colors"
            >
              {/* Rank */}
              <div
                className={`size-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                  index === 0
                    ? "bg-yellow-100 text-yellow-700"
                    : index === 1
                    ? "bg-slate-200 text-slate-700"
                    : index === 2
                    ? "bg-orange-100 text-orange-700"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                #{index + 1}
              </div>

              {/* Image */}
              <div className="relative size-14 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={property.images?.[0] ?? ""}
                  alt={property.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm line-clamp-1">
                  {property.title}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Users className="size-3" />
                    {requests} requests
                  </span>
                  <Badge
                    variant="outline"
                    className={
                      property.status === "AVAILABLE"
                        ? "text-green-600 border-green-200"
                        : property.status === "RENTED"
                        ? "text-blue-600 border-blue-200"
                        : "text-orange-600 border-orange-200"
                    }
                  >
                    {property.status}
                  </Badge>
                </div>
              </div>

              {/* Earnings */}
              <div className="text-right shrink-0">
                <p className="font-bold text-sm">
                  ৳{earnings.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                  <TrendingUp className="size-3" />
                  Earned
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}