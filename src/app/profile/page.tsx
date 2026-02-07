import { getAccessToken } from '@/schema/access-token'
import ProfilePage from '../_componets/ProfilePage/ProfilePage'

export default async function Page() {

  // 1) get token
  const token = await getAccessToken()
  console.log(token);
  

  // 2) verify token
  const verifyRes = await fetch(
    'https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
    {
      headers: {
        token: token || ''
      }
    }
  )

  const verifyData = await verifyRes.json()
  const userId = verifyData?.decoded?.id
  console.log('هنا ',userId);
  

  // 3) get user orders
  let orders: any[] = []

  if (userId) {
    const ordersRes = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    )

    const ordersData = await ordersRes.json()
    orders = ordersData
  }

  // 4) send orders + token
  return (
    <ProfilePage ordersProp={orders} token={token || ''} />
  )
}
