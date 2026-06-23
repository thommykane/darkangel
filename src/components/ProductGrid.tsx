"use client";

import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  id?: string;
  masonry?: boolean;
}

export default function ProductGrid({
  products,
  title = "Collection",
  subtitle,
  id,
  masonry = true,
}: ProductGridProps) {
  return (
    <section id={id} className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-3xl tracking-wide text-black sm:text-4xl md:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 max-w-lg text-sm text-secondary sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-secondary">
            {products.length} Pieces
          </p>
        </div>

        {masonry ? (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-4 lg:gap-8">
            {products.map((product, index) => (
              <div key={product.id} className="mb-6 break-inside-avoid lg:mb-8">
                <ProductCard
                  product={product}
                  index={index}
                  tall={index % 3 === 1}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
