"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 text-[10px] font-medium uppercase tracking-[0.35em] text-secondary sm:text-xs"
        >
          Welcome to
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="whitespace-nowrap font-serif text-[clamp(1.75rem,6vw,5.5rem)] font-normal leading-[0.95] tracking-[0.06em] text-black"
        >
          DARK ANGEL CLOTHING
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-lg space-y-2 text-sm font-light tracking-wide text-secondary sm:text-base md:text-lg"
        >
          <p>Pretty Rebellion</p>
          <p>A Strength That&apos;s Soft. A Confidence That&apos;s Quiet.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <Link
            href="#products"
            className="min-w-[200px] border border-black bg-black px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            Shop Collection
          </Link>
          <Link
            href="#new-arrivals"
            className="min-w-[200px] border border-black bg-white px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-black hover:text-white"
          >
            New Arrivals
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.2 }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.25em] text-secondary">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="block h-8 w-px bg-border"
          />
        </div>
      </motion.div>
    </section>
  );
}
