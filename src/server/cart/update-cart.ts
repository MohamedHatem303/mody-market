"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function updateCartItem({
  cartItemId,
  count,
}: {
  cartItemId: string;
  count: number;
}) {
  const session: any = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${process.env.API}/cart/${cartItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: session.accessToken,
    },
    body: JSON.stringify({ count }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Update failed");
  }

  return data;
}
