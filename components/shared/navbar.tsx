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
  User,
  Home as HomeIcon,
  Building2,
  Star,
  Phone,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { logout } from "@/service/logout";
import { useEffect, useState, useSyncExternalStore } from "react";
import { IRole, NavbarProps } from "@/lib/types";
import Image from "next/image";
import { useTheme } from "next-themes";

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
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300 ${
          solid
            ? "border-border bg-background/95 text-foreground shadow-md backdrop-blur-md"
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

            {/* Desktop Nav Links */}
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
                          : "text-muted-foreground hover:text-primary"
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

            {/* Right Side: Theme Toggle + User */}
            <div className="flex items-center gap-2">
              {/* ✅ THEME TOGGLE BUTTON */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className={`relative flex size-9 cursor-pointer items-center justify-center rounded-full transition ${
                    solid
                      ? "hover:bg-accent"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Sun
                    className={`size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ${
                      solid ? "text-foreground" : "text-white"
                    }`}
                  />
                  <Moon
                    className={`absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ${
                      solid ? "text-foreground" : "text-white"
                    }`}
                  />
                </button>
              )}

              {/* User Dropdown / Login */}
              {user?.success ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <div
                      className={`cursor-pointer rounded-full p-2 transition ${
                        solid ? "hover:bg-accent" : "hover:bg-white/10"
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
                    className="w-56 border-border shadow-lg"
                  >
                    <DropdownMenuLabel className="font-normal text-foreground">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">
                          {user.data.profile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
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
                          className="cursor-pointer text-foreground"
                        >
                          <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{item.label}</span>
                        </DropdownMenuItem>
                      );
                    })}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleUserMenuAction("logout")}
                      className="cursor-pointer text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
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
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-3 left-3 right-3 z-50 md:hidden">
        <div className="flex items-center justify-between rounded-2xl border border-gray-800 bg-black/85 px-2 py-2 backdrop-blur-lg shadow-2xl">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 transition-all ${
                  isActive ? "text-yellow-400" : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] leading-none font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Theme Toggle Button in Mobile Nav */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 text-gray-400 transition-all hover:text-white"
              aria-label="Toggle theme"
            >
              <div className="relative flex size-5 items-center justify-center">
                <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </div>
              <span className="text-[10px] leading-none font-medium">
                Theme
              </span>
            </button>
          )}

          {user?.success ? (
            <button
              onClick={() => handleUserMenuAction("dashboard")}
              className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 transition-all ${
                pathname.includes("dashboard")
                  ? "text-yellow-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <User
                size={20}
                strokeWidth={pathname.includes("dashboard") ? 2.5 : 2}
              />
              <span className="text-[10px] leading-none font-medium">
                Account
              </span>
            </button>
          ) : (
            <Link
              href="/login"
              className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 transition-all ${
                pathname === "/login"
                  ? "text-yellow-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <User size={20} strokeWidth={pathname === "/login" ? 2.5 : 2} />
              <span className="text-[10px] leading-none font-medium">
                Login
              </span>
            </Link>
          )}
        </div>
      </nav>

      {/* Non-home pages spacing */}
      {!isHome && <div className="h-16" />}
    </>
  );
}