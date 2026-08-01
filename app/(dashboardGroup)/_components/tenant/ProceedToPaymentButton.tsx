"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Loader2, RotateCcw } from "lucide-react"
import { toast } from "sonner"
import { createCheckoutSession } from "../../_actions/payment"
import { useRouter } from "next/navigation"

type Props = {
  rentalRequestId: string
  isRetry?: boolean
}

export function ProceedToPaymentButton({ rentalRequestId, isRetry }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handlePayment = () => {
    startTransition(async () => {
      const res = await createCheckoutSession(rentalRequestId)

      const checkoutUrl = res?.data?.url ?? res?.data?.paymentUrl

      if (res.success && checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        toast.error(res.message ?? "Failed to create checkout session")
        router.refresh() 
      }
    })
  }

  return (
    <Button
      size="sm"
      onClick={handlePayment}
      disabled={isPending}
      className={
        isRetry
          ? "bg-orange-600 hover:bg-orange-700"
          : "bg-green-600 hover:bg-green-700"
      }
    >
      {isPending ? (
        <>
          <Loader2 className="mr-1 size-3 animate-spin" />
          Loading...
        </>
      ) : isRetry ? (
        <>
          <RotateCcw className="mr-1 size-3" />
          Complete Payment
        </>
      ) : (
        <>
          <CreditCard className="mr-1 size-3" />
          Pay Now
        </>
      )}
    </Button>
  )
}