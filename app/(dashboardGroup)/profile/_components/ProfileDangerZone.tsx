"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle, Loader2, LogOut } from "lucide-react"
import { toast } from "sonner"
import { logout } from "@/service/logout"
import { useRouter } from "next/navigation"

export function ProfileDangerZone() {
  const router = useRouter()
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logout()
      toast.success("Logged out successfully")
      router.push("/login")
    } catch {
      toast.error("Failed to logout")
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 border-orange-200 bg-orange-50/50 dark:bg-orange-950/10 dark:border-orange-900/50">
      <div className="mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-orange-600">
          <AlertTriangle className="size-5" />
          Account Actions
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account session
        </p>
      </div>

      <div className="space-y-4">
        {/* Sign Out */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border bg-card">
          <div>
            <p className="font-semibold">Sign Out</p>
            <p className="text-sm text-muted-foreground">
              Log out of your account on this device
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setLogoutOpen(true)}
            className="text-orange-600 border-orange-200 hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-orange-950/30"
          >
            <LogOut className="mr-2 size-4" />
            Sign Out
          </Button>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-xl bg-muted/50 border">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Note:</strong> Account deletion is not currently available.
            To permanently delete your account, please contact support at{" "}
            <a
              href="mailto:support@rentnest.com"
              className="text-primary underline"
            >
              support@rentnest.com
            </a>
          </p>
        </div>
      </div>

      {/* Logout Confirmation */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Out?</DialogTitle>
            <DialogDescription>
              You will need to log in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setLogoutOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleLogout} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Signing out...
                </>
              ) : (
                <>
                  <LogOut className="mr-2 size-4" />
                  Sign Out
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}