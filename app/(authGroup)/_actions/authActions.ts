"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginState = {
  success: true
  statusCode: number
  message: string
  data: {
    accessToken: string
    refreshToken: string
  }
}

type RegisterPayload = {
  name: string
  email: string
  password: string
  phone: string
  role: "TENANT" | "LANDLORD"
}

export const loginAction = async (
  prevState: LoginState,
  formData: FormData
) => {
  const email = formData.get("email")
  const password = formData.get("password")

  const payload = {
    email,
    password,
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (result.success) {
    const cookieStore = await cookies()

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    })
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    })

    redirect("/dashboard")
  }

  return result
}

export const registerAction = async (payload: RegisterPayload) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, role: payload.role }),
      }
    )

    const result = await res.json()
    return result
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    }
  }
}
