"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductItem } from "@/types/ProductInterface";
import { ProductCard } from "../_componets/productCard/page";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      let url = "https://ecommerce.routemisr.com/api/v1/products";
      const params = new URLSearchParams();

      if (brand) params.append("brand", brand);
      if (category) params.append("category[in]", category);

      params.append("page", String(page));
      params.append("limit", String(limit));

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [brand, category, page]);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-[280px] rounded-xl border bg-muted animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-lg font-medium">No products found</h2>
          <p className="text-muted-foreground text-sm mt-2">
            Try changing filters or come back later
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl
              bg-primary px-5 py-2 text-primary-foreground
              hover:opacity-90 transition"
          >
            Reload Page
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.map((prod) => (
            <div
              key={prod._id}
              className="transition-transform duration-200 hover:-translate-y-1"
            >
              <ProductCard prod={prod} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && products.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-12">

          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition"
          >
            Previous
          </button>

          <span className="text-sm font-medium">
            Page {page}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg border text-sm hover:bg-muted transition"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}
