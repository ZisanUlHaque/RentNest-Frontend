"use server"

import { notFound } from "next/navigation"

export const getPropertyById = async (id: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    {
      cache: "no-store",
      next: { tags: ["property"] },
    }
  )

  if (!res.ok) {
    if (res.status === 404) notFound()
    throw new Error("Failed to fetch property")
  }

  const result = await res.json()
  return result.data // assuming your API returns { success: true, data: property }
}