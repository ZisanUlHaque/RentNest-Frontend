import { getMyPayments } from "../../_actions/payment"
import { PaymentsTable } from "../../_components/tenant/PaymentsTable"

export default async function PaymentsPage() {
  const res = await getMyPayments()
  const payments = res?.data ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment History</h1>
        <p className="text-muted-foreground mt-1">
          All your rental payments in one place
        </p>
      </div>

      <PaymentsTable payments={payments} />
    </div>
  )
}