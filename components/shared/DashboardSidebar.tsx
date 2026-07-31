"use client"

import { cn } from "@/lib/utils"
import { IRole } from "@/lib/types"
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  CreditCard,
  Star,
  Home,
  Settings,
  ChartBar,
  Shield,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type Props = {
  role: IRole
}

type MenuItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const menuConfig: Record<IRole, MenuItem[]> = {
  TENANT: [
    { label: "Overview", href: "/tenant-dashboard", icon: LayoutDashboard },
    { label: "My Requests", href: "/tenant-dashboard/requests", icon: FileText },
    { label: "Payments", href: "/tenant-dashboard/payments", icon: CreditCard },
    { label: "My Reviews", href: "/tenant-dashboard/reviews", icon: Star },
  ],
  LANDLORD: [
    { label: "Overview", href: "/landlord-dashboard", icon: LayoutDashboard },
    { label: "My Properties", href: "/landlord-dashboard/properties", icon: Building2 },
    { label: "Requests", href: "/landlord-dashboard/requests", icon: FileText },
    { label: "Earnings", href: "/landlord-dashboard/earnings", icon: CreditCard },
  ],
  ADMIN: [
    { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
    { label: "All Users", href: "/admin-dashboard/users", icon: Users },
    { label: "All Properties", href: "/admin-dashboard/properties", icon: Building2 },
    { label: "All Rentals", href: "/admin-dashboard/rentals", icon: FileText },
    { label: "Analytics", href: "/admin-dashboard/analytics", icon: ChartBar },
  ],
}

const bottomItems: MenuItem[] = [
  { label: "Browse Properties", href: "/properties", icon: Home },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function DashboardSidebar({ role }: Props) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = menuConfig[role] ?? []

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed top-20 left-4 z-40"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 top-16"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 bottom-0 w-64 bg-background border-r flex flex-col z-40 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Role Badge */}
        <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Dashboard</p>
              <p className="font-semibold text-sm capitalize">
                {role.toLowerCase()} Panel
              </p>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Main Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== `/${role.toLowerCase()}-dashboard` &&
                pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "size-4 transition-transform",
                    !isActive && "group-hover:scale-110"
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <div className="size-1.5 rounded-full bg-primary-foreground" />
                )}
              </Link>
            )
          })}

          {/* Divider */}
          <div className="my-6 border-t" />

          {/* Bottom Menu */}
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            General
          </p>
          {bottomItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4 group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Info Card */}
        <div className="p-4 border-t">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <p className="text-xs font-semibold text-primary mb-1">
              💡 Need Help?
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              Contact our support team anytime
            </p>
            <Link href="/contact">
              <Button size="sm" variant="outline" className="w-full text-xs">
                Get Support
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}