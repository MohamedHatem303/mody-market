"use client";
import { clearCart } from "@/server/cart/clear-cart";
import { deleteCartItem } from "@/server/cart/delete-cart-item";
import { CartResponse } from "@/types/cart-response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { updateCartItem } from "@/server/cart/update-cart";

export default function cart() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const {
    data: cartData,
    isLoading,
    isError,
  } = useQuery<CartResponse>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart", {
        credentials: "include",
      });

      const payload = await response.json();
      return payload;
    },
  });

  const { mutate: delCartItem } = useMutation({
    mutationKey: ["delete-cart-item"],
    mutationFn: deleteCartItem,
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: () => {
      toast.error("Error removing item from cart");
    },
  });

  const { mutate: updateCartMutation } = useMutation({
    mutationKey: ["update-cart-item"],
    mutationFn: ({
      cartItemId,
      count,
    }: {
      cartItemId: string;
      count: number;
    }) =>
      updateCartItem({
        cartItemId,
        count,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Error updating item in cart");
    },
  });

  const { mutate: clearCartMutation } = useMutation({
    mutationKey: ["clear-cart"],
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("Cart cleared successfully");
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: () => {
      toast.error("Error clearing cart");
    },
  });

  function handleUpdateCartItem(cartItemId: string, count: number) {
    if (count < 1) return;

    updateCartMutation({
      cartItemId,
      count,
    });
  }

  if (isLoading) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Loading cart...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">Failed to load cart</div>
    );
  }

  if (!cartData || (cartData.numOfCartItems ?? 0) === 0) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          🛒
        </div>

        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-muted-foreground">
          Looks like you haven’t added anything to your cart yet.
        </p>

        <Button asChild className="btn-primary px-8">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 rounded-xl border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="py-4 px-4 text-left">Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {cartData.data?.products.map((prod) => (
              <tr
                key={prod._id}
                className="border-b hover:bg-muted/40 transition"
              >
                <td className="py-4 px-4 flex items-center gap-4">
                  <img
                    src={prod.product.imageCover}
                    alt={prod.product.title}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <span className="font-medium">{prod.product.title}</span>
                </td>

                <td>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        handleUpdateCartItem(prod.product._id, prod.count - 1)
                      }
                      className="w-7 h-7 rounded-full border hover:bg-muted"
                    >
                      −
                    </button>
                    <span className="min-w-[24px] text-center">
                      {prod.count}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateCartItem(prod.product._id, prod.count + 1)
                      }
                      className="w-7 h-7 rounded-full border hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="font-semibold">{prod.price * prod.count} EGP</td>

                <td className="text-right pr-4">
                  <button
                    onClick={() => delCartItem(prod.product._id)}
                    className="text-destructive hover:underline text-sm"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full text-destructive border-destructive"
            onClick={() => clearCartMutation()}
          >
            Clear Cart
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5 space-y-4 h-fit">
        <h2 className="text-xl font-semibold text-center">Order Summary</h2>

        <div className="flex justify-between text-sm">
          <span>Items</span>
          <span>{cartData.numOfCartItems ?? 0}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Total</span>
          <span className="font-semibold">
            {cartData.data?.totalCartPrice ?? 0} EGP
          </span>
        </div>

        <Button asChild className="btn-primary w-full mt-4">
          <Link href={`/checkout/${cartData.cartId ?? ""}`}>
            Proceed to Checkout
          </Link>
        </Button>
      </div>
    </div>
  );
}
