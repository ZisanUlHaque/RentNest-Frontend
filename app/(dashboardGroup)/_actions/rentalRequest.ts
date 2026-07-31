"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const RENTAL_API = `${process.env.BACKEND_API_URL}/api/rentals`

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

  const res = await fetch(RENTAL_API, {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (result.success) {
    revalidateTag("my-rental-requests","")
    revalidateTag("landlord-requests","")
  }

  return result
}

export const getMyRentalRequests = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "Not authenticated", data: [] }
  }

  const res = await fetch(RENTAL_API, {
    headers: { Cookie: `accessToken=${accessToken}` },
    next: {
      revalidate: 60,
      tags: ["my-rental-requests", "landlord-requests"],
    },
  })

  return res.json()
}

export const getRentalRequestById = async (id: string) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "Not authenticated" }
  }

  const res = await fetch(`${RENTAL_API}/${id}`, {
    headers: { Cookie: `accessToken=${accessToken}` },
    cache: "no-store",
  })

  return res.json()
}

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
    `${RENTAL_API}/landlord/requests/${requestId}`,
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
    revalidateTag("my-rental-requests","")
  }

  return result
}

export const adminGetAllRentals = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "Not authenticated", data: [] }
  }

  const res = await fetch(`${RENTAL_API}/admin/rentals`, {
    headers: { Cookie: `accessToken=${accessToken}` },
    next: {
      revalidate: 60,
      tags: ["admin-rentals"],
    },
  })

  return res.json()
}