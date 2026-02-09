import { Button } from "@/components/ui/button";
import { ProductItem } from "@/types/ProductInterface";
import Image from "next/image";
import { ProductCard } from "../_componets/productCard/page";
import { BrandsCard } from "../_componets/brandsCard/brandsCard";
import { Brand } from "@/types/cart-response";

export default async function brands() {
  let response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    method: "GET",
    next: { revalidate: 30 },
  });
  let { data: allProducts }: { data: Brand[] } = await response.json();
  return (
    <>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {allProducts.map((Brand) => (
          <BrandsCard key={Brand._id} Brand={Brand} />
        ))}
      </div>
    </>
  );
}
