import { Card } from "@/components/ui/card"
import {
  FileText,
  Clock,
  CreditCard,
  Home,
  Star,
  type LucideIcon,
} from "lucide-react"
import { getMyRentalRequests } from "../_actions/rentalRequest"
import { getMyPayments } from "../_actions/payment"
import { getMyReviews } from "../_actions/review" // ✅ import করুন
import { IPayment, IRentalRequest, IReview } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function TenantDashboardPage() {
  // ✅ 3টা API একসাথে call করুন
  const [requestsRes, paymentsRes, reviewsRes] = await Promise.all([
    getMyRentalRequests(),
    getMyPayments(),
    getMyReviews(),
  ])

  const requests: IRentalRequest[] = requestsRes?.data ?? []
  const payments: IPayment[] = paymentsRes?.data ?? []
  const reviews: IReview[] = reviewsRes?.data ?? [] // ✅ reviews আনুন

  const totalRequests = requests.length
  const pendingRequests = requests.filter((r) => r.status === "PENDING").length
  const activeRentals = requests.filter((r) => r.status === "ACTIVE").length
  const totalReviews = reviews.length // ✅ actual review count
  const totalPaid = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0)

  const stats = [
    {
      label: "Total Requests",
      value: totalRequests,
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Pending",
      value: pendingRequests,
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      label: "Active Rentals",
      value: activeRentals,
      icon: Home,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Total Paid",
      value: `৳${totalPaid.toLocaleString()}`,
      icon: CreditCard,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tenant Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track your rental journey and payments
          </p>
        </div>

        <Link href="/properties">
          <Button size="lg">
            <Home className="mr-2 size-4" />
            Browse Properties
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`size-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickAccessCard
          title="My Requests"
          description="View all rental requests and their status"
          href="/tenant-dashboard/requests"
          icon={FileText}
          count={totalRequests}
        />
        <QuickAccessCard
          title="Payments"
          description="Track your payment history"
          href="/tenant-dashboard/payments"
          icon={CreditCard}
          count={payments.length}
        />
        <QuickAccessCard
          title="Reviews"
          description="Review completed rentals"
          href="/tenant-dashboard/reviews"
          icon={Star}
          count={totalReviews} 
        />
      </div>

      {/* Recent Requests */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            Recent Requests
          </h2>
          <Link href="/tenant-dashboard/requests">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-12">
            <Home className="size-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-4">No requests yet</p>
            <Link href="/properties">
              <Button>Browse Properties</Button>
            </Link>
          </div>
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
                    {req.property?.location} • ৳
                    {req.property?.rentPerMonth.toLocaleString()}/mo
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

function QuickAccessCard({
  title,
  description,
  href,
  icon: Icon,
  count,
}: {
  title: string
  description: string
  href: string
  icon: LucideIcon
  count: number
}) {
  return (
    <Link href={href}>
      <Card className="p-6 hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Icon className="size-6 text-primary" />
          </div>
          <span className="text-2xl font-bold text-primary">{count}</span>
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </Card>
    </Link>
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