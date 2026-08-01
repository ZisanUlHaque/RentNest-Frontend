import { Card } from "@/components/ui/card"
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Wallet,
  Calendar,
  ArrowUpRight,
} from "lucide-react"
import { getMyPayments } from "../../_actions/payment"
import { getMyRentalRequests } from "../../_actions/rentalRequest"
import { IPayment, IRentalRequest } from "@/lib/types"
import { EarningsTable } from "../../_components/landlord/EarningsTable"

export default async function EarningsPage() {
  const [paymentsRes, requestsRes] = await Promise.all([
    getMyPayments(),
    getMyRentalRequests(),
  ])

  const payments: IPayment[] = paymentsRes?.data ?? []
  const requests: IRentalRequest[] = requestsRes?.data ?? []

  const completedPayments = payments.filter((p) => p.status === "COMPLETED")

  const totalEarnings = completedPayments.reduce(
    (sum, p) => sum + p.amount,
    0
  )

  const thisMonthEarnings = completedPayments
    .filter((p) => {
      if (!p.paidAt) return false
      const paidDate = new Date(p.paidAt)
      const now = new Date()
      return (
        paidDate.getMonth() === now.getMonth() &&
        paidDate.getFullYear() === now.getFullYear()
      )
    })
    .reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = requests
    .filter(
      (r) => r.status === "APPROVED" || r.status === "PAYMENT_PENDING"
    )
    .reduce(
      (sum, r) =>
        sum + (r.property?.rentPerMonth ?? 0) * r.durationMonths,
      0
    )

  const activeRentals = requests.filter((r) => r.status === "ACTIVE").length

  const stats = [
    {
      label: "Total Earnings",
      value: `৳${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-500/10",
      trend: `${completedPayments.length} payments`,
    },
    {
      label: "This Month",
      value: `৳${thisMonthEarnings.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: "Current month",
    },
    {
      label: "Pending",
      value: `৳${pendingAmount.toLocaleString()}`,
      icon: Wallet,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      trend: "Awaiting payment",
    },
    {
      label: "Active Rentals",
      value: activeRentals,
      icon: CreditCard,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      trend: "Currently rented",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Earnings</h1>
        <p className="text-muted-foreground mt-1">
          Track your rental income and payment history
        </p>
      </div>

      {/* Hero Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-8 text-primary-foreground relative">
          {/* Decorative blur circles */}
          <div className="absolute top-0 right-0 size-64 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 size-48 rounded-full bg-white/10 blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-sm opacity-90 mb-2">Total Lifetime Earnings</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">
                  ৳{totalEarnings.toLocaleString()}
                </span>
              </div>
              <p className="text-sm opacity-80 mt-2 flex items-center gap-1">
                <ArrowUpRight className="size-4" />
                {completedPayments.length} completed transactions
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/20 backdrop-blur-md">
              <Wallet className="size-12" />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
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
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="size-3" />
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

      {/* Payments Table */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Payment History</h2>
          <p className="text-sm text-muted-foreground">
            All payments received from tenants
          </p>
        </div>

        <EarningsTable payments={payments} />
      </Card>
    </div>
  )
}