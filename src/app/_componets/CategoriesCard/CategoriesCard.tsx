import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/types/categoriesInterface";

export function CategoriesCard({ Categorie }: { Categorie: categories }) {
  return (
    <Card className="group relative mx-auto w-full max-w-sm overflow-hidden border card-hover">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          fill
          src={Categorie.image}
          alt={Categorie.slug}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader className="space-y-4">
        <CardTitle className="text-lg font-semibold text-center">
          {Categorie.name}
        </CardTitle>

        <div className="flex flex-col gap-3">
          <Button className="w-full">
            <Link
              href={`/categories/${Categorie._id}/subcategories`}
              className="w-full text-center"
            >
              View All SubCategories
            </Link>
          </Button>

          <Button variant="outline" className="w-full gap-2">
            <Link
              href={`/products?category=${Categorie._id}`}
              className="flex items-center justify-center gap-2 w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              View All Products
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
