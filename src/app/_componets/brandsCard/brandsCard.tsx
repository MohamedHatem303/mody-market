import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Brand } from "@/types/cart-response"

export function BrandsCard({ Brand }: { Brand: Brand }) {
  return (
    <Card className="group relative mx-auto w-full max-w-sm overflow-hidden border card-hover">
      
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          fill
          src={Brand.image}
          alt={Brand.slug}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader className="space-y-4 text-center">
        <CardTitle className="text-lg font-semibold">
          {Brand.name}
        </CardTitle>

        <Button variant="outline" className="w-full gap-2 bg-[#5a0f1b] text-white">
          <Link
            href={`/products?brand=${Brand._id}`}
            className="flex items-center justify-center gap-2 w-full "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
            View All Products
          </Link>
        </Button>
      </CardHeader>

    </Card>
  )
}
