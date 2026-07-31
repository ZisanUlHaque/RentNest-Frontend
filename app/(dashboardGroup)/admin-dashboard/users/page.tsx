import { adminGetAllUsers } from "../../_actions/admin"
import { UsersFilterBar } from "../../_components/admin/UsersFilterBar"
import { UsersTable } from "../../_components/admin/UsersTable"

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const query = await searchParams

  const res = await adminGetAllUsers({
    searchTerm: query.searchTerm as string,
    role: query.role as string,
    activeStatus: query.activeStatus as string,
    page: (query.page as string) ?? "1",
    limit: "10",
  })

  const users = Array.isArray(res?.data)
    ? res.data
    : res?.data?.data ?? []
  const meta = res?.meta ?? res?.data?.meta ?? { page: 1, totalPages: 1, total: users.length }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-1">
          {meta.total ?? users.length} users registered on the platform
        </p>
      </div>

      <UsersFilterBar />

      <UsersTable users={users} meta={meta} />
    </div>
  )
}