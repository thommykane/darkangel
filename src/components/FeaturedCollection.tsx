"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";

interface FeaturedCollectionProps {
  product: Product;
}

export default function FeaturedCollection({ product }: FeaturedCollectionProps) {
  return (
    <section className="bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto aspect-[16/9] max-h-[70vh] w-full max-w-7xl overflow-hidden sm:aspect-[21/9]"
      >
        <Image
          src={product.image}
          alt="Dark Angel Essentials"
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 sm:px-12 md:px-16 lg:px-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/80"
          >
            Featured Collection
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="max-w-xl font-serif text-4xl leading-tight tracking-wide text-white sm:text-5xl md:text-6xl"
          >
            Dark Angel Essentials
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8"
          >
            <Link
              href="#products"
              className="inline-block border border-white bg-white px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-white"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
