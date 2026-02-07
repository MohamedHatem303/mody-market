export const dynamic = "force-dynamic";

import { subCategorieItem } from "@/types/subCategorieInterface";
import { SubCategoriesCard } from "../_componets/SubCategoriesCard/SubCategoriesCard";

export default async function AllSubCategories() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/subcategories",
      { cache: "no-store" }
    );

    if (!response.ok) {
      // لو الـ API رجّعت خطأ (4xx/5xx) نتعامل معاه بأمان
      console.error("Subcategories API returned non-OK:", response.status, await response.text());
      return (
        <p className="text-center text-red-500">
          Failed to load sub categories (bad response).
        </p>
      );
    }

    const json = await response.json();
    // طُرق مختلفة ممكن تكون عليها البيانات من الـ API — نحاول التعامل مع كل الاحتمالات
    // 1) json.data هو مصفوفة مباشرة
    // 2) json.data.subcategories هو المصفوفة
    // 3) json هو مصفوفة مباشرة (نادر)
    let dataCandidate: any = json?.data ?? json ?? [];

    if (json?.data && typeof json.data === "object" && Array.isArray(json.data.subcategories)) {
      dataCandidate = json.data.subcategories;
    }

    const allProducts: subCategorieItem[] = Array.isArray(dataCandidate) ? dataCandidate : [];

    // للتصحيح: اطبع شكل الـ json لو احتجت تتبع المشكلة على Vercel
    if (process.env.NODE_ENV !== "production") {
      console.debug("AllSubCategories - fetched json:", JSON.stringify(json));
    }

    return (
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {allProducts.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">
            No sub categories found
          </p>
        ) : (
          allProducts.map((subCategorie) => (
            <SubCategoriesCard
              key={subCategorie?._id ?? Math.random().toString(36).slice(2, 9)}
              SubCategorie={subCategorie}
            />
          ))
        )}
      </div>
    );
  } catch (error) {
    console.error("AllSubCategories fetch/render error:", error);
    return (
      <p className="text-center text-red-500">
        Failed to load sub categories
      </p>
    );
  }
}
