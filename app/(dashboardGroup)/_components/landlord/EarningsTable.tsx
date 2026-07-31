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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export function EarningsTable({ payments }: Props) {
  if (payments.length === 0) {
    return (
      <div className="text-center py-16">
        <CreditCard className="size-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-lg font-semibold">No payments yet</p>
        <p className="text-sm text-muted-foreground">
          Your rental income will appear here once tenants make payments
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Tenant</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={payment.tenant?.profilePhoto ?? ""}
                    />
                    <AvatarFallback>
                      {payment.tenant?.name?.[0]?.toUpperCase() ?? "T"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">
                      {payment.tenant?.name ?? "Unknown"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payment.tenant?.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="font-medium text-sm line-clamp-1">
                  {payment.rentalRequest?.property?.title ?? "N/A"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {payment.rentalRequest?.property?.location}
                </p>
              </TableCell>
              <TableCell>
                <p className="font-bold text-green-600">
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
                    ? new Date(payment.paidAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "-"}
                </p>
                {payment.paidAt && (
                  <p className="text-xs text-muted-foreground">
                    {new Date(payment.paidAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { icon: LucideIcon; className: string }> = {
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