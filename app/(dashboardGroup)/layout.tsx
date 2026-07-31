import { Navbar } from "@/components/shared/navbar"
import { getMe } from "@/service/getMe"
import { DashboardSidebar } from "@/components/shared/DashboardSidebar"
import { redirect } from "next/navigation"

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const user = await getMe()

  if (!user?.success) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Navbar */}
      <Navbar user={user} />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <DashboardSidebar role={user.data.profile.role} />

        {/* Content Area */}
        <main className="flex-1 min-w-0 lg:ml-64 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout