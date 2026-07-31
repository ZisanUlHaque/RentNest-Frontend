import { adminGetAllRentals, adminGetAllPayments } from "../../_actions/admin"
import { Card } from "@/components/ui/card"
import { IPayment, IRentalRequest } from "@/lib/types"
import { FileText, DollarSign, Clock, CheckCircle2 } from "lucide-react"
import { AdminRentalsTable } from "../../_components/admin/AdminRentalsTable"

const toArray = <T,>(res: unknown): T[] => {
  if (!res || typeof res !== "object" || !("data" in res)) return []

  const data = res.data
  if (Array.isArray(data)) return data as T[]

  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray(data.data)
  ) {
    return data.data as T[]
  }

  return []
}

export default async function AdminRentalsPage() {
  const [rentalsRes, paymentsRes] = await Promise.all([
    adminGetAllRentals(),
    adminGetAllPayments(),
  ])

  const rentals = toArray<IRentalRequest>(rentalsRes)
  const payments = toArray<IPayment>(paymentsRes)

  const revenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((s, p) => s + p.amount, 0)

  const stats = [
    {
      label: "Total Requests",
      value: rentals.length,
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Pending",
      value: rentals.filter((r) => r.status === "PENDING").length,
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      label: "Active",
      value: rentals.filter((r) => r.status === "ACTIVE").length,
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Total Revenue",
      value: `৳${revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Rental Requests</h1>
        <p className="text-muted-foreground mt-1">
          Monitor rental activity across the platform
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold mt-1">{s.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${s.bg}`}>
                  <Icon className={`size-5 ${s.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <AdminRentalsTable rentals={rentals} />
    </div>
  )
}