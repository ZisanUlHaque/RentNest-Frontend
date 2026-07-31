"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

// ═══════ CREATE RENTAL REQUEST (Tenant) ═══════
export const createRentalRequest = async (payload: {
  propertyId: string
  moveInDate: string
  durationMonths: number
  message?: string | null
}) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "Please login to submit request" }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rental-requests`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )

  const result = await res.json()

  if (result.success) {
    revalidateTag("my-rental-requests", "")
    revalidateTag("landlord-requests", "")
  }

  return result
}

// ═══════ GET MY RENTAL REQUESTS (Tenant OR Landlord) ═══════
// Backend GET / returns different data based on role automatically
export const getMyRentalRequests = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "Not authenticated", data: [] }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rental-requests`,
    {
      headers: { Cookie: `accessToken=${accessToken}` },
      next: {
        revalidate: 60,
        tags: ["my-rental-requests", "landlord-requests"],
      },
    }
  )

  return res.json()
}

// ═══════ GET SINGLE RENTAL REQUEST ═══════
export const getRentalRequestById = async (id: string) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "Not authenticated" }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rental-requests/${id}`,
    {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    }
  )

  return res.json()
}

// ═══════ UPDATE REQUEST STATUS (Landlord: Approve/Reject) ═══════
export const updateRequestStatus = async (
  requestId: string,
  status: "APPROVED" | "REJECTED"
) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "Not authenticated" }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rental-requests/landlord/requests/${requestId}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  )

  const result = await res.json()

  if (result.success) {
    revalidateTag("landlord-requests", "")
    revalidateTag("my-rental-requests", "")
  }

  return result
}