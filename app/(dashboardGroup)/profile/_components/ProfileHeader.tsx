"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { IUser } from "@/lib/types"
import { Camera, Calendar, Mail, Phone } from "lucide-react"

type Props = {
  user: IUser
}

export function ProfileHeader({ user }: Props) {
  const roleColors: Record<string, string> = {
    TENANT: "bg-blue-500",
    LANDLORD: "bg-emerald-500",
    ADMIN: "bg-purple-500",
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border bg-card">
      {/* Cover Image */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-primary via-primary/80 to-primary/60 overflow-hidden">
        {/* Decorative blur circles */}
        <div className="absolute -top-16 -right-16 size-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 size-48 rounded-full bg-white/10 blur-2xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Profile Info Section */}
      <div className="px-6 sm:px-8 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 sm:-mt-16">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="size-28 sm:size-32 border-4 border-background shadow-xl">
              <AvatarImage src={user.profilePhoto ?? ""} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-3xl font-bold">
                {user.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Online indicator */}
            <div className="absolute bottom-2 right-2 size-4 rounded-full bg-emerald-500 border-2 border-background" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 sm:mb-3">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
              <Badge
                className={`${
                  roleColors[user.role] ?? "bg-gray-500"
                } text-white border-0`}
              >
                {user.role}
              </Badge>
              {user.activeStatus === "ACTIVE" ? (
                <Badge
                  variant="outline"
                  className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30"
                >
                  ✓ Active
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-red-600 border-red-200 bg-red-50 dark:bg-red-950/30"
                >
                  Banned
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground text-sm">
              Member since{" "}
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <ContactItem
            icon={<Mail className="size-4" />}
            label="Email"
            value={user.email}
          />
          <ContactItem
            icon={<Phone className="size-4" />}
            label="Phone"
            value={user.phone || "Not provided"}
          />
          <ContactItem
            icon={<Calendar className="size-4" />}
            label="Joined"
            value={new Date(user.createdAt).toLocaleDateString()}
          />
        </div>
      </div>
    </div>
  )
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  )
}