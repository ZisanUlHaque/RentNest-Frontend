import { getMyRentalRequests } from "../../_actions/rentalRequest" 
import { RequestsTable } from "../../_components/request/RequestsTable"

export default async function RequestsPage() {
  const res = await getMyRentalRequests()
  const requests = res?.data ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rental Requests</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage tenant requests
        </p>
      </div>

      <RequestsTable requests={requests} />
    </div>
  )
}