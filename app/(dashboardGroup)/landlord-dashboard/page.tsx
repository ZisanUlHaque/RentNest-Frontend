import { getMyProperties } from "../_actions/property"
import { getMyRentalRequests } from "../_actions/rentalRequest"
import { getMyPayments } from "../_actions/payment"
import { IProperty, IPayment, IRentalRequest } from "@/lib/types"

import { Button } from "@/components/ui/button"
import { Building2, Sparkles } from "lucide-react"
import Link from "next/link"
import { QuickStats } from "../_components/analytics/QuickStats"
import { OccupancyGauge } from "../_components/analytics/OccupancyGauge"
import { PropertyPerformance } from "../_components/analytics/PropertyPerformance"
import { RecentActivityFeed } from "../_components/analytics/RecentActivityFeed"
import { EarningsChart } from "../_components/analytics/EarningsChart"

export default async function LandlordDashboardPage() {
  const [propertiesRes, requestsRes, paymentsRes] = await Promise.all([
    getMyProperties(),
    getMyRentalRequests(),
    getMyPayments(),
  ])

  const properties: IProperty[] = propertiesRes?.data ?? []
  const requests: IRentalRequest[] = requestsRes?.data ?? []
  const payments: IPayment[] = paymentsRes?.data ?? []

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-8 text-primary-foreground">
        <div className="absolute -top-24 -right-24 size-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="size-5" />
              <span className="text-sm font-medium opacity-90">
                Analytics Overview
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back, Landlord! 👋
            </h1>
            <p className="text-sm opacity-80 mt-2">
              Track your property performance and rental income at a glance
            </p>
          </div>

          <Link href="/landlord-dashboard/properties">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              <Building2 className="mr-2 size-4" />
              Manage Properties
            </Button>
          </Link>
        </div>
      </div>

      <QuickStats
        properties={properties}
        requests={requests}
        payments={payments}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EarningsChart payments={payments} />
        </div>
        <div>
          <OccupancyGauge properties={properties} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PropertyPerformance
            properties={properties}
            requests={requests}
            payments={payments}
          />
        </div>
        <div>
          <RecentActivityFeed requests={requests} />
        </div>
      </div>
    </div>
  )
}