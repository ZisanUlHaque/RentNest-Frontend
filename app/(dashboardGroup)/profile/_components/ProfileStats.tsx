import { Card } from "@/components/ui/card"
import { IUser, IProperty, IRentalRequest, IPayment } from "@/lib/types"
import { Building2, FileText, CreditCard, Star, TrendingUp } from "lucide-react"

type Props = {
  user: IUser
  properties: IProperty[]
  rentals: IRentalRequest[]
  payments: IPayment[]
}

export function ProfileStats({ user, properties, rentals, payments }: Props) {
  const totalMoney = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + Number(p.amount ?? 0), 0)

  const stats =
    user.role === "LANDLORD"
      ? [
          {
            label: "Total Properties",
            value: properties.length,
            icon: Building2,
            color: "text-blue-600",
            bg: "bg-blue-500/10",
          },
          {
            label: "Active Rentals",
            value: rentals.filter((r) => r.status === "ACTIVE").length,
            icon: FileText,
            color: "text-emerald-600",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Total Earnings",
            value: `৳${totalMoney.toLocaleString()}`,
            icon: CreditCard,
            color: "text-purple-600",
            bg: "bg-purple-500/10",
          },
          {
            label: "Requests",
            value: rentals.length,
            icon: Star,
            color: "text-amber-600",
            bg: "bg-amber-500/10",
          },
        ]
      : user.role === "TENANT"
      ? [
          {
            label: "My Requests",
            value: rentals.length,
            icon: FileText,
            color: "text-blue-600",
            bg: "bg-blue-500/10",
          },
          {
            label: "Active Rentals",
            value: rentals.filter((r) => r.status === "ACTIVE").length,
            icon: Building2,
            color: "text-emerald-600",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Total Spent",
            value: `৳${totalMoney.toLocaleString()}`,
            icon: CreditCard,
            color: "text-purple-600",
            bg: "bg-purple-500/10",
          },
          {
            label: "Reviews Given",
            value: rentals.filter((r) => r.review).length,
            icon: Star,
            color: "text-amber-600",
            bg: "bg-amber-500/10",
          },
        ]
      : [
          {
            label: "Role",
            value: "Admin",
            icon: Star,
            color: "text-purple-600",
            bg: "bg-purple-500/10",
          },
          {
            label: "Access Level",
            value: "Full",
            icon: TrendingUp,
            color: "text-emerald-600",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Active Since",
            value: new Date(user.createdAt).getFullYear(),
            icon: Calendar,
            color: "text-blue-600",
            bg: "bg-blue-500/10",
          },
          {
            label: "Status",
            value: user.activeStatus,
            icon: FileText,
            color: "text-amber-600",
            bg: "bg-amber-500/10",
          },
        ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <Icon className={`size-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold truncate">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </Card>
        )
      })}
    </div>
  )
}

// Fix: Calendar import
import { Calendar } from "lucide-react"