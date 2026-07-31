"use client"

import { useState, useActionState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { createProperty, updateProperty } from "../../_actions/property"
import { ICategory, IProperty } from "@/lib/types"

type Props = {
  mode: "create" | "edit"
  property?: IProperty
  categories: ICategory[]
}

const initialState = { success: false, message: "" }

export function PropertyFormDialog({ mode, property, categories }: Props) {
  const [open, setOpen] = useState(false)
  const [isAvailable, setIsAvailable] = useState(
    property?.status !== "RENTED"
  )
  const [categoryId, setCategoryId] = useState(property?.categoryId ?? "")

  const action =
    mode === "edit" && property
      ? updateProperty.bind(null, property.id)
      : createProperty

  const [state, formAction, isPending] = useActionState(action, initialState)

  useEffect(() => {
    if (state?.success) {
      toast.success(
        mode === "create"
          ? "Property created successfully!"
          : "Property updated successfully!"
      )
      setOpen(false)
    } else if (state?.message && !state?.success) {
      toast.error(state.message)
    }
  }, [state, mode])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {mode === "create" ? (
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add Property
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Pencil className="mr-2 size-3" />
          Edit
        </Button>
      )}

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Property" : "Edit Property"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new property listing to your portfolio."
              : "Update your property information."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input
              name="title"
              defaultValue={property?.title}
              placeholder="e.g. Cozy Studio in Uttara"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea
              name="description"
              defaultValue={property?.description}
              placeholder="Describe your property..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Location */}
            <div className="space-y-2">
              <Label>Location *</Label>
              <Input
                name="location"
                defaultValue={property?.location}
                placeholder="e.g. Uttara, Dhaka"
                required
              />
            </div>

            {/* Rent */}
            <div className="space-y-2">
              <Label>Monthly Rent (৳) *</Label>
              <Input
                name="rentPerMonth"
                type="number"
                defaultValue={property?.rentPerMonth}
                placeholder="15000"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select
              value={categoryId}
              onValueChange={(val) => setCategoryId(val ?? "")}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category">
                  {categoryId
                    ? categories.find((c) => c.id === categoryId)?.name
                    : "Select a category"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="categoryId" value={categoryId} />
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <Label>Amenities (comma separated)</Label>
            <Input
              name="amenities"
              defaultValue={property?.amenities?.join(", ")}
              placeholder="WiFi, AC, Generator, Parking"
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple amenities with commas
            </p>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>Image URLs (comma separated) *</Label>
            <Textarea
              name="images"
              defaultValue={property?.images?.join(", ")}
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
              rows={3}
              required
            />
            <p className="text-xs text-muted-foreground">
              Paste image URLs separated by commas
            </p>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
            <div>
              <Label>Availability Status</Label>
              <p className="text-sm text-muted-foreground">
                {isAvailable
                  ? "Property is available for rent"
                  : "Property is currently rented"}
              </p>
            </div>
            <Switch
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
              name="availability-switch"
            />
            <input
              type="hidden"
              name="status"
              value={isAvailable ? "AVAILABLE" : "RENTED"}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  {mode === "create" ? "Creating..." : "Updating..."}
                </>
              ) : mode === "create" ? (
                "Create Property"
              ) : (
                "Update Property"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}