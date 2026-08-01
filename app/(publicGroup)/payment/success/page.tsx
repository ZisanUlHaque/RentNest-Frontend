"use client" 

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Home, Receipt } from "lucide-react"
import Link from "next/link"
import { refreshPayments } from "@/app/(dashboardGroup)/_actions/payment"

export default function PaymentSuccessPage() {
  
  useEffect(() => {
    const clearCache = async () => {
      await refreshPayments()
    }
    clearCache()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-green-50 to-background">
      <Card className="max-w-lg w-full p-8 text-center space-y-6">
        <div className="mx-auto size-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="size-12 text-green-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-green-600">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground">
            Your rental payment has been processed successfully.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700">
          <p className="font-medium">
            🎉 Your rental is now active!
          </p>
        </div>

        <div className="space-y-2">
          <Link href="/tenant-dashboard/payments" className="block">
            <Button className="w-full" size="lg">
              <Receipt className="mr-2 size-4" />
              View Payment History
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 size-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}