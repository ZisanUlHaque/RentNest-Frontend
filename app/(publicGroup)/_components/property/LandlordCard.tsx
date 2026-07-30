import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { IUser } from "@/lib/types"
import { MessageCircle, BadgeCheck, Phone } from "lucide-react"
import { Separator } from "@/components/ui/separator"

type Props = {
  landlord: IUser
}

export function LandlordCard({ landlord }: Props) {
  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-4">
        <h3 className="flex items-center gap-2 font-semibold">
          <BadgeCheck className="size-4 text-primary" />
          Listed by
        </h3>
      </div>

      <div className="space-y-5 p-6">
        {/* Profile */}
        <div className="flex items-center gap-4">
          <Avatar className="size-16 border-2 border-primary/20">
            <AvatarImage src={landlord.profilePhoto || ""} />
            <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
              {landlord.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">{landlord.name}</p>
              <BadgeCheck className="size-4 text-blue-500" />
            </div>
            <p className="text-sm text-muted-foreground">{landlord.email}</p>
          </div>
        </div>

        <Separator />
        {/* Actions */}
        <div className="space-y-3">
          <Button  variant="outline" className="w-full">
            <a
              href={`mailto:${landlord.email}`}
              className="flex items-center justify-center gap-2"
            >
              <MessageCircle className="size-4" />
              <span>Send Email</span>
            </a>
          </Button>

          {landlord.phone && (
            <Button  variant="ghost" className="w-full bg-chart-3 hover:bg-chart-2">
              <a
                href={`tel:${landlord.phone}`}
                className="flex items-center justify-center gap-2"
              >
                <Phone className="size-4" />
                <span>{landlord.phone}</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
