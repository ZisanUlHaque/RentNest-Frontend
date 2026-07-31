import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { IRentalRequest } from "@/lib/types"
import { Activity, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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

export function RecentActivityFeed({ requests }: Props) {
  const recent = [...requests]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6)

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Activity className="size-5 text-primary" />
            Recent Activity
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Latest rental requests
          </p>
        </div>

        <Link href="/landlord-dashboard/requests">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-1 size-3" />
          </Button>
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Activity className="size-10 mx-auto mb-2 opacity-50" />
          <p>No activity yet</p>
        </div>
      ) : (
        <div className="space-y-1">
          {recent.map((req, index) => (
            <div key={req.id} className="relative">
              {/* Timeline connector */}
              {index !== recent.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-border" />
              )}

              <div className="flex gap-3 py-3">
                {/* Avatar */}
                <Avatar className="size-10 shrink-0 z-10 border-2 border-background">
                  <AvatarImage src={req.tenant?.profilePhoto ?? ""} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {req.tenant?.name?.[0]?.toUpperCase() ?? "T"}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium line-clamp-1">
                        {req.tenant?.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {req.property?.title}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2 py-0 h-5 shrink-0 ${
                        statusColors[req.status] ?? ""
                      }`}
                    >
                      {req.status}
                    </Badge>
                  </div>

                  <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="size-3" />
                    {new Date(req.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}