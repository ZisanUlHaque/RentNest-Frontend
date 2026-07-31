"use client"

import { Card } from "@/components/ui/card"
import { IProperty } from "@/lib/types"
import { Home, Building2 } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

type Props = {
  properties: IProperty[]
}

export function OccupancyGauge({ properties }: Props) {
  const total = properties.length
  const rented = properties.filter((p) => p.status === "RENTED").length
  const available = properties.filter((p) => p.status === "AVAILABLE").length
  const pending = properties.filter((p) => p.status === "PENDING").length

  const occupancyRate = total > 0 ? (rented / total) * 100 : 0

  const data = [
    { name: "Rented", value: rented, color: "#10b981" },
    { name: "Available", value: available, color: "#3b82f6" },
    { name: "Pending", value: pending, color: "#f59e0b" },
  ].filter((d) => d.value > 0)

  return (
    <Card className="p-6 h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Building2 className="size-5 text-primary" />
          Occupancy Rate
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Property distribution
        </p>
      </div>

      {/* Gauge Chart */}
      <div className="relative h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.length > 0 ? data : [{ name: "empty", value: 1, color: "#e5e7eb" }]}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={data.length > 1 ? 3 : 0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {(data.length > 0 ? data : [{ color: "#e5e7eb" }]).map(
                (entry, i) => (
                  <Cell key={i} fill={entry.color} />
                )
              )}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-3xl font-bold">{occupancyRate.toFixed(0)}%</p>
          <p className="text-xs text-muted-foreground">Occupancy</p>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 mt-4">
        <LegendItem color="#10b981" label="Rented" value={rented} total={total} />
        <LegendItem
          color="#3b82f6"
          label="Available"
          value={available}
          total={total}
        />
        <LegendItem
          color="#f59e0b"
          label="Pending"
          value={pending}
          total={total}
        />
      </div>

      {total === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          <Home className="size-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No properties yet</p>
        </div>
      )}
    </Card>
  )
}

function LegendItem({
  color,
  label,
  value,
  total,
}: {
  color: string
  label: string
  value: number
  total: number
}) {
  const percentage = total > 0 ? ((value / total) * 100).toFixed(0) : 0

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-sm" style={{ backgroundColor: color }} />
        <span className="text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">{value}</span>
        <span className="text-xs text-muted-foreground">({percentage}%)</span>
      </div>
    </div>
  )
}