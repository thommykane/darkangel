"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  index?: number;
  tall?: boolean;
}

export default function ProductCard({
  product,
  index = 0,
  tall = false,
}: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: "easeOut" }}
      className="group flex break-inside-avoid flex-col"
    >
      <div
        className={`relative overflow-hidden bg-[#f7f7f7] ${
          tall ? "aspect-[3/4]" : "aspect-[4/5]"
        }`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-end justify-center bg-black/0 p-4 transition-all duration-500 group-hover:bg-black/10">
          <div className="flex w-full translate-y-4 flex-col gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:flex-row">
            <button
              type="button"
              className="flex-1 border border-white bg-white/95 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-black backdrop-blur-sm transition-colors hover:bg-black hover:text-white"
            >
              Quick View
            </button>
            <button
              type="button"
              className="flex-1 border border-white bg-black/90 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium tracking-wide text-black">
          {product.name}
        </h3>
        <p className="text-sm text-secondary">${product.price}</p>
      </div>
    </motion.article>
  );
}
