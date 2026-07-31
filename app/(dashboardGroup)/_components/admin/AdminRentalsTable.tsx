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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IRentalRequest } from "@/lib/types"
import { Inbox, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type Props = {
  rentals: IRentalRequest[]
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  APPROVED: "bg-green-100 text-green-700 border-green-200",
  REJECTED: "bg-red-100 text-red-700 border-red-200",
  ACTIVE: "bg-blue-100 text-blue-700 border-blue-200",
  COMPLETED: "bg-gray-100 text-gray-700 border-gray-200",
  PAYMENT_PENDING: "bg-orange-100 text-orange-700 border-orange-200",
}

const FILTERS = [
  "ALL",
  "PENDING",
  "APPROVED",
  "PAYMENT_PENDING",
  "ACTIVE",
  "COMPLETED",
  "REJECTED",
]

export function AdminRentalsTable({ rentals }: Props) {
  const [filter, setFilter] = useState("ALL")

  const filtered =
    filter === "ALL" ? rentals : rentals.filter((r) => r.status === filter)

  if (rentals.length === 0) {
    return (
      <Card className="p-20 text-center">
        <Inbox className="size-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-lg font-semibold">No rental requests yet</p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      {/* Status Tabs */}
      <div className="flex gap-2 p-4 border-b overflow-x-auto">
        {FILTERS.map((f) => {
          const count =
            f === "ALL"
              ? rentals.length
              : rentals.filter((r) => r.status === f).length
          return (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="shrink-0"
            >
              {f.replace("_", " ")}
              <span className="ml-1.5 text-xs opacity-70">({count})</span>
            </Button>
          )
        })}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Property</TableHead>
              <TableHead>Tenant → Landlord</TableHead>
              <TableHead>Move-in</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <Link
                    href={`/properties/${r.propertyId}`}
                    target="_blank"
                    className="hover:underline"
                  >
                    <p className="font-medium text-sm truncate max-w-40">
                      {r.property?.title}
                    </p>
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {r.property?.location}
                  </p>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarImage src={r.tenant?.profilePhoto ?? ""} />
                      <AvatarFallback className="text-xs">
                        {r.tenant?.name?.[0]?.toUpperCase() ?? "T"}
                      </AvatarFallback>
                    </Avatar>
                    <ArrowRight className="size-3 text-muted-foreground" />
                    <Avatar className="size-7">
                      <AvatarImage
                        src={r.property?.landlord?.profilePhoto ?? ""}
                      />
                      <AvatarFallback className="text-xs">
                        {r.property?.landlord?.name?.[0]?.toUpperCase() ?? "L"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate max-w-40">
                    {r.tenant?.name} → {r.property?.landlord?.name ?? "—"}
                  </p>
                </TableCell>

                <TableCell>
                  <p className="text-sm">
                    {new Date(r.moveInDate).toLocaleDateString()}
                  </p>
                </TableCell>

                <TableCell>
                  <p className="text-sm">{r.durationMonths} mo</p>
                </TableCell>

                <TableCell>
                  <p className="font-semibold text-sm">
                    ৳
                    {(
                      (r.property?.rentPerMonth ?? 0) * r.durationMonths
                    ).toLocaleString()}
                  </p>
                </TableCell>

                <TableCell>
                  {r.payment ? (
                    <Badge
                      variant="outline"
                      className={
                        r.payment.status === "COMPLETED"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : r.payment.status === "FAILED"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "bg-yellow-100 text-yellow-700 border-yellow-200"
                      }
                    >
                      {r.payment.status}
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className={statusColors[r.status]}>
                    {r.status.replace("_", " ")}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center text-muted-foreground">
          <p>No requests with status &quot;{filter}&quot;</p>
        </div>
      )}
    </Card>
  )
}