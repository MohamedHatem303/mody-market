import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { ProductItem } from '@/types/ProductInterface'
import React from 'react'
import Productimg from "@/app/_componets/productimg/productimg"
import AddBtn from "../../_componets/addBtn/addBtn"

type myProps = {
  params: { id: string }
}

/* ===== util: format big numbers (sold) ===== */
function getBeforeDot(value: string | number): string {
  return value.toString().split(".")[0]
}

export default async function productdetails(props: myProps) {
  let { id } = await props.params
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  let { data: singleProduct }: { data: ProductItem } = await response.json()

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

        {/* Image */}
        <div className="md:col-span-1">
          <div className="rounded-2xl bg-white shadow-md p-4">
            <Productimg images={singleProduct?.images ?? []} />
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-2">
          <Card className="rounded-2xl shadow-lg">

            {/* ===== Header ===== */}
            <CardHeader className="space-y-5">

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Link href={`/products?brand=${singleProduct.brand._id}`}>
                  <Badge className="hover:bg-[#5a0f1b] hover:text-white" variant="secondary">{singleProduct.brand.name}</Badge>
                </Link>

                <Link href={`/products?category=${singleProduct.category._id}`}>
                  <Badge className="hover:bg-[#5a0f1b] hover:text-white" variant="secondary">{singleProduct.category.name}</Badge>
                </Link>

                <Link href={`/products?category=${singleProduct.subcategory[0].category}`}>
                  <Badge className="hover:bg-[#5a0f1b] hover:text-white" variant="secondary">{singleProduct.subcategory[0].name}</Badge>
                </Link>
              </div>

              {/* Title */}
              <CardTitle className="text-2xl font-bold leading-tight">
                {singleProduct.title}
              </CardTitle>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <span>
                  <span className="font-semibold text-foreground">
                    {singleProduct.price} EGP
                  </span>
                </span>

                <span>
                  {getBeforeDot(singleProduct.sold)} sold
                </span>

                <span>
                  {singleProduct.ratingsQuantity} reviews
                </span>

                <span className="flex items-center gap-1 text-foreground">
                  {singleProduct.ratingsAverage}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-yellow-400"
                  >
                    <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                </span>
              </div>
            </CardHeader>

            {/* ===== Body ===== */}
            <div className="px-6 space-y-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {singleProduct.description}
              </p>

              <div className="flex gap-10 text-sm">
                <div>
                  <span className="text-muted-foreground">In stock</span>
                  <div className="font-semibold">{singleProduct.quantity}</div>
                </div>

              </div>
            </div>

            {/* ===== Footer ===== */}
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-5">
              <div className="text-2xl font-bold">
                {singleProduct.price}
                <span className="text-base font-medium ml-1">EGP</span>
              </div>

              <div className="flex items-center gap-3">
                <AddBtn productId={singleProduct._id} />
              </div>
            </CardFooter>

          </Card>
        </div>
      </div>
    </div>
  )
}
