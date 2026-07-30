"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { IProperty } from "@/lib/types"
import { toast } from "sonner"
import { Send } from "lucide-react"

type Props = {
  property: IProperty
}

export function RequestToRentModal({ property }: Props) {
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

    // TODO: backend API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Rental request submitted successfully!")
    setOpen(false)
    setFormData({ moveInDate: "", durationMonths: "6", message: "" })
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ✅ Plain Button with onClick — no DialogTrigger, no nested button */}
      <Button
        size="lg"
        className="w-full text-lg font-semibold"
        onClick={() => setOpen(true)}
      >
        Request to Rent
      </Button>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request to Rent - {property.title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Move-in Date</Label>
            <Input
              type="date"
              value={formData.moveInDate}
              onChange={(e) =>
                setFormData({ ...formData, moveInDate: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Duration (months)</Label>
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
          </div>

          <div className="space-y-2">
            <Label>Message to Landlord (Optional)</Label>
            <Textarea
              placeholder="Tell the landlord about yourself..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            <Send className="mr-2 size-4" />
            {isLoading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}