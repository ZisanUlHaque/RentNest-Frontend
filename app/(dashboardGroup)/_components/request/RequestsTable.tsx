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
import { IRentalRequest } from "@/lib/types"
import { RequestActions } from "./RequestActions"
import { Card } from "@/components/ui/card"
import { Inbox } from "lucide-react"

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

export function RequestsTable({ requests }: Props) {
  if (requests.length === 0) {
    return (
      <Card className="p-20 text-center">
        <Inbox className="size-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-lg font-semibold">No requests yet</p>
        <p className="text-sm text-muted-foreground">
          Requests from tenants will appear here
        </p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Tenant</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Move-in</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage src={req.tenant?.profilePhoto ?? ""} />
                    <AvatarFallback>
                      {req.tenant?.name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{req.tenant?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {req.tenant?.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="font-medium text-sm line-clamp-1">
                  {req.property?.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  ৳{req.property?.rentPerMonth.toLocaleString()}/mo
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
                <Badge
                  variant="outline"
                  className={statusColors[req.status] ?? ""}
                >
                  {req.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <RequestActions request={req} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}