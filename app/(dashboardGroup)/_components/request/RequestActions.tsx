"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { updateRequestStatus } from "../../_actions/rentalRequest"
import { IRentalRequest } from "@/lib/types"

type Props = {
  request: IRentalRequest
}

export function RequestActions({ request }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleAction = (status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      const res = await updateRequestStatus(request.id, status)
      if (res.success) {
        toast.success(
          status === "APPROVED"
            ? "Request approved! Tenant can now proceed to payment."
            : "Request rejected"
        )
      } else {
        toast.error(res.message ?? "Something went wrong")
      }
    })
  }

  if (request.status !== "PENDING") {
    return (
      <span className="text-xs text-muted-foreground">No action needed</span>
    )
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleAction("APPROVED")}
        disabled={isPending}
        className="text-green-600 hover:bg-green-50 hover:text-green-700 border-green-200"
      >
        {isPending ? (
          <Loader2 className="size-3 animate-spin" />
        ) : (
          <>
            <Check className="mr-1 size-3" />
            Approve
          </>
        )}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleAction("REJECTED")}
        disabled={isPending}
        className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
      >
        <X className="mr-1 size-3" />
        Reject
      </Button>
    </div>
  )
}