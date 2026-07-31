"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IUser } from "@/lib/types"
import { User, Mail, Phone, ImageIcon, Save, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { updateProfile } from "../../_actions/profile"
import { useRouter } from "next/navigation"

type Props = {
  user: IUser
}

export function ProfileInfoForm({ user }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name ?? "",
    phone: user.phone ?? "",
    profilePhoto: user.profilePhoto ?? "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const res = await updateProfile(formData)

    if (res?.success) {
      toast.success(res.message ?? "Profile updated successfully!")
      router.refresh()
    } else {
      toast.error(res?.message ?? "Failed to update profile")
    }

    setIsLoading(false)
  }

  const handleReset = () => {
    setFormData({
      name: user.name ?? "",
      phone: user.phone ?? "",
      profilePhoto: user.profilePhoto ?? "",
    })
  }

  const hasChanges =
    formData.name !== user.name ||
    formData.phone !== user.phone ||
    formData.profilePhoto !== (user.profilePhoto ?? "")

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <User className="size-5 text-primary" />
          Personal Information
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Update your personal details and profile picture
        </p>
      </div>

      {/* Photo Preview */}
      <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-muted/50">
        <Avatar className="size-16 border-2 border-background shadow-sm">
          <AvatarImage src={formData.profilePhoto} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold">
            {formData.name?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-semibold text-sm">{formData.name || "Your Name"}</p>
          <p className="text-xs text-muted-foreground truncate">
            {user.email}
          </p>
          <p className="text-xs text-primary mt-1">
            Preview updates as you type
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <User className="size-4 text-primary" />
            Full Name *
          </Label>
          <Input
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Enter your full name"
            required
            className="h-11"
          />
        </div>

        {/* Email (readonly) */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Mail className="size-4 text-primary" />
            Email Address
          </Label>
          <Input
            value={user.email}
            disabled
            className="h-11 bg-muted/50 cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed. Contact support if needed.
          </p>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Phone className="size-4 text-primary" />
            Phone Number
          </Label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+880 1XXX-XXXXXX"
            className="h-11"
          />
        </div>

        {/* Profile Photo URL */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <ImageIcon className="size-4 text-primary" />
            Profile Photo URL
          </Label>
          <Input
            type="url"
            value={formData.profilePhoto}
            onChange={(e) =>
              setFormData({ ...formData, profilePhoto: e.target.value })
            }
            placeholder="https://example.com/photo.jpg"
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Paste a URL to your profile picture (upload to ImgBB, Cloudinary, etc.)
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            type="submit"
            disabled={isLoading || !hasChanges}
            className="min-w-32"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 size-4" />
                Save Changes
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isLoading || !hasChanges}
          >
            Reset
          </Button>
        </div>
      </form>
    </Card>
  )
}