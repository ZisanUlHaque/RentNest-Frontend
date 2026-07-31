"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

// ═══════ CREATE CHECKOUT SESSION ═══════
export const createCheckoutSession = async (rentalRequestId: string) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "Not authenticated" }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/create`, // ✅ /create
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rentalRequestId }),
    }
  )

  return res.json()
}

// ═══════ GET MY PAYMENTS ═══════
export const getMyPayments = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "Not authenticated", data: [] }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments`, // ✅ /
    {
      headers: { Cookie: `accessToken=${accessToken}` },
      next: {
        revalidate: 60,
        tags: ["my-payments"],
      },
    }
  )

  return res.json()
}

// ═══════ GET PAYMENT BY ID ═══════
export const getPaymentById = async (paymentId: string) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "Not authenticated" }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/${paymentId}`,
    {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    }
  )

  return res.json()
}

// ═══════ REFRESH PAYMENT DATA (after redirect) ═══════
// Since your backend uses webhook, no manual verify needed
// Just revalidate cache to get updated status
export const refreshPayments = async () => {
  revalidateTag("my-payments", "")
  revalidateTag("my-rental-requests", "")
  return { success: true }
}