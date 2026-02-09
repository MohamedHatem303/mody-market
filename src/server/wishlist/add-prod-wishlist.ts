export async function addToWishlist(productId: string) {
  const res = await fetch("/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
