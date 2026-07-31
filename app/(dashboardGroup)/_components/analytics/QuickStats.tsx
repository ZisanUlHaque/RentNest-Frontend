import { Card } from "@/components/ui/card"
import {
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Wallet,
  ArrowUpRight,
} from "lucide-react"
import { IProperty, IPayment, IRentalRequest } from "@/lib/types"

type Props = {
  properties: IProperty[]
  requests: IRentalRequest[]
  payments: IPayment[]
}

export function QuickStats({ properties, requests, payments }: Props) {
  // ═══ Total Revenue ═══
  const totalRevenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + Number(p.amount ?? 0), 0)

  // ═══ This Month Revenue ═══
  const now = new Date()
  const thisMonthRevenue = payments
    .filter((p) => {
      if (p.status !== "COMPLETED" || !p.paidAt) return false
      const paidDate = new Date(p.paidAt)
      return (
        paidDate.getMonth() === now.getMonth() &&
        paidDate.getFullYear() === now.getFullYear()
      )
    })
    .reduce((sum, p) => sum + Number(p.amount ?? 0), 0)

  // ═══ Last Month Revenue (for trend %) ═══
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1)
  const lastMonthRevenue = payments
    .filter((p) => {
      if (p.status !== "COMPLETED" || !p.paidAt) return false
      const paidDate = new Date(p.paidAt)
      return (
        paidDate.getMonth() === lastMonthDate.getMonth() &&
        paidDate.getFullYear() === lastMonthDate.getFullYear()
      )
    })
    .reduce((sum, p) => sum + Number(p.amount ?? 0), 0)

  const trend =
    lastMonthRevenue > 0
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : thisMonthRevenue > 0
      ? 100
      : 0

  // ═══ Pending Payouts ═══
  const pendingPayouts = requests
    .filter((r) => r.status === "APPROVED" || r.status === "PAYMENT_PENDING")
    .reduce(
      (sum, r) =>
        sum + (r.property?.rentPerMonth ?? 0) * (r.durationMonths ?? 1),
      0
    )

  // ═══ Active Tenants ═══
  const activeTenants = requests.filter(
    (r) => r.status === "ACTIVE"
  ).length

  const stats = [
    {
      label: "Total Revenue",
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-500/10",
      iconColor: "text-emerald-600",
      trend: null,
    },
    {
      label: "This Month",
      value: `৳${thisMonthRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-500/10",
      iconColor: "text-blue-600",
      trend: trend,
    },
    {
      label: "Pending Payouts",
      value: `৳${pendingPayouts.toLocaleString()}`,
      icon: Wallet,
      color: "from-orange-500 to-amber-600",
      bg: "bg-orange-500/10",
      iconColor: "text-orange-600",
      trend: null,
    },
    {
      label: "Active Tenants",
      value: activeTenants,
      icon: Users,
      color: "from-purple-500 to-pink-600",
      bg: "bg-purple-500/10",
      iconColor: "text-purple-600",
      trend: null,
      subtitle: `${properties.length} properties`,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="relative overflow-hidden p-6 group hover:shadow-lg transition-all duration-300"
          >
            {/* Gradient accent */}
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.color}`}
            />

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 min-w-0 flex-1">
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold truncate">{stat.value}</p>

                {stat.trend !== null ? (
                  <div className="flex items-center gap-1">
                    {stat.trend >= 0 ? (
                      <>
                        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <TrendingUp className="size-3" />
                          {stat.trend.toFixed(1)}%
                        </div>
                        <span className="text-xs text-muted-foreground">
                          vs last month
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                          <TrendingDown className="size-3" />
                          {Math.abs(stat.trend).toFixed(1)}%
                        </div>
                        <span className="text-xs text-muted-foreground">
                          vs last month
                        </span>
                      </>
                    )}
                  </div>
                ) : stat.subtitle ? (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <ArrowUpRight className="size-3" />
                    {stat.subtitle}
                  </p>
                ) : null}
              </div>

              <div
                className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}
              >
                <Icon className={`size-6 ${stat.iconColor}`} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}