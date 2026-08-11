import { Card } from "@/components/ui/card"
import {
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Building2,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  Award,
  Target,
  Zap,
} from "lucide-react"
import { getMyProperties } from "../../_actions/property"
import { getMyRentalRequests } from "../../_actions/rentalRequest"
import { getMyPayments } from "../../_actions/payment"
import { IProperty, IPayment, IRentalRequest } from "@/lib/types"
import {
  EarningsAreaChart,
  PropertyStatusPieChart,
  RequestStatusBarChart,
  MonthlyRentalTrendChart,
  TopPropertiesChart,
} from "../../_components/landlord/AnalyticsCharts"

const formatCurrency = (value: number): string => {
  if (!value || isNaN(value) || value < 0) return "৳0"

  if (value >= 10000000) {
    return `৳${(value / 10000000).toFixed(2)}Cr`
  }
  if (value >= 100000) {
    return `৳${(value / 100000).toFixed(2)}L`
  }
  if (value >= 1000) {
    return `৳${(value / 1000).toFixed(1)}K`
  }
  return `৳${Math.round(value).toLocaleString()}`
}

export default async function LandlordAnalyticsPage() {
  const [propertiesRes, requestsRes, paymentsRes] = await Promise.all([
    getMyProperties(),
    getMyRentalRequests(),
    getMyPayments(),
  ])

  const properties: IProperty[] = propertiesRes?.data ?? []
  const requests: IRentalRequest[] = requestsRes?.data ?? []
  const payments: IPayment[] = paymentsRes?.data ?? []

  console.log("\n=== PROPERTY RENTS DEBUG ===")
  properties.forEach((p, i) => {
    console.log(
      `${i + 1}. ${p.title}: ${p.rentPerMonth} (${formatCurrency(p.rentPerMonth)})`
    )
  })
  console.log(`Total: ${properties.length} properties\n`)

  const completedPayments = payments.filter((p) => p.status === "COMPLETED")
  const totalEarnings = completedPayments.reduce(
    (s, p) => s + Number(p.amount),
    0
  )

  const totalProperties = properties.length
  const availableProps = properties.filter(
    (p) => p.status === "AVAILABLE"
  ).length
  const rentedProps = properties.filter((p) => p.status === "RENTED").length
  const occupancyRate =
    totalProperties > 0 ? Math.round((rentedProps / totalProperties) * 100) : 0

  const totalRequests = requests.length
  const acceptedRequests = requests.filter(
    (r) =>
      r.status === "APPROVED" ||
      r.status === "ACTIVE" ||
      r.status === "COMPLETED"
  ).length
  const conversionRate =
    totalRequests > 0 ? Math.round((acceptedRequests / totalRequests) * 100) : 0

  const validProperties = properties.filter((p) => Number(p.rentPerMonth) > 0)

  const avgRent =
    validProperties.length > 0
      ? Math.round(
          validProperties.reduce((sum, p) => sum + Number(p.rentPerMonth), 0) /
            validProperties.length
        )
      : 0

  const kpis = [
    {
      label: "Total Revenue",
      value: formatCurrency(totalEarnings),
      icon: DollarSign,
      gradient: "from-emerald-500 to-green-500",
      glow: "shadow-emerald-500/30",
      trend: `${completedPayments.length} payments`,
      change: "+18%",
    },
    {
      label: "Occupancy Rate",
      value: `${occupancyRate}%`,
      icon: Target,
      gradient: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/30",
      trend: `${rentedProps}/${totalProperties} rented`,
      change: "+5%",
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: Zap,
      gradient: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/30",
      trend: `${acceptedRequests}/${totalRequests} accepted`,
      change: "+12%",
    },
    {
      label: "Avg Rent",
      value: formatCurrency(avgRent),
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500",
      glow: "shadow-orange-500/30",
      trend: "Per property",
      change: "+8%",
    },
  ]

  return (
    <div className="relative min-h-screen space-y-8">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-gradient-to-br from-primary/10 to-chart-3/5 blur-3xl" />
        <div className="absolute top-96 -left-40 size-[400px] rounded-full bg-gradient-to-br from-emerald-500/10 to-blue-500/5 blur-3xl" />
      </div>

      {/* Premium Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Award className="size-5 text-primary" />
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Landlord Analytics
            </span>
          </div>
          <h1 className="bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
            Performance Insights
          </h1>
          <p className="mt-2 text-muted-foreground">
            Deep dive into your property performance and revenue trends
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
          <Sparkles className="size-4 text-primary" />
          <span className="text-xs font-bold text-primary">
            {totalProperties} Active Properties
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} className="group relative h-full">
              <div
                className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${kpi.gradient} opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-40`}
              />

              <Card className="relative h-full overflow-hidden border-border/50 p-6 transition-all duration-300 group-hover:-translate-y-1">
                <div
                  className={`absolute -top-10 -right-10 size-32 rounded-full bg-gradient-to-br ${kpi.gradient} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-20`}
                />

                <div className="relative">
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${kpi.gradient} shadow-lg ${kpi.glow}`}
                    >
                      <Icon className="size-6 text-white" />
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      <ArrowUpRight className="size-2.5" />
                      {kpi.change}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                      {kpi.label}
                    </p>
                    <p className="text-3xl font-black">{kpi.value}</p>
                    <p className="text-xs text-muted-foreground">{kpi.trend}</p>
                  </div>
                </div>
              </Card>
            </div>
          )
        })}
      </div>

      {/* Rest of the charts... (same as before) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="relative overflow-hidden border-border/50 p-6 lg:col-span-2">
          <div className="absolute -top-20 -right-20 size-40 rounded-full bg-emerald-500/10 blur-2xl" />
          <div className="relative">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/30">
                  <TrendingUp className="size-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Earnings Trend</h2>
                  <p className="text-xs text-muted-foreground">
                    Monthly revenue overview
                  </p>
                </div>
              </div>
              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(totalEarnings)}
                </span>
              </div>
            </div>
            <EarningsAreaChart payments={payments} />
          </div>
        </Card>

        <Card className="relative overflow-hidden border-border/50 p-6">
          <div className="absolute -top-20 -left-20 size-40 rounded-full bg-purple-500/10 blur-2xl" />
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30">
                <PieChartIcon className="size-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Property Status</h2>
                <p className="text-xs text-muted-foreground">
                  Availability breakdown
                </p>
              </div>
            </div>
            <PropertyStatusPieChart properties={properties} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="relative overflow-hidden border-border/50 p-6">
          <div className="absolute -top-20 -right-20 size-40 rounded-full bg-blue-500/10 blur-2xl" />
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
                <BarChart3 className="size-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Request Analytics</h2>
                <p className="text-xs text-muted-foreground">
                  Status breakdown of tenant requests
                </p>
              </div>
            </div>
            <RequestStatusBarChart requests={requests} />
          </div>
        </Card>

        <Card className="relative overflow-hidden border-border/50 p-6">
          <div className="absolute -top-20 -left-20 size-40 rounded-full bg-orange-500/10 blur-2xl" />
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/30">
                <Activity className="size-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Monthly Requests</h2>
                <p className="text-xs text-muted-foreground">
                  Rental request trend
                </p>
              </div>
            </div>
            <MonthlyRentalTrendChart requests={requests} />
          </div>
        </Card>
      </div>

      <Card className="relative overflow-hidden border-border/50 p-6">
        <div className="absolute -top-20 right-1/3 size-40 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-3 shadow-lg shadow-primary/30">
              <Building2 className="size-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Top Performing Properties</h2>
              <p className="text-xs text-muted-foreground">
                Properties ranked by revenue and requests
              </p>
            </div>
          </div>
          <TopPropertiesChart properties={properties} payments={payments} />
        </div>
      </Card>
    </div>
  )
}
