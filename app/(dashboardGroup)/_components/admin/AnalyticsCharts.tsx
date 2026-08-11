
"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { IPayment, IProperty, IRentalRequest, IUser } from "@/lib/types"

export function RevenueChart({ payments }: { payments: IPayment[] }) {
  const completed = payments.filter((p) => p.status === "COMPLETED")

  const monthlyRevenue: Record<string, number> = {}
  completed.forEach((p) => {
    const month = new Date(p.createdAt).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    })
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + p.amount
  })

  const data =
    Object.entries(monthlyRevenue).length > 0
      ? Object.entries(monthlyRevenue).map(([month, revenue]) => ({
          month,
          revenue,
        }))
      : [
          { month: "Jan", revenue: 0 },
          { month: "Feb", revenue: 0 },
          { month: "Mar", revenue: 0 },
        ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="month"
          className="text-xs"
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis
          className="text-xs"
          stroke="hsl(var(--muted-foreground))"
          tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.75rem",
          }}
          formatter={(value: any, name?: any, props?: any) => {
            const amount = typeof value === "number" ? value : Number(value) || 0
            return [`৳${amount.toLocaleString()}`, "Revenue"]
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#10b981"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function UserRoleChart({ users }: { users: IUser[] }) {
  const data = [
    {
      name: "Tenants",
      value: users.filter((u) => u.role === "TENANT").length,
      color: "#3b82f6",
    },
    {
      name: "Landlords",
      value: users.filter((u) => u.role === "LANDLORD").length,
      color: "#a855f7",
    },
    {
      name: "Admins",
      value: users.filter((u) => u.role === "ADMIN").length,
      color: "#64748b",
    },
  ].filter((d) => d.value > 0)

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No user data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
          }
          outerRadius={100}
          innerRadius={40}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.75rem",
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value) => <span className="text-sm">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function PropertyStatusChart({
  properties,
}: {
  properties: IProperty[]
}) {
  const data = [
    {
      status: "Available",
      count: properties.filter((p) => p.status === "AVAILABLE").length,
      fill: "#10b981",
    },
    {
      status: "Rented",
      count: properties.filter((p) => p.status === "RENTED").length,
      fill: "#f97316",
    },
    {
      status: "Pending",
      count: properties.filter((p) => p.status === "PENDING").length,
      fill: "#3b82f6",
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="status"
          className="text-xs"
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.75rem",
          }}
          cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
        />
        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function RentalTrendChart({
  rentals,
}: {
  rentals: IRentalRequest[]
}) {
  const data = [
    {
      status: "Pending",
      count: rentals.filter((r) => r.status === "PENDING").length,
      fill: "#eab308",
    },
    {
      status: "Approved",
      count: rentals.filter((r) => r.status === "APPROVED").length,
      fill: "#22c55e",
    },
    {
      status: "Active",
      count: rentals.filter((r) => r.status === "ACTIVE").length,
      fill: "#3b82f6",
    },
    {
      status: "Completed",
      count: rentals.filter((r) => r.status === "COMPLETED").length,
      fill: "#64748b",
    },
    {
      status: "Rejected",
      count: rentals.filter((r) => r.status === "REJECTED").length,
      fill: "#ef4444",
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="status"
          className="text-xs"
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.75rem",
          }}
          cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
        />
        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function GrowthChart({
  users,
  properties,
}: {
  users: IUser[]
  properties: IProperty[]
}) {
  const monthly: Record<string, { users: number; properties: number }> = {}

  users.forEach((u) => {
    const month = new Date(u.createdAt).toLocaleDateString("en-US", {
      month: "short",
    })
    if (!monthly[month]) monthly[month] = { users: 0, properties: 0 }
    monthly[month].users += 1
  })

  properties.forEach((p) => {
    const month = new Date(p.createdAt).toLocaleDateString("en-US", {
      month: "short",
    })
    if (!monthly[month]) monthly[month] = { users: 0, properties: 0 }
    monthly[month].properties += 1
  })

  const data =
    Object.keys(monthly).length > 0
      ? Object.entries(monthly).map(([month, stats]) => ({
          month,
          ...stats,
        }))
      : [{ month: "Now", users: users.length, properties: properties.length }]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="month"
          className="text-xs"
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.75rem",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ fill: "#3b82f6", r: 5 }}
          name="New Users"
        />
        <Line
          type="monotone"
          dataKey="properties"
          stroke="#a855f7"
          strokeWidth={3}
          dot={{ fill: "#a855f7", r: 5 }}
          name="New Properties"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}