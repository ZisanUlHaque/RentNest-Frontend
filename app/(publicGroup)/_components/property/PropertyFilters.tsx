"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { X, SlidersHorizontal } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useTransition, useRef } from "react"
import { ICategory } from "@/lib/types"

const AMENITIES = [
  "WiFi",
  "AC",
  "Generator",
  "Parking",
  "Elevator",
  "Air Conditioning",
  "High-Speed Internet",
  "Conference Room",
]

const AVAILABILITY = [
  { label: "Any", value: "all" },
  { label: "Available", value: "available" },
  { label: "Rented", value: "rented" },
]

const MAX_PRICE = 100000

type Props = {
  categories: ICategory[]
}

export function PropertyFilters({ categories }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const isFirstRender = useRef(true)

  const [location, setLocation] = useState(searchParams.get("location") ?? "")
  const [propertyType, setPropertyType] = useState(
    searchParams.get("type") ?? "all"
  )
  const [availability, setAvailability] = useState(
    searchParams.get("availability") ?? "all"
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice") ?? 0),
    Number(searchParams.get("maxPrice") ?? MAX_PRICE),
  ])
  const [amenities, setAmenities] = useState<string[]>(
    searchParams.get("amenities")?.split(",").filter(Boolean) ?? []
  )

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (location) params.set("location", location)
      else params.delete("location")

      if (propertyType !== "all") params.set("type", propertyType)
      else params.delete("type")

      if (availability !== "all") params.set("availability", availability)
      else params.delete("availability")

      if (priceRange[0] > 0) params.set("minPrice", String(priceRange[0]))
      else params.delete("minPrice")

      if (priceRange[1] < MAX_PRICE)
        params.set("maxPrice", String(priceRange[1]))
      else params.delete("maxPrice")

      if (amenities.length > 0) params.set("amenities", amenities.join(","))
      else params.delete("amenities")

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`)
      })
    }, 400)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, propertyType, availability, priceRange, amenities])

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    )
  }

  const clearAll = () => {
    setLocation("")
    setPropertyType("all")
    setAvailability("all")
    setPriceRange([0, MAX_PRICE])
    setAmenities([])

    const params = new URLSearchParams()
    const searchTerm = searchParams.get("searchTerm")
    if (searchTerm) params.set("searchTerm", searchTerm)

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname
    )
  }

  const hasActiveFilters =
    location ||
    propertyType !== "all" ||
    availability !== "all" ||
    priceRange[0] > 0 ||
    priceRange[1] < MAX_PRICE ||
    amenities.length > 0

  return (
    <Card className="sticky top-2 h-fit space-y-2 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4" />
          <h2 className="font-semibold">Filters</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-8 text-xs"
          >
            <X className="mr-1 size-3" /> Clear
          </Button>
        )}
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label>Location</Label>
        <Input
          placeholder="e.g. Uttara, Dhaka"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Category (Property Type) */}
      <div className="space-y-2">
        <Label>Property Type</Label>
        <Select
          value={propertyType}
          onValueChange={(v) => setPropertyType(v ?? "all")}
        >
          <SelectTrigger className="w-full">
            {/* ✅ Manually render label instead of relying on SelectValue */}
            <SelectValue placeholder="All Types">
              {propertyType === "all"
                ? "All Types"
                : (categories.find((c) => c.id === propertyType)?.name ??
                  "All Types")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Availability */}
      <div className="space-y-2">
        <Label>Availability</Label>
        <Select
          value={availability}
          onValueChange={(v) => setAvailability(v ?? "all")}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AVAILABILITY.map((a) => (
              <SelectItem key={a.value} value={a.value}>
                {a.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <span className="text-xs text-muted-foreground">
            ৳{priceRange[0].toLocaleString()} - ৳
            {priceRange[1].toLocaleString()}
          </span>
        </div>
        <Slider
          min={0}
          max={MAX_PRICE}
          step={1000}
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
        />
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <Label>Amenities</Label>
        <div className="grid max-h-56 grid-cols-1 gap-2 overflow-y-auto pr-1">
          {AMENITIES.map((amenity) => (
            <div key={amenity} className="flex items-center gap-2">
              <Checkbox
                id={amenity}
                checked={amenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <label
                htmlFor={amenity}
                className="cursor-pointer text-sm select-none"
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      {isPending && (
        <p className="animate-pulse text-xs text-muted-foreground">
          Updating results...
        </p>
      )}
    </Card>
  )
}
