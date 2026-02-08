"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import marketImage  from "../../../aassets/images/ModyMarketLogo.png";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#7b1626]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#5a0f1b]/20 rounded-full blur-3xl animate-pulse" />

      <div className="min-h-[calc(100vh-64px)] flex items-center bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 order-2"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-gray-900"
            >
              Discover Your <br />
              <span className="text-[#7b1626] drop-shadow-md">
                Next Favorite Product
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-600 max-w-md text-lg"
            >
              Shop the latest products with the best prices and fast delivery.
              Everything you need, in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex gap-4"
            >
              <Button
                asChild
                className="bg-[#7b1626] hover:bg-[#5a0f1b] transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Link href="/products">Shop Now</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="hover:scale-105 transition-all duration-300"
              >
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="flex justify-center order-1"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Image
                src={marketImage}
                alt="Mody Market"
                className="w-[220px] sm:w-[320px] lg:w-[420px] object-contain "
                priority
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
