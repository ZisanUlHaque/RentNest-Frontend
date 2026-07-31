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
import { IRentalRequest } from "@/lib/types"
import { ProceedToPaymentButton } from "./ProceedToPaymentButton"
import { CheckCircle2, Inbox } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReviewFormDialog } from "./ReviewFormDialog"

type Props = {
  requests: IRentalRequest[]
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  APPROVED: "bg-green-100 text-green-700 border-green-200",
  REJECTED: "bg-red-100 text-red-700 border-red-200",
  ACTIVE: "bg-blue-100 text-blue-700 border-blue-200",
  COMPLETED: "bg-gray-100 text-gray-700 border-gray-200",
  PAYMENT_PENDING: "bg-orange-100 text-orange-700 border-orange-200",
}

export function TenantRequestsTable({ requests }: Props) {
  if (requests.length === 0) {
    return (
      <Card className="p-20 text-center">
        <Inbox className="mx-auto mb-3 size-12 text-muted-foreground" />
        <p className="text-lg font-semibold">No requests yet</p>
        <p className="mb-4 text-sm text-muted-foreground">
          Start exploring properties to submit a rental request
        </p>
        <Link href="/properties">
          <Button>Browse Properties</Button>
        </Link>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Property</TableHead>
            <TableHead>Move-in</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell>
                <Link
                  href={`/properties/${req.propertyId}`}
                  className="hover:underline"
                >
                  <p className="line-clamp-1 text-sm font-medium">
                    {req.property?.title}
                  </p>
                </Link>
                <p className="text-xs text-muted-foreground">
                  {req.property?.location}
                </p>
              </TableCell>
              <TableCell>
                <p className="text-sm">
                  {new Date(req.moveInDate).toLocaleDateString()}
                </p>
              </TableCell>
              <TableCell>
                <p className="text-sm">{req.durationMonths} months</p>
              </TableCell>
              <TableCell>
                <p className="text-sm font-semibold">
                  ৳
                  {(
                    (req.property?.rentPerMonth ?? 0) * req.durationMonths
                  ).toLocaleString()}
                </p>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={statusColors[req.status]}>
                  {req.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {/* Approve হয়েছে কিন্তু পেমেন্ট হয়নি */}
                {(req.status === "APPROVED" ||
                  req.status === "PAYMENT_PENDING") && (
                  <ProceedToPaymentButton rentalRequestId={req.id} />
                )}

                {/* ✅ ACTIVE বা COMPLETED - Review দেওয়া যাবে */}
                {(req.status === "ACTIVE" || req.status === "COMPLETED") &&
                  !req.review && (
                    <ReviewFormDialog
                      propertyId={req.propertyId}
                      rentalRequestId={req.id}
                    />
                  )}

                {/* অলরেডি রিভিউ দিয়ে দিয়েছে */}
                {req.review && (
                  <span className="flex items-center justify-end gap-1 text-xs text-green-600">
                    <CheckCircle2 className="size-3" />
                    Reviewed
                  </span>
                )}

                {/* বাকি স্ট্যাটাসের জন্য কোনো action নেই */}
                {(req.status === "PENDING" || req.status === "REJECTED") && (
                  <span className="text-xs text-muted-foreground">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
