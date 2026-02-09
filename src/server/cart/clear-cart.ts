export async function clearCart() {
  const res = await fetch("/api/cart", {
    method: "PATCH",
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
