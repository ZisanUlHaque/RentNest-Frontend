"use client"

import { Card } from "@/components/ui/card"
import { IPayment } from "@/lib/types"
import { TrendingUp } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type Props = {
  payments: IPayment[]
}

export function EarningsChart({ payments }: Props) {
  // ═══ Build last 6 months data ═══
  const now = new Date()
  const months: { month: string; earnings: number; count: number }[] = []

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthLabel = date.toLocaleDateString("en-US", { month: "short" })

    const monthPayments = payments.filter((p) => {
      if (p.status !== "COMPLETED" || !p.paidAt) return false
      const paidDate = new Date(p.paidAt)
      return (
        paidDate.getMonth() === date.getMonth() &&
        paidDate.getFullYear() === date.getFullYear()
      )
    })

    const earnings = monthPayments.reduce(
      (sum, p) => sum + Number(p.amount ?? 0),
      0
    )

    months.push({
      month: monthLabel,
      earnings,
      count: monthPayments.length,
    })
  }

  const totalEarnings = months.reduce((sum, m) => sum + m.earnings, 0)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="size-5 text-primary" />
            Earnings Overview
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Last 6 months revenue trend
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">
            ৳{totalEarnings.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Total earned</p>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={months}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              formatter={(value) => [
                `৳${Number(value ?? 0).toLocaleString()}`,
                "Earnings",
              ]}
            />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#earningsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}