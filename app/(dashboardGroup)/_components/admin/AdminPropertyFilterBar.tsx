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

const STATUSES = [
  { label: "All Status", value: "all" },
  { label: "Available", value: "AVAILABLE" },
  { label: "Pending", value: "PENDING" },
  { label: "Rented", value: "RENTED" },
]

export function AdminPropertyFilterBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [search, setSearch] = useState(searchParams.get("searchTerm") ?? "")
  const [status, setStatus] = useState(searchParams.get("status") ?? "all")

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
      if (status !== "all") params.set("status", status)
      params.set("page", "1")
      router.replace(`${pathname}?${params.toString()}`)
    }, 400)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status])

  const hasFilters = search || status !== "all"

  return (
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search properties..."
            className="pl-9"
          />
        </div>

        <Select value={status} onValueChange={(v) => setStatus(v ?? "all")}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue>
              {STATUSES.find((s) => s.value === status)?.label}
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
          <Button
            variant="ghost"
            onClick={() => {
              setSearch("")
              setStatus("all")
              router.replace(pathname)
            }}
          >
            <X className="mr-1 size-4" />
            Clear
          </Button>
        )}
      </div>
    </Card>
  )
}