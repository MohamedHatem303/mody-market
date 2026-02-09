"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { shippingAddress } from "@/types/cart-response";

export async function payCashOrder(
  cartId: string,
  shippingAddress: shippingAddress,
) {
  const session: any = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${process.env.API}/orders/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: session.accessToken,
    },
    body: JSON.stringify({ shippingAddress }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Cash order failed");
  }

  return data;
}
