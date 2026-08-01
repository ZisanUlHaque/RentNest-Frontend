"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Home as HomeIcon,
  Building2,
  Star,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { logout } from "@/service/logout";
import { useState, useEffect } from "react";
import { IRole, NavbarProps } from "@/lib/types";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Property", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const mobileNavItems = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Property", href: "/properties", icon: Building2 },
  { label: "Services", href: "/services", icon: Star },
  { label: "Contact", href: "/contact", icon: Phone },
];

const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
] as const;

const dashboardRoutes: Record<IRole, string> = {
  TENANT: "/tenant-dashboard",
  LANDLORD: "/landlord-dashboard",
  ADMIN: "/admin-dashboard",
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === "/";
  const solid = !isHome || isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUserMenuAction = async (action: string) => {
    if (!user?.success) return;

    const role = user.data.profile.role;

    switch (action) {
      case "dashboard":
        router.push(dashboardRoutes[role] ?? "/dashboard");
        break;
      case "profile":
        router.push("/profile");
        break;
      case "settings":
        router.push("/settings");
        break;
      case "logout":
        await logout();
        toast.success("User Logged Out Successfully!");
        router.push("/login");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300 ${
          solid
            ? "border-gray-200 bg-white/95 text-slate-900 shadow-md backdrop-blur-md"
            : "border-transparent bg-transparent text-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="size-12 overflow-hidden rounded-lg">
                  <Image
                    src="/logo.png"
                    alt="RentNest Logo"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <span
                  className={`hidden text-lg font-bold transition-colors sm:inline ${
                    solid ? "text-primary" : "text-white"
                  }`}
                >
                  RentNest
                </span>
              </Link>
            </div>

            <div className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:transform md:items-center md:gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      solid
                        ? isActive
                          ? "text-primary"
                          : "text-slate-600 hover:text-primary"
                        : isActive
                          ? "text-white"
                          : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* User Dropdown / Login Button */}
            {user?.success ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <div
                    className={`cursor-pointer rounded-full p-2 transition ${
                      solid ? "hover:bg-slate-100" : "hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        solid ? "bg-primary/10" : "bg-white/20"
                      }`}
                    >
                      <User
                        className={`h-4 w-4 ${
                          solid ? "text-primary" : "text-white"
                        }`}
                      />
                    </div>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 border-gray-200 shadow-lg"
                >
                  <DropdownMenuLabel className="font-normal text-slate-900">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">
                        {user.data.profile.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {user.data.profile.email}
                      </p>
                      <span className="mt-1 inline-block w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        {user.data.profile.role}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.action}
                        onClick={() => handleUserMenuAction(item.action)}
                        className="cursor-pointer text-slate-700"
                      >
                        <Icon className="mr-2 h-4 w-4 text-slate-500" />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleUserMenuAction("logout")}
                    className="cursor-pointer text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant={solid ? "default" : "outline"}
                  className={`h-9 cursor-pointer ${
                    solid
                      ? "border-none bg-primary text-white hover:bg-primary/90"
                      : "border-white bg-transparent text-white hover:bg-white/10"
                  }`}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="flex items-center justify-around bg-black/85 backdrop-blur-lg rounded-2xl px-2 py-2.5 shadow-2xl border border-gray-800">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? "text-yellow-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* Account/Login */}
          {user?.success ? (
            <button
              onClick={() => handleUserMenuAction("dashboard")}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
                pathname.includes("dashboard")
                  ? "text-yellow-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <User
                size={20}
                strokeWidth={pathname.includes("dashboard") ? 2.5 : 2}
              />
              <span className="text-[10px] font-medium">Account</span>
            </button>
          ) : (
            <Link
              href="/login"
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
                pathname === "/login"
                  ? "text-yellow-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <User
                size={20}
                strokeWidth={pathname === "/login" ? 2.5 : 2}
              />
              <span className="text-[10px] font-medium">Login</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Non-home pages spacing */}
      {!isHome && <div className="h-16" />}
    </>
  );
}