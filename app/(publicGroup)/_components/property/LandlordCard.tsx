// app/(publicGroup)/_components/property/LandlordCard.tsx

import Image from "next/image"
import { Mail, Phone, User, CreditCard } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Landlord = {
  id: string
  name: string
  email?: string
  phone?: string
  profilePhoto?: string
}

type Props = {
  landlord: Landlord
}

export function LandlordCard({ landlord }: Props) {
  return (
    <Card className="p-6 border-border/50">
      <h3 className="mb-4 text-base font-bold">Landlord Details</h3>

      {/* Profile */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-muted">
          {landlord.profilePhoto ? (
            <Image
              src={landlord.profilePhoto}
              alt={landlord.name}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-primary/10">
              <User className="size-5 text-primary" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-bold text-sm">{landlord.name}</p>
          <p className="text-xs text-muted-foreground">Property Owner</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-4 flex items-center gap-2 rounded-lg bg-muted/50 p-3">
        <CreditCard className="size-4 text-primary shrink-0" />
        <div className="min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase font-medium">
            Payment Method
          </p>
          <p className="text-xs font-semibold">Stripe / Cash</p>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {landlord.phone && (
          <a href={`tel:${landlord.phone}`}>
            <Button variant="outline" size="sm" className="w-full">
              <Phone className="mr-1.5 size-3.5" />
              Contact
            </Button>
          </a>
        )}
        {landlord.email && (
          <a href={`mailto:${landlord.email}`}>
            <Button variant="outline" size="sm" className="w-full">
              <Mail className="mr-1.5 size-3.5" />
              Email
            </Button>
          </a>
        )}
      </div>

      {/* Register Interest */}
      <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
        Register Interest
      </Button>
    </Card>
  )
}