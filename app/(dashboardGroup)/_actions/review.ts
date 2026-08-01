"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const createReview = async (payload: {
  propertyId: string
  rentalRequestId: string
  rating: number
  comment?: string | null
}) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "Not authenticated" }
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (result.success) {
    revalidateTag(`property-reviews-${payload.propertyId}`,"max")
    revalidateTag("my-reviews","max") // ✅ নতুন tag যোগ হলো
  }

  return result
}

// ✅ NEW: নিজের reviews আনার জন্য
export const getMyReviews = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, data: [] }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews/my-reviews`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      next: {
        tags: ["my-reviews"],
      },
    }
  )

  return res.json()
}

export const getReviewsByProperty = async (propertyId: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews/property/${propertyId}`,
    {
      next: {
        revalidate: 60 * 5,
        tags: [`property-reviews-${propertyId}`],
      },
    }
  )

  return res.json()
}