import { adminGetAllProperties } from "../../_actions/admin"
import { AdminPropertiesTable } from "../../_components/admin/AdminPropertiesTable"
import { AdminPropertyFilterBar } from "../../_components/admin/AdminPropertyFilterBar"


export default async function AdminPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const query = await searchParams

  const res = await adminGetAllProperties({
    searchTerm: query.searchTerm as string,
    status: query.status as string,
    page: (query.page as string) ?? "1",
  })

  const properties = Array.isArray(res?.data) ? res.data : res?.data?.data ?? []
  const meta = res?.meta ?? { page: 1, totalPages: 1, total: properties.length }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Properties</h1>
        <p className="text-muted-foreground mt-1">
          {meta.total ?? properties.length} listings across the platform
        </p>
      </div>

      <AdminPropertyFilterBar />
      <AdminPropertiesTable properties={properties} meta={meta} />
    </div>
  )
}