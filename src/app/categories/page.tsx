// import { Button } from "@/components/ui/button";
// import { ProductItem } from "@/types/ProductInterface";
// import Image from "next/image";
// import { ProductCard } from "../_componets/productCard/page";
// import { BrandsCard } from "../_componets/brandsCard/brandsCard";
// import { Brand } from "@/types/cart-response";
// import { categories } from '@/types/categoriesInterface';
// import { CategoriesCard } from "../_componets/CategoriesCard/CategoriesCard";
// import Link from "next/link";

// export default async function Categories() {
//   let response = await fetch('https://ecommerce.routemisr.com/api/v1/categories',{
//     method: 'GET',
//     next: {revalidate: 30}
//   }
//   );
//   let {data : allProducts}:{data : categories[]} = await response.json();
//   return (
//     <>
//     <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
//       {allProducts.map((Categories)=><CategoriesCard key={Categories._id} Categorie={Categories}/>) }
//     </div>
//     <Button className="w-full">
//       <Link href={'/allSubCategories'}>
//         view All Categories
//       </Link>
//     </Button>
//     </>
//   );
// }
import { Button } from "@/components/ui/button";
import { CategoriesCard } from "../_componets/CategoriesCard/CategoriesCard";
import Link from "next/link";
import { categories } from "@/types/categoriesInterface";

// ⛔️ امنع prerender وقت build
export const dynamic = "force-dynamic";

export default async function Categories() {
  let allProducts: categories[] = [];

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        cache: "no-store", // أهم من revalidate هنا
      }
    );

    const json = await response.json();
    allProducts = json?.data ?? [];
  } catch (error) {
    allProducts = [];
  }

  return (
    <>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {allProducts.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">
            No categories found
          </p>
        ) : (
          allProducts.map((cat) => (
            <CategoriesCard key={cat._id} Categorie={cat} />
          ))
        )}
      </div>

      <Button className="w-full mt-6">
        <Link href="/allSubCategories">View All Categories</Link>
      </Button>
    </>
  );
}
