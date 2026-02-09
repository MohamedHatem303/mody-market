import { Button } from "@/components/ui/button";
import { CategoriesCard } from "../_componets/CategoriesCard/CategoriesCard";
import Link from "next/link";
import { categories } from "@/types/categoriesInterface";

export const dynamic = "force-dynamic";

export default async function Categories() {
  let allProducts: categories[] = [];

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        cache: "no-store",
      },
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
