import { getMyRentalRequests } from "../../_actions/rentalRequest"
import { TenantRequestsTable } from "../../_components/tenant/TenantRequestsTable"

export default async function TenantRequestsPage() {
  const res = await getMyRentalRequests()
  const requests = res?.data ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Rental Requests</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage your rental requests
        </p>
      </div>

      <TenantRequestsTable requests={requests} />
    </div>
  )
}