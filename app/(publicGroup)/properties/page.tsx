import { Suspense } from "react"
import { PropertySearchBar } from "../_components/property/PropertySearchBar"
import { PropertySkeleton } from "../_components/property/PropertySkeleton"
import { PropertyList } from "../_components/property/PropertyList"
import { PropertyFilters } from "../_components/property/PropertyFilters"
import { getCategories } from "../_actions/getCategories"

const PropertyPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const categoriesRes = await getCategories()
  const categories = categoriesRes?.data ?? []

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Explore Properties</h1>
          <p className="text-sm text-muted-foreground">
            Discover verified listings that match your lifestyle and budget.
          </p>
        </div>
        <PropertySearchBar />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <aside>
          <PropertyFilters categories={categories} />
        </aside>

        <main>
          <Suspense fallback={<PropertySkeleton />}>
            <PropertyList searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default PropertyPage