"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { logout } from "@/service/logout";
import { useState, useEffect } from "react";
import { NavbarProps } from "@/lib/types";

// Navigation items configuration
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "News", href: "/news" },
  { label: "Premium", href: "/premium" },
];

// User menu items configuration
const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
];


export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === "/";
  const solid = !isHome || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll(); 
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUserMenuAction = async (action: string) => {

    if (action === "dashboard") {
      if (user.data.profile.role === "USER") {
        router.push("/dashboard")
      }
      else if (user.data.profile.role === "ADMIN") {
        router.push("/admin-dashboard")
      }
      else if (user.data.profile.role === "AUTHOR") {
        router.push("/author-dashboard")
      }

      return;

    }

    
    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/login");
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          solid
            ? "bg-white/95 backdrop-blur-md text-slate-900 border-gray-200 shadow-md"
            : "bg-transparent text-white border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-gradient-to-b from-[#1f6feb] via-[#3b82f6] to-[#60a5fa] flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">PP</span>
                </div>
                <span
                  className={`hidden font-bold text-lg sm:inline transition-colors ${
                    solid ? "text-primary" : "text-white"
                  }`}
                >
                  Prisma Press
                </span>
              </Link>
            </div>

            {/* Nav Links */}
            <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors text-sm font-medium ${
                    solid
                      ? "text-slate-600 hover:text-primary"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* User Dropdown / Login Button */}
            {user.success ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <div
                    className={`cursor-pointer p-2 rounded-full transition ${
                      solid ? "hover:bg-slate-100" : "hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        solid ? "bg-primary/10" : "bg-white/20"
                      }`}
                    >
                      <User
                        className={`w-4 h-4 ${
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
                        {user.data?.profile.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {user.data?.profile.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.action}
                        onClick={() => handleUserMenuAction(item.action)}
                        className="text-slate-700"
                      >
                        <Icon className="w-4 h-4 mr-2 text-slate-500" />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await handleUserMenuAction("logout");
                    }}
                    className="text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={"/login"}>
                <Button
                  variant={solid ? "default" : "outline"}
                  className={`h-9 cursor-pointer ${
                    solid
                      ? "bg-primary text-white hover:bg-primary/90 border-none"
                      : "bg-transparent text-white border-white hover:bg-white/10"
                  }`}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {!isHome && <div className="h-16" />}
    </>
  );
}