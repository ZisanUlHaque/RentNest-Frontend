import { ICategory, IProperty } from "@/lib/types"
import { MyPropertyCard } from "./MyPropertyCard"
import { Building2 } from "lucide-react"

type Props = {
  properties: IProperty[]
  categories: ICategory[]
}

export function MyPropertyList({ properties, categories }: Props) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-2xl">
        <Building2 className="size-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-lg font-semibold">No properties yet</p>
        <p className="text-sm text-muted-foreground">
          Click &quot;Add Property&quot; to create your first listing
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <MyPropertyCard
          key={property.id}
          property={property}
          categories={categories}
        />
      ))}
    </div>
  )
}