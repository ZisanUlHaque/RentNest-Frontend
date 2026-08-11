
"use client"

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { IPayment, IProperty, IRentalRequest } from "@/lib/types"

export function EarningsAreaChart({ payments }: { payments: IPayment[] }) {
  const completed = payments.filter((p) => p.status === "COMPLETED")

  const monthly: Record<string, number> = {}
  completed.forEach((p) => {
    const date = p.paidAt ? new Date(p.paidAt) : new Date(p.createdAt)
    const month = date.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    })
    monthly[month] = (monthly[month] || 0) + p.amount
  })

  const data =
    Object.entries(monthly).length > 0
      ? Object.entries(monthly).map(([month, revenue]) => ({
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
          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
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
          formatter={(value) => {
            if (typeof value === 'number') {
              return [`৳${value.toLocaleString()}`, "Revenue"];
            }
            return ["", "Revenue"];
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#10b981"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorEarnings)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function PropertyStatusPieChart({
  properties,
}: {
  properties: IProperty[]
}) {
  const data = [
    {
      name: "Available",
      value: properties.filter((p) => p.status === "AVAILABLE").length,
      color: "#10b981",
    },
    {
      name: "Rented",
      value: properties.filter((p) => p.status === "RENTED").length,
      color: "#f97316",
    },
    {
      name: "Pending",
      value: properties.filter((p) => p.status === "PENDING").length,
      color: "#3b82f6",
    },
  ].filter((d) => d.value > 0)

  if (data.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center text-muted-foreground text-sm">
        No property data yet
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
          }
          outerRadius={90}
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
          iconType="circle"
          formatter={(value) => <span className="text-xs">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function RequestStatusBarChart({
  requests,
}: {
  requests: IRentalRequest[]
}) {
  const data = [
    {
      status: "Pending",
      count: requests.filter((r) => r.status === "PENDING").length,
      fill: "#eab308",
    },
    {
      status: "Approved",
      count: requests.filter((r) => r.status === "APPROVED").length,
      fill: "#22c55e",
    },
    {
      status: "Active",
      count: requests.filter((r) => r.status === "ACTIVE").length,
      fill: "#3b82f6",
    },
    {
      status: "Completed",
      count: requests.filter((r) => r.status === "COMPLETED").length,
      fill: "#64748b",
    },
    {
      status: "Rejected",
      count: requests.filter((r) => r.status === "REJECTED").length,
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

export function MonthlyRentalTrendChart({
  requests,
}: {
  requests: IRentalRequest[]
}) {
  const monthly: Record<string, number> = {}

  requests.forEach((r) => {
    const month = new Date(r.createdAt).toLocaleDateString("en-US", {
      month: "short",
    })
    monthly[month] = (monthly[month] || 0) + 1
  })

  const data =
    Object.entries(monthly).length > 0
      ? Object.entries(monthly).map(([month, count]) => ({
          month,
          requests: count,
        }))
      : [
          { month: "Jan", requests: 0 },
          { month: "Feb", requests: 0 },
          { month: "Mar", requests: 0 },
        ]

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
        <Line
          type="monotone"
          dataKey="requests"
          stroke="#f97316"
          strokeWidth={3}
          dot={{ fill: "#f97316", r: 5 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function TopPropertiesChart({
  properties,
  payments,
}: {
  properties: IProperty[]
  payments: IPayment[]
}) {
  const propertyRevenue: Record<string, number> = {}
  payments
    .filter((p) => p.status === "COMPLETED")
    .forEach((p) => {
      const propId = p.rentalRequest?.propertyId
      if (propId) {
        propertyRevenue[propId] = (propertyRevenue[propId] || 0) + p.amount
      }
    })

  const data = properties
    .map((p) => ({
      name: p.title.length > 20 ? p.title.substring(0, 20) + "..." : p.title,
      revenue: propertyRevenue[p.id] || 0,
      requests: p._count?.rentalRequests || 0,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  if (data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-muted-foreground text-sm">
        No property data yet
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          type="number"
          className="text-xs"
          stroke="hsl(var(--muted-foreground))"
          tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
        />
        <YAxis
          dataKey="name"
          type="category"
          className="text-xs"
          stroke="hsl(var(--muted-foreground))"
          width={140}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.75rem",
          }}
          formatter={(value, name) => {
            const revenueValue = typeof value === "number" ? value : Number(value || 0)
            if (name === "revenue")
              return [`৳${revenueValue.toLocaleString()}`, "Revenue"]
            return [value, name]
          }}
        />
        <Bar dataKey="revenue" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}