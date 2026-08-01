import { getMe } from "@/service/getMe"
import { redirect } from "next/navigation"
import { ProfileHeader } from "./_components/ProfileHeader"
import { ProfileStats } from "./_components/ProfileStats"
import { ProfileInfoForm } from "./_components/ProfileInfoForm"
import { ProfileDangerZone } from "./_components/ProfileDangerZone"
import { getMyProperties } from "../_actions/property"
import { getMyRentalRequests } from "../_actions/rentalRequest"
import { getMyPayments } from "../_actions/payment"

export default async function ProfilePage() {
  const user = await getMe()

  if (!user?.success) {
    redirect("/login")
  }

  const profile = user.data.profile

  const [propertiesRes, rentalsRes, paymentsRes] = await Promise.all([
    profile.role === "LANDLORD"
      ? getMyProperties().catch(() => ({ data: [] }))
      : Promise.resolve({ data: [] }),
    getMyRentalRequests().catch(() => ({ data: [] })),
    getMyPayments().catch(() => ({ data: [] })),
  ])

  return (
    <div className="space-y-8 pb-12">
      {/* Header with cover */}
      <ProfileHeader user={profile} />

      {/* Stats Grid */}
      <ProfileStats
        user={profile}
        properties={propertiesRes?.data ?? []}
        rentals={rentalsRes?.data ?? []}
        payments={paymentsRes?.data ?? []}
      />

      {/* Grid: Info + Security */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfileInfoForm user={profile} />
          <ProfileDangerZone />
        </div>
      </div>
    </div>
  )
}