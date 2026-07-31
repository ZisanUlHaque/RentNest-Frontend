"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Ban, CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { adminToggleUserStatus } from "../../_actions/admin"
import { IActiveStatus } from "@/lib/types"
import { useRouter } from "next/navigation"

type Props = {
  userId: string
  name: string
  currentStatus: IActiveStatus
}

export function BanUserButton({ userId, name, currentStatus }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const isBanned = currentStatus === "BANNED"
  const nextStatus: IActiveStatus = isBanned ? "ACTIVE" : "BANNED"

  const handleToggle = () => {
    startTransition(async () => {
      const res = await adminToggleUserStatus(userId, nextStatus)

      if (res.success) {
        toast.success(
          isBanned
            ? `${name} has been unbanned`
            : `${name} has been banned from the platform`
        )
        setOpen(false)
        router.refresh()
      } else {
        toast.error(res.message ?? "Action failed")
      }
    })
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setOpen(true)}
        className={
          isBanned
            ? "text-green-600 hover:bg-green-50 hover:text-green-700 border-green-200"
            : "text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
        }
      >
        {isBanned ? (
          <>
            <CheckCircle2 className="mr-1 size-3" />
            Unban
          </>
        ) : (
          <>
            <Ban className="mr-1 size-3" />
            Ban
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isBanned ? "Unban User?" : "Ban User?"}
            </DialogTitle>
            <DialogDescription>
              {isBanned ? (
                <>
                  <strong>{name}</strong> will regain full access to the
                  platform.
                </>
              ) : (
                <>
                  <strong>{name}</strong> will lose access to the platform
                  immediately. They won&apos;t be able to log in or perform any
                  actions.
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant={isBanned ? "default" : "destructive"}
              onClick={handleToggle}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Processing...
                </>
              ) : isBanned ? (
                "Yes, Unban"
              ) : (
                "Yes, Ban User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}