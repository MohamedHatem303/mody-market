export const dynamic = "force-dynamic";

import { subCategorieItem } from "@/types/subCategorieInterface";
import { SubCategoriesCard } from "../_componets/SubCategoriesCard/SubCategoriesCard";

export default async function AllSubCategories() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/subcategories",
      { cache: "no-store" }
    );

    const json = await response.json();
    const allProducts: subCategorieItem[] = json?.data ?? [];

    return (
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {allProducts.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">
            No sub categories found
          </p>
        ) : (
          allProducts.map((subCategorie) => (
            <SubCategoriesCard
              key={subCategorie._id}
              SubCategorie={subCategorie}
            />
          ))
        )}
      </div>
    );
  } catch (error) {
    // fallback آمن جدًا
    return (
      <p className="text-center text-red-500">
        Failed to load sub categories
      </p>
    );
  }
}
