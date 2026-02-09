import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import AllOrder from "@/app/_componets/navpar/AllOrder/AllOrder"

export default async function Page() {
  const session: any = await getServerSession(authOptions)

  if (!session?.accessToken) {
    return <div className="p-10 text-center">Not authenticated</div>
  }

  const token = session.accessToken

  const verifyRes = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
    { headers: { token }, cache: "no-store" }
  )

  const verifyData = await verifyRes.json()
  const userId = verifyData?.decoded?.id

  const ordersRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    { headers: { token }, cache: "no-store" }
  )

  const orders = await ordersRes.json()

  return <AllOrder orders={orders} />
}
