import { Button } from "@/components/ui/button";
import { ProductItem } from "@/types/ProductInterface";
import Image from "next/image";
import { Brand } from "@/types/cart-response";
import { categories } from '@/types/categoriesInterface';
import Link from "next/link";
import { subCategorieItem } from "@/types/subCategorieInterface";
import { SubCategoriesCard } from "@/app/_componets/SubCategoriesCard/SubCategoriesCard";

export default async function AllSubCategoriesOnCategory(props: {
  params: Promise<{ CategorieId: string }>;
}) {

  const params = await props.params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${params.CategorieId}/subcategories`,
    {
      next: { revalidate: 30 }
    }
  );

  const result = await response.json();
  const allProducts = result.data;

  console.log(allProducts);

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
      {allProducts?.map((SubCategorie:any) => (
        <SubCategoriesCard
          key={SubCategorie._id}
          SubCategorie={SubCategorie}
        />
      ))}
    </div>
  );
}

