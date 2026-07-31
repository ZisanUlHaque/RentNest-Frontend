"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { IPayment } from "@/lib/types"
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  type LucideIcon,
} from "lucide-react"

type Props = {
  payments: IPayment[]
}

export function PaymentsTable({ payments }: Props) {
  if (payments.length === 0) {
    return (
      <Card className="p-20 text-center">
        <CreditCard className="size-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-lg font-semibold">No payments yet</p>
        <p className="text-sm text-muted-foreground">
          Your payment history will appear here
        </p>
      </Card>
    )
  }

  const totalPaid = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-4">
      {/* Summary */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Paid</p>
            <p className="text-3xl font-bold text-primary">
              ৳{totalPaid.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-primary/10">
            <CreditCard className="size-8 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Property</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Transaction ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <p className="font-medium text-sm line-clamp-1">
                    {payment.rentalRequest?.property?.title ?? "N/A"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.rentalRequest?.property?.location}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-bold">
                    ৳{payment.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase">
                    {payment.currency}
                  </p>
                </TableCell>
                <TableCell>
                  <StatusBadge status={payment.status} />
                </TableCell>
                <TableCell>
                  <p className="text-sm">
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString()
                      : "-"}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-xs font-mono text-muted-foreground truncate max-w-32">
                    {payment.stripePaymentIntentId ?? "-"}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<
    string,
    { icon: LucideIcon; className: string }
  > = {
    COMPLETED: {
      icon: CheckCircle2,
      className: "bg-green-100 text-green-700 border-green-200",
    },
    PENDING: {
      icon: Clock,
      className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    FAILED: {
      icon: XCircle,
      className: "bg-red-100 text-red-700 border-red-200",
    },
  }

  const { icon: Icon, className } = config[status] ?? config.PENDING

  return (
    <Badge variant="outline" className={`gap-1 ${className}`}>
      <Icon className="size-3" />
      {status}
    </Badge>
  )
}