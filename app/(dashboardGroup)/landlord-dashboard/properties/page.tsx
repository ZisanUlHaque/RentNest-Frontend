import { Button } from "@/components/ui/button"
import { getMyProperties } from "../../_actions/property"
import { MyPropertyList } from "../../_components/property/MyPropertyList"
import { PropertyFormDialog } from "../../_components/property/PropertyFormDialog"
import { getCategories } from "@/app/(publicGroup)/_actions/getCategories"

export default async function MyPropertiesPage() {
  const [propertiesRes, categoriesRes] = await Promise.all([
    getMyProperties(),
    getCategories(),
  ])

  const properties = propertiesRes?.data ?? []
  const categories = categoriesRes?.data ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Properties</h1>
          <p className="text-muted-foreground mt-1">
            {properties.length} {properties.length === 1 ? "property" : "properties"} listed
          </p>
        </div>

        <PropertyFormDialog mode="create" categories={categories} />
      </div>

      <MyPropertyList properties={properties} categories={categories} />
    </div>
  )
}