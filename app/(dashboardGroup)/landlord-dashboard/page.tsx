import { Card } from "@/components/ui/card"
import {
  Building2,
  Clock,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react"
import { getMyProperties } from "../_actions/property"
import { getMyRentalRequests } from "../_actions/rentalRequest" 
import { IProperty, IRentalRequest } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function LandlordDashboardPage() {
  const [propertiesRes, requestsRes] = await Promise.all([
    getMyProperties(),
    getMyRentalRequests(), 
  ])

  const properties: IProperty[] = propertiesRes?.data ?? []
  const requests: IRentalRequest[] = requestsRes?.data ?? []

  const totalProperties = properties.length
  const availableProperties = properties.filter(
    (p) => p.status === "AVAILABLE"
  ).length
  const rentedProperties = properties.filter((p) => p.status === "RENTED").length
  const pendingRequests = requests.filter((r) => r.status === "PENDING").length
  const approvedRequests = requests.filter((r) => r.status === "APPROVED").length

  const monthlyEarnings = requests
    .filter((r) => r.status === "ACTIVE" || r.status === "COMPLETED")
    .reduce((sum, r) => sum + (r.property?.rentPerMonth ?? 0), 0)

  const stats = [
    {
      label: "Total Properties",
      value: totalProperties,
      icon: Building2,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: `${availableProperties} available`,
    },
    {
      label: "Pending Requests",
      value: pendingRequests,
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      trend: "Awaiting your action",
    },
    {
      label: "Approved Rentals",
      value: approvedRequests,
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
      trend: `${rentedProperties} active`,
    },
    {
      label: "Monthly Earnings",
      value: `৳${monthlyEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      trend: "Estimated",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s your property overview.
          </p>
        </div>

        <Link href="/landlord-dashboard/properties">
          <Button size="lg">
            <Building2 className="mr-2 size-4" />
            Manage Properties
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className="p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="size-3" />
                    {stat.trend}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`size-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <h2 className="text-xl font-semibold">Recent Requests</h2>
          </div>
          <Link href="/landlord-dashboard/requests">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {requests.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No rental requests yet
          </p>
        ) : (
          <div className="space-y-3">
            {requests.slice(0, 5).map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium">{req.property?.title}</p>
                  <p className="text-sm text-muted-foreground">
                    From: {req.tenant?.name}
                  </p>
                </div>
                <StatusBadge status={req.status} />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    ACTIVE: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-gray-100 text-gray-700",
    PAYMENT_PENDING: "bg-orange-100 text-orange-700",
  }
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colors[status] ?? "bg-gray-100"
      }`}
    >
      {status}
    </span>
  )
}