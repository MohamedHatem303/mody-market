import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import ProfilePage from "../_componets/ProfilePage/ProfilePage";
export default async function Page() {
  const session: any = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return (
      <div className="p-10 text-center text-red-500">Not authenticated</div>
    );
  }

  const token = session.accessToken;

  const verifyRes = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
    {
      headers: { token },
      cache: "no-store",
    },
  );

  if (!verifyRes.ok) {
    return <div className="p-10 text-center text-red-500">Invalid session</div>;
  }

  const verifyData = await verifyRes.json();
  const realUserId = verifyData?.decoded?.id;

  if (!realUserId) {
    return <div className="p-10 text-center text-red-500">User not found</div>;
  }

  const ordersRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${realUserId}`,
    {
      headers: { token },
      cache: "no-store",
    },
  );

  if (!ordersRes.ok) {
    const errText = await ordersRes.text();
    console.error("ORDERS ERROR:", errText);

    return (
      <div className="p-10 text-center text-red-500">Failed to load orders</div>
    );
  }

  const orders = await ordersRes.json();

  return <ProfilePage ordersProp={orders} token={token} />;
}
