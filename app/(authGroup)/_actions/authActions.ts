"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from "jsonwebtoken" 


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

      const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
      
  

      if (decodedToken.role === 'TENANT') {
        redirect("/tenant-dashboard","replace")
      }
      if (decodedToken.role === 'LANDLORD') {
        redirect("/landlord-dashboard","replace")
      }
      if (decodedToken.role === 'ADMIN') {
        redirect("/admin-dashboard","replace")
      }

    }

  return result
}

export const registerAction = async (payload: RegisterPayload) => {
  let accessToken: string
  let refreshToken: string

  try {
    const registerRes = await fetch(
      `${process.env.BACKEND_API_URL}/api/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(payload),
      }
    )

    const registerResult = await registerRes.json()

    if (!registerRes.ok || !registerResult.success) {
      return {
        success: false,
        statusCode: registerResult.statusCode ?? registerRes.status,
        message: registerResult.message ?? "Registration failed",
      }
    }

    const loginRes = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      }
    )

    const loginResult = await loginRes.json()

    if (!loginRes.ok || !loginResult.success) {
      return {
        success: false,
        statusCode: loginResult.statusCode ?? loginRes.status,
        message:
          loginResult.message ??
          "Registration successful, but auto login failed",
      }
    }

    accessToken = loginResult.data.accessToken
    refreshToken = loginResult.data.refreshToken
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Registration failed",
    }
  }

  const cookieStore = await cookies()

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    path: "/",
  })

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    path: "/",
  })

  // 4. Decode role and redirect
  const decodedToken = jwt.decode(accessToken) as
    | (JwtPayload & {
        role?: "TENANT" | "LANDLORD" | "ADMIN"
      })
    | null

  if (decodedToken?.role === "TENANT") {
    redirect("/tenant-dashboard")
  }

  if (decodedToken?.role === "LANDLORD") {
    redirect("/landlord-dashboard")
  }

  if (decodedToken?.role === "ADMIN") {
    redirect("/admin-dashboard")
  }

  redirect("/")
}