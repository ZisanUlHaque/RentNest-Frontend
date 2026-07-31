"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const BASE = process.env.BACKEND_API_URL

const getToken = async () => {
  const cookieStore = await cookies()
  return cookieStore.get("accessToken")?.value
}

export const adminGetAllUsers = async (query?: {
  searchTerm?: string
  role?: string
  activeStatus?: string
  page?: string
  limit?: string
}) => {
  const token = await getToken()
  if (!token) return { success: false, message: "Not authenticated", data: [] }

  const params = new URLSearchParams()
  if (query?.searchTerm) params.set("searchTerm", query.searchTerm)
  if (query?.role && query.role !== "all") params.set("role", query.role)
  if (query?.activeStatus && query.activeStatus !== "all")
    params.set("activeStatus", query.activeStatus)
  params.set("page", query?.page ?? "1")
  params.set("limit", query?.limit ?? "10")

  const res = await fetch(`${BASE}/api/admin/all-users?${params.toString()}`, {
    headers: { Cookie: `accessToken=${token}` },
    cache: "no-store",
  })

  return res.json()
}

export const adminToggleUserStatus = async (
  userId: string,
  activeStatus: "ACTIVE" | "BANNED"
) => {
  const token = await getToken()
  if (!token) return { success: false, message: "Not authenticated" }

  const res = await fetch(`${BASE}/api/admin/users/${userId}`, {
    method: "PATCH",
    headers: {
      Cookie: `accessToken=${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ activeStatus }),
  })

  const result = await res.json()
  if (result.success) revalidateTag("admin-users","max")
  return result
}

export const adminGetAllProperties = async (query?: {
  searchTerm?: string
  status?: string
  page?: string
}) => {
  const token = await getToken()
  if (!token) return { success: false, message: "Not authenticated", data: [] }

  const params = new URLSearchParams()
  if (query?.searchTerm) params.set("searchTerm", query.searchTerm)
  if (query?.status && query.status !== "all") params.set("status", query.status)
  params.set("page", query?.page ?? "1")
  params.set("limit", "12")

  const res = await fetch(`${BASE}/api/properties/admin/all?${params.toString()}`, {
    headers: { Cookie: `accessToken=${token}` },
    cache: "no-store",
  })

  return res.json()
}

export const adminGetAllRentals = async () => {
  const token = await getToken()
  if (!token) return { success: false, message: "Not authenticated", data: [] }

  const res = await fetch(`${BASE}/api/rentals/admin/rentals`, {
    headers: { Cookie: `accessToken=${token}` },
    cache: "no-store",
  })

  return res.json()
}

export const adminGetAllPayments = async () => {
  const token = await getToken()
  if (!token) return { success: false, message: "Not authenticated", data: [] }

  const res = await fetch(`${BASE}/api/payments`, {
    headers: { Cookie: `accessToken=${token}` },
    cache: "no-store",
  })

  return res.json()
}