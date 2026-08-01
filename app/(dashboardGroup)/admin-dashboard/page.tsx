import { Card } from "@/components/ui/card"
import {
  Users,
  Building2,
  FileText,
  DollarSign,
  Clock,
  CheckCircle2,
  Ban,
  TrendingUp,
  Activity,
} from "lucide-react"
import {
  adminGetAllUsers,
  adminGetAllProperties,
  adminGetAllRentals,
  adminGetAllPayments,
} from "../_actions/admin"
import { IPayment, IProperty, IRentalRequest, IUser } from "@/lib/types"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Helper: safely extract array from various response shapes
const toArray = <T,>(res: unknown): T[] => {
  if (Array.isArray(res)) return res as T[]
  if (typeof res !== "object" || res === null) return []

  const data = (res as { data?: unknown }).data
  if (Array.isArray(data)) return data as T[]
  if (
    typeof data === "object" &&
    data !== null &&
    Array.isArray((data as { data?: unknown }).data)
  ) {
    return (data as { data: unknown[] }).data as T[]
  }
  return []
}

export default async function AdminDashboardPage() {
  const [usersRes, propsRes, rentalsRes, paymentsRes] = await Promise.all([
    adminGetAllUsers({ limit: "1000" }),
    adminGetAllProperties(),
    adminGetAllRentals(),
    adminGetAllPayments(),
  ])

  const users = toArray<IUser>(usersRes)
  const properties = toArray<IProperty>(propsRes)
  const rentals = toArray<IRentalRequest>(rentalsRes)
  const payments = toArray<IPayment>(paymentsRes)

  const totalUsers = users.length
  const tenants = users.filter((u) => u.role === "TENANT").length
  const landlords = users.filter((u) => u.role === "LANDLORD").length
  const bannedUsers = users.filter((u) => u.activeStatus === "BANNED").length

  const totalProperties = properties.length
  const availableProps = properties.filter((p) => p.status === "AVAILABLE").length
  const rentedProps = properties.filter((p) => p.status === "RENTED").length

  const pendingRentals = rentals.filter((r) => r.status === "PENDING").length
  const activeRentals = rentals.filter((r) => r.status === "ACTIVE").length

  const totalRevenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0)

  const mainStats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: `${tenants} tenants · ${landlords} landlords`,
      href: "/admin-dashboard/users",
    },
    {
      label: "Total Properties",
      value: totalProperties,
      icon: Building2,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      trend: `${availableProps} available · ${rentedProps} rented`,
      href: "/admin-dashboard/properties",
    },
    {
      label: "Pending Requests",
      value: pendingRentals,
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      trend: `${activeRentals} active rentals`,
      href: "/admin-dashboard/rentals",
    },
    {
      label: "Platform Revenue",
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-500/10",
      trend: `${payments.filter((p) => p.status === "COMPLETED").length} transactions`,
      href: "/admin-dashboard/rentals",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Platform health overview and management
        </p>
      </div>

      {/* Hero Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white relative">
          <div className="absolute top-0 right-0 size-64 rounded-full bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Activity className="size-4 text-green-400 animate-pulse" />
                <span className="text-sm opacity-90">Platform Status</span>
              </div>
              <p className="text-4xl font-bold mb-1">All Systems Operational</p>
              <p className="text-sm opacity-70">
                {totalUsers} users · {totalProperties} properties ·{" "}
                {rentals.length} rentals
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur">
                <p className="text-2xl font-bold">{bannedUsers}</p>
                <p className="text-xs opacity-70">Banned</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur">
                <p className="text-2xl font-bold">{pendingRentals}</p>
                <p className="text-xs opacity-70">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mainStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="p-6 hover:shadow-lg hover:border-primary transition-all h-full">
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
            </Link>
          )
        })}
      </div>

      {/* Breakdown Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Breakdown */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="size-5 text-primary" />
            User Distribution
          </h2>
          <div className="space-y-3">
            <BreakdownRow
              label="Tenants"
              value={tenants}
              total={totalUsers}
              color="bg-blue-500"
            />
            <BreakdownRow
              label="Landlords"
              value={landlords}
              total={totalUsers}
              color="bg-purple-500"
            />
            <BreakdownRow
              label="Admins"
              value={users.filter((u) => u.role === "ADMIN").length}
              total={totalUsers}
              color="bg-slate-500"
            />
            <BreakdownRow
              label="Banned"
              value={bannedUsers}
              total={totalUsers}
              color="bg-red-500"
            />
          </div>
        </Card>

        {/* Property Breakdown */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Building2 className="size-5 text-primary" />
            Property Status
          </h2>
          <div className="space-y-3">
            <BreakdownRow
              label="Available"
              value={availableProps}
              total={totalProperties}
              color="bg-green-500"
            />
            <BreakdownRow
              label="Rented"
              value={rentedProps}
              total={totalProperties}
              color="bg-orange-500"
            />
            <BreakdownRow
              label="Pending"
              value={properties.filter((p) => p.status === "PENDING").length}
              total={totalProperties}
              color="bg-blue-500"
            />
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            Recent Rental Requests
          </h2>
          <Link
            href="/admin-dashboard/rentals"
            className="text-sm text-primary hover:underline"
          >
            View all →
          </Link>
        </div>

        {rentals.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No rental requests yet
          </p>
        ) : (
          <div className="space-y-2">
            {rentals.slice(0, 6).map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">
                    {r.property?.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {r.tenant?.name} → {r.property?.landlord?.name ?? "Landlord"}
                  </p>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {r.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

function BreakdownRow({
  label,
  value,
  total,
  color,
}: {
  label: string
  value: number
  total: number
  color: string
}) {
  const percent = total > 0 ? (value / total) * 100 : 0
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}