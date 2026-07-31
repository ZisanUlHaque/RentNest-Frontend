"use client"

import { useState } from "react"
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
import { IProperty } from "@/lib/types"
import { toast } from "sonner"
import { Send, CalendarDays, Clock, MessageSquare } from "lucide-react"
import { createRentalRequest } from "@/app/(dashboardGroup)/_actions/rentalRequest"
import { useRouter } from "next/navigation"

type Props = {
  property: IProperty
}

export function RequestToRentModal({ property }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    moveInDate: "",
    durationMonths: "6",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await createRentalRequest({
        propertyId: property.id,
        moveInDate: new Date(formData.moveInDate).toISOString(),
        durationMonths: Number(formData.durationMonths),
        message: formData.message || null,
      })

      if (res.success) {
        toast.success("Rental request submitted successfully!")
        setOpen(false)
        setFormData({ moveInDate: "", durationMonths: "6", message: "" })
        router.push("/tenant-dashboard/requests")
      } else {
        toast.error(res.message ?? "Failed to submit request")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        size="lg"
        className="w-full text-lg font-semibold cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Request to Rent
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Request to Rent</DialogTitle>
            <DialogDescription>
              Submit your rental request for{" "}
              <span className="font-semibold text-foreground">
                {property.title}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
            <span className="text-sm text-muted-foreground">Monthly Rent</span>
            <span className="font-bold text-primary text-lg">
              ৳{property.rentPerMonth.toLocaleString()}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />
                Move-in Date
              </Label>
              <Input
                type="date"
                value={formData.moveInDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setFormData({ ...formData, moveInDate: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="size-4 text-primary" />
                Duration (months)
              </Label>
              <Input
                type="number"
                min="1"
                max="24"
                value={formData.durationMonths}
                onChange={(e) =>
                  setFormData({ ...formData, durationMonths: e.target.value })
                }
                required
              />
              {formData.durationMonths && (
                <p className="text-xs text-muted-foreground">
                  Total estimated cost:{" "}
                  <span className="font-semibold text-foreground">
                    ৳
                    {(
                      property.rentPerMonth * Number(formData.durationMonths)
                    ).toLocaleString()}
                  </span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MessageSquare className="size-4 text-primary" />
                Message to Landlord
                <span className="text-xs text-muted-foreground">
                  (Optional)
                </span>
              </Label>
              <Textarea
                placeholder="Introduce yourself and mention why you're interested..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
              />
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="mr-2 size-4" />
                  Submit Rental Request
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}