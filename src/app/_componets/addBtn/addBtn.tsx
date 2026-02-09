"use client";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { addToCart } from "@/server/cart/add-prod-cart";
import { addToWishlist } from "@/server/wishlist/add-prod-wishlist";
import { removeFromWishlist } from "@/server/wishlist/remove-product-wishlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AddBtn({ productId }: { productId: string }) {
  const queryClient = useQueryClient();

  const wishlistData: any = queryClient.getQueryData(["get-wishlist"]);
  const isInWishlist = wishlistData?.data?.some(
    (item: any) => item._id === productId,
  );

  const { mutate: addProductToCart, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: () => {
      toast.error("login to add to cart");
    },
  });

  const { mutate: addProductToWishlist, isPending: wishlistPending } =
    useMutation({
      mutationFn: addToWishlist,
      onSuccess: (data) => {
        toast.success(data?.message);
        queryClient.invalidateQueries({ queryKey: ["get-wishlist"] });
      },
      onError: () => {
        toast.error("login to add to Wishlist");
      },
    });

  const {
    mutate: removeProductFromWishlist,
    isPending: removeWishlistPending,
  } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["get-wishlist"] });
    },
    onError: () => {
      toast.error("login to add to Wishlist");
    },
  });

  const handleWishlist = () => {
    if (isInWishlist) {
      removeProductFromWishlist(productId);
    } else {
      addProductToWishlist(productId);
    }
  };

  return (
    <CardFooter className="flex items-center justify-between gap-3 pt-0">
      <Button
        onClick={() => addProductToCart(productId)}
        disabled={isPending}
        className="flex-1 rounded-xl transition-all active:scale-95"
      >
        {isPending ? "Adding..." : "Add to Cart"}
      </Button>

      <Button
        variant="outline"
        onClick={handleWishlist}
        disabled={wishlistPending || removeWishlistPending}
        className={`rounded-xl p-2 transition-all active:scale-95 ${
          isInWishlist ? "text-primary border-primary" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isInWishlist ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 transition ${isInWishlist ? "text-primary" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </Button>
    </CardFooter>
  );
}
