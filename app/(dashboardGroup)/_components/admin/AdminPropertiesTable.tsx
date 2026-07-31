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
import { Button } from "@/components/ui/button"
import { IProperty } from "@/lib/types"
import { Building2, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Pagination } from "./Pagination"

type Props = {
  properties: IProperty[]
  meta: { page: number; totalPages: number; total: number }
}

const statusColors: Record<string, string> = {
  AVAILABLE: "bg-green-100 text-green-700 border-green-200",
  PENDING: "bg-blue-100 text-blue-700 border-blue-200",
  RENTED: "bg-orange-100 text-orange-700 border-orange-200",
}

export function AdminPropertiesTable({ properties, meta }: Props) {
  if (properties.length === 0) {
    return (
      <Card className="p-20 text-center">
        <Building2 className="size-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-lg font-semibold">No properties found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Property</TableHead>
              <TableHead>Landlord</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Listed</TableHead>
              <TableHead className="text-right">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 rounded-lg overflow-hidden bg-muted shrink-0">
                      {p.images?.[0] && (
                        <Image
                          src={p.images[0]}
                          alt={p.title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate max-w-48">
                        {p.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {p.location}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarImage src={p.landlord?.profilePhoto ?? ""} />
                      <AvatarFallback className="text-xs">
                        {p.landlord?.name?.[0]?.toUpperCase() ?? "L"}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm truncate max-w-32">
                      {p.landlord?.name ?? "Unknown"}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <p className="font-semibold text-sm">
                    ৳{p.rentPerMonth.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </TableCell>

                <TableCell>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <p>{p._count?.rentalRequests ?? 0} requests</p>
                    <p>{p._count?.reviews ?? 0} reviews</p>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className={statusColors[p.status]}>
                    {p.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <p className="text-sm">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </TableCell>

                <TableCell className="text-right">
                  <Link href={`/properties/${p.id}`} target="_blank">
                    <Button variant="ghost" size="sm">
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {meta.totalPages > 1 && (
        <div className="p-4 border-t">
          <Pagination page={meta.page} totalPages={meta.totalPages} />
        </div>
      )}
    </Card>
  )
}