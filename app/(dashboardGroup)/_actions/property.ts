"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

type ActionState = {
  success: boolean
  message?: string
  data?: any
}

// ═══════ CREATE PROPERTY ═══════
export const createProperty = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const payload = {
    title: formData.get("title"),
    description: formData.get("description"),
    rentPerMonth: Number(formData.get("rentPerMonth")),
    location: formData.get("location"),
    categoryId: formData.get("categoryId"),
    amenities: (formData.get("amenities") as string)
      ?.split(",")
      .map((a) => a.trim())
      .filter(Boolean),
    images: (formData.get("images") as string)
      ?.split(",")
      .map((i) => i.trim())
      .filter(Boolean),
    status: formData.get("status") || "AVAILABLE",
  }

  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "User not logged in!" }
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties`, {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (result.success) {
    revalidateTag("my-properties", "")
    revalidateTag("property", "")
  }

  return result
}

// ═══════ UPDATE PROPERTY ═══════
export const updateProperty = async (
  propertyId: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const payload = {
    title: formData.get("title"),
    description: formData.get("description"),
    rentPerMonth: Number(formData.get("rentPerMonth")),
    location: formData.get("location"),
    categoryId: formData.get("categoryId"),
    amenities: (formData.get("amenities") as string)
      ?.split(",")
      .map((a) => a.trim())
      .filter(Boolean),
    images: (formData.get("images") as string)
      ?.split(",")
      .map((i) => i.trim())
      .filter(Boolean),
    status: formData.get("status"),
  }

  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "User not logged in!" }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${propertyId}`,
    {
      method: "PUT",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )

  const result = await res.json()

  if (result.success) {
    revalidateTag("my-properties", "")
    revalidateTag("property", "")
  }

  return result
}

// ═══════ DELETE PROPERTY ═══════
export const deleteProperty = async (propertyId: string) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "User not logged in!" }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${propertyId}`,
    {
      method: "DELETE",
      headers: { Cookie: `accessToken=${accessToken}` },
    }
  )

  const result = await res.json()

  if (result.success) {
    revalidateTag("my-properties","")
    revalidateTag("property","")
  }

  return result
}

// ═══════ GET MY PROPERTIES ═══════
export const getMyProperties = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return { success: false, message: "User not logged in!", data: [] }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/landlord/my-properties`,
    {
      headers: { Cookie: `accessToken=${accessToken}` },
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["my-properties"],
      },
    }
  )

  return res.json()
}