"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import marketImage from "../../aassets/images/ModyMarketLogo.png";

export default function Home() {
  return (
    <section className="relative">
      <div className="min-h-[calc(100vh-64px)] flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div className="flex justify-center order-2 lg:order-2 animate-fade-in-up">
            <Image
              src={marketImage}
              alt="Mody Market"
              className="w-[260px] sm:w-[320px] lg:w-[420px] object-contain animate-float"
              priority
            />
          </div>

          {/* Text */}
          <div className="space-y-6 order-1 lg:order-1 animate-slide-up">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
              Discover Your <br />
              <span className="text-[#7b1626]">Next Favorite Product</span>
            </h1>

            <p className="text-gray-600 max-w-md">
              Shop the latest products with the best prices and fast delivery.
              Everything you need, in one place.
            </p>

            <div className="flex gap-4">
              <Button asChild className="bg-[#7b1626] hover:bg-[#5a0f1b]">
                <Link href="/products">Shop Now</Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
