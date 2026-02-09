"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

type Props = {
  images?: string[];
};

export default function productimg({ images }: Props) {
  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div className="w-full aspect-[4/5] rounded-xl border bg-muted flex items-center justify-center text-muted-foreground">
        No product images
      </div>
    );
  }

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{ loop: true }}
      className="w-full"
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-muted">
              <Image
                src={src}
                alt="product image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority={index === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
