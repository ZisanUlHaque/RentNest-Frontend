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
import { IUser } from "@/lib/types"
import { BanUserButton } from "./BanUserButton"
import { Users } from "lucide-react"
import { Pagination } from "./Pagination"

type Props = {
  users: IUser[]
  meta: { page: number; totalPages: number; total: number }
}

const roleColors: Record<string, string> = {
  TENANT: "bg-blue-100 text-blue-700 border-blue-200",
  LANDLORD: "bg-purple-100 text-purple-700 border-purple-200",
  ADMIN: "bg-slate-800 text-white border-slate-800",
}

export function UsersTable({ users, meta }: Props) {
  if (users.length === 0) {
    return (
      <Card className="p-20 text-center">
        <Users className="size-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-lg font-semibold">No users found</p>
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
              <TableHead>User</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage src={user.profilePhoto ?? ""} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {user.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <p className="text-sm">{user.phone ?? "-"}</p>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className={roleColors[user.role]}>
                    {user.role}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    {user.role === "LANDLORD" ? (
                      <p>{user._count?.properties ?? 0} properties</p>
                    ) : (
                      <p>{user._count?.rentalRequests ?? 0} requests</p>
                    )}
                    <p>{user._count?.reviews ?? 0} reviews</p>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.activeStatus === "ACTIVE"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-red-100 text-red-700 border-red-200"
                    }
                  >
                    {user.activeStatus}
                  </Badge>
                </TableCell>

                <TableCell>
                  <p className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </TableCell>

                <TableCell className="text-right">
                  {user.role === "ADMIN" ? (
                    <span className="text-xs text-muted-foreground">
                      Protected
                    </span>
                  ) : (
                    <BanUserButton
                      userId={user.id}
                      name={user.name}
                      currentStatus={user.activeStatus}
                    />
                  )}
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