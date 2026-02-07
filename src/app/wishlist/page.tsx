'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { wishlistResponse, wishlistResponseItem } from '@/types/wishlist-response'
import { ProductCard } from '../_componets/productCard/page'

export default function Wishlist() {

  const [wishlistItem, setWishlistItem] = useState<wishlistResponseItem[]>([])

  const { data: wishlistData } = useQuery<wishlistResponse>({
    queryKey: ['get-wishlist'],
    queryFn: async () => {
      const response = await fetch('/api/wishlist')
      return response.json()
    }
  })

  useEffect(() => {
    if (wishlistData?.data) {
      setWishlistItem(wishlistData.data)
    }
  }, [wishlistData])

  return (
    <>

      {/* WHEN HAVE ITEMS */}
      {(wishlistData?.count ?? 0) > 0 && (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
          {wishlistItem.map((prod) => (
            <ProductCard key={prod._id} prod={prod} />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {(wishlistData?.count ?? 0) === 0 && (
        <div className="flex flex-col items-center justify-center mt-24 text-center">

          {/* Icon */}
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 4.876 9.623 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 11.25 9 11.25s9-4.03 9-11.25Z"
              />
            </svg>
          </div>

          {/* Text */}
          <h2 className="text-xl font-semibold text-gray-800">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Browse products and add your favorites ❤️
          </p>

          {/* Button */}
          <Link href="/products">
            <Button className="mt-6">
              Explore Products
            </Button>
          </Link>

        </div>
      )}

    </>
  )
}
