import { Button } from "@/components/ui/button";
import { ProductItem } from "@/types/ProductInterface";
import Image from "next/image";
import { ProductCard } from "../_componets/productCard/page";
import { BrandsCard } from "../_componets/brandsCard/brandsCard";
import { Brand } from "@/types/cart-response";
import { categories } from '@/types/categoriesInterface';
import { CategoriesCard } from "../_componets/CategoriesCard/CategoriesCard";
import Link from "next/link";

export default async function Categories() {
  let response = await fetch('https://ecommerce.routemisr.com/api/v1/categories',{
    method: 'GET',
    next: {revalidate: 30}
  }
  );
  let {data : allProducts}:{data : categories[]} = await response.json();
  return (
    <>
    <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
      {allProducts.map((Categories)=><CategoriesCard key={Categories._id} Categorie={Categories}/>) }
    </div>
    <Button className="w-full">
      <Link href={'/allSubCategories'}>
        view All Categories
      </Link>
    </Button>
    </>
  );
}
