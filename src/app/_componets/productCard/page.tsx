"use client";
import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductItem } from "@/types/ProductInterface";
import Image from "next/image";
import Link from "next/link";
import AddBtn from "../addBtn/addBtn";

function SmallDropdown({ prod }: { prod: ProductItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const brandId = prod.brand?._id;
  const brandName = prod.brand?.name;
  const categoryId = prod.category?._id;
  const categoryName = prod.category?.name;
  const sub =
    Array.isArray(prod.subcategory) && prod.subcategory.length > 0
      ? prod.subcategory[0]
      : null;

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="ml-2 inline-flex items-center justify-center rounded-full p-1 hover:bg-muted transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
        </svg>
      </button>

      {open && (
        <div className="absolute -right-10 z-20 mt-2 w-44 rounded-md border bg-background p-2 shadow-lg">
          <div className="flex flex-col gap-2">
            {brandId && brandName && (
              <Link
                href={`/products?brand=${brandId}`}
                onClick={() => setOpen(false)}
                className="block"
              >
                <Badge variant="secondary" className="w-full text-left">
                  {brandName}
                </Badge>
              </Link>
            )}

            {categoryId && categoryName && (
              <Link
                href={`/products?category=${categoryId}`}
                onClick={() => setOpen(false)}
                className="block"
              >
                <Badge variant="secondary" className="w-full text-left">
                  {categoryName}
                </Badge>
              </Link>
            )}

            {sub && sub._id && sub.name && (
              <Link
                href={`/products?category=${sub._id}`}
                onClick={() => setOpen(false)}
                className="block"
              >
                <Badge variant="secondary" className="w-full text-left">
                  {sub.name}
                </Badge>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductCard({ prod }: { prod: ProductItem }) {
  return (
    <Card className="group relative mx-auto w-full max-w-sm overflow-hidden border card-hover">
      <Link href={`/Productdetails/${prod._id}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
          <Image
            fill
            src={prod.imageCover || "/placeholder.png"}
            alt={prod.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardHeader className="space-y-3 px-4 py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-base font-semibold leading-tight">
              <span className="line-clamp-1">
                {prod.title.split(" ").slice(0, 4).join(" ")}
              </span>
              <SmallDropdown prod={prod} />
            </CardTitle>

            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              {prod.ratingsAverage}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-yellow-400"
              >
                <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </span>
          </div>

          <CardDescription>
            <span className="text-sm font-semibold text-primary">
              {prod.price} EGP
            </span>
          </CardDescription>
        </CardHeader>
      </Link>

      <div className="p-4 pt-0">
        <AddBtn productId={prod._id} />
      </div>
    </Card>
  );
}
