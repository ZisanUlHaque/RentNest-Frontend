"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const BASE = process.env.BACKEND_API_URL

export const updateProfile = async (payload: {
  name?: string
  phone?: string
  profilePhoto?: string
}) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "Not authenticated" }
  }

  try {
    const res = await fetch(`${BASE}/api/users/my-profile`, {
      method: "PUT",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    const result = await res.json()

    if (result.success) {
      revalidateTag("user-profile","max")
    }

    return result
  } catch (error) {
    // console.error("updateProfile error:", error)
    return {
      success: false,
      message: "Failed to update profile",
    }
  }
}