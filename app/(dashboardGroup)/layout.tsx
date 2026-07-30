import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const DashboardLayout = async (
    {
        children
    } : {
        children: React.ReactNode
    }
) => {
   const user = await getMe();
  return (
        <div className="min-h-screen flex flex-col">
      <Navbar user={user} />

        <div className="flex flex-1">
          <main className="flex-1 min-w-0">{children}</main>
        </div>

    </div>
  )
}

export default DashboardLayout