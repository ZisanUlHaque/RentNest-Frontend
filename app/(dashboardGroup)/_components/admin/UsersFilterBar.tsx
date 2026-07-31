"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SearchIcon, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const ROLES = [
  { label: "All Roles", value: "all" },
  { label: "Tenant", value: "TENANT" },
  { label: "Landlord", value: "LANDLORD" },
  { label: "Admin", value: "ADMIN" },
]

const STATUSES = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "ACTIVE" },
  { label: "Banned", value: "BANNED" },
]

export function UsersFilterBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [search, setSearch] = useState(searchParams.get("searchTerm") ?? "")
  const [role, setRole] = useState(searchParams.get("role") ?? "all")
  const [status, setStatus] = useState(searchParams.get("activeStatus") ?? "all")

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams()
      if (search) params.set("searchTerm", search)
      if (role !== "all") params.set("role", role)
      if (status !== "all") params.set("activeStatus", status)
      params.set("page", "1") // reset page on filter change

      router.replace(`${pathname}?${params.toString()}`)
    }, 400)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, role, status])

  const clearAll = () => {
    setSearch("")
    setRole("all")
    setStatus("all")
    router.replace(pathname)
  }

  const hasFilters = search || role !== "all" || status !== "all"

  return (
    <Card className="p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="pl-9"
          />
        </div>

        {/* Role */}
        <Select value={role} onValueChange={(v) => setRole(v ?? "all")}>
          <SelectTrigger className="w-full lg:w-44">
            <SelectValue>
              {ROLES.find((r) => r.value === role)?.label ?? "All Roles"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status */}
        <Select value={status} onValueChange={(v) => setStatus(v ?? "all")}>
          <SelectTrigger className="w-full lg:w-44">
            <SelectValue>
              {STATUSES.find((s) => s.value === status)?.label ?? "All Status"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" onClick={clearAll} className="shrink-0">
            <X className="mr-1 size-4" />
            Clear
          </Button>
        )}
      </div>
    </Card>
  )
}