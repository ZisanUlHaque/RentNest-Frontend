import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { XCircle, Home, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-orange-50 to-background">
      <Card className="max-w-lg w-full p-8 text-center space-y-6">
        {/* Cancel Icon */}
        <div className="mx-auto size-20 rounded-full bg-orange-100 flex items-center justify-center animate-in zoom-in duration-500">
          <XCircle className="size-12 text-orange-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-orange-600">
            Payment Cancelled
          </h1>
          <p className="text-muted-foreground">
            Your payment was cancelled. No amount has been charged.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-sm text-orange-700">
          <p>Don&apos;t worry! You can retry the payment anytime from your dashboard.</p>
        </div>

        <div className="space-y-2">
          <Link href="/tenant-dashboard/requests" className="block">
            <Button className="w-full" size="lg">
              <RotateCcw className="mr-2 size-4" />
              Retry Payment
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