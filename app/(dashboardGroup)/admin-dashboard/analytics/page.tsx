
import { Card } from "@/components/ui/card"
import {
  adminGetAllUsers,
  adminGetAllProperties,
  adminGetAllRentals,
  adminGetAllPayments,
} from "../../_actions/admin"
import { IPayment, IProperty, IRentalRequest, IUser } from "@/lib/types"
import {
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Activity,
  LineChart as LineChartIcon,
} from "lucide-react"
import {
  RevenueChart,
  UserRoleChart,
  PropertyStatusChart,
  RentalTrendChart,
  GrowthChart,
} from "../../_components/admin/AnalyticsCharts"

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

export default async function AdminAnalyticsPage() {
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Detailed insights and platform metrics
        </p>
      </div>

      {/* Row 1: Revenue + User Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="size-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="size-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Revenue Trend</h2>
              <p className="text-xs text-muted-foreground">
                Monthly income overview
              </p>
            </div>
          </div>
          <RevenueChart payments={payments} />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <PieChartIcon className="size-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">User Distribution</h2>
              <p className="text-xs text-muted-foreground">
                Users by role type
              </p>
            </div>
          </div>
          <UserRoleChart users={users} />
        </Card>
      </div>

      {/* Row 2: Property Status + Rentals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <BarChart3 className="size-5 text-purple-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Property Status</h2>
              <p className="text-xs text-muted-foreground">
                Available vs Rented properties
              </p>
            </div>
          </div>
          <PropertyStatusChart properties={properties} />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="size-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Activity className="size-5 text-orange-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Rental Requests</h2>
              <p className="text-xs text-muted-foreground">
                Status breakdown of all requests
              </p>
            </div>
          </div>
          <RentalTrendChart rentals={rentals} />
        </Card>
      </div>

      {/* Row 3: Growth Chart Full Width */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="size-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <LineChartIcon className="size-5 text-indigo-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Platform Growth</h2>
            <p className="text-xs text-muted-foreground">
              User and property registration over time
            </p>
          </div>
        </div>
        <GrowthChart users={users} properties={properties} />
      </Card>
    </div>
  )
}