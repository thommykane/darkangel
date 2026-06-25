"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { navLinks } from "@/lib/constants";
import { useSidebar } from "./SidebarContext";

export default function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Left: Hamburger + Logo */}
        <div className="flex w-1/4 items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label="Open menu"
            className="group flex h-10 w-10 flex-col items-center justify-center gap-1.5 transition-opacity hover:opacity-60"
          >
            <span className="block h-px w-5 bg-white transition-transform group-hover:scale-x-110" />
            <span className="block h-px w-5 bg-white transition-transform group-hover:scale-x-110" />
            <span className="block h-px w-5 bg-white transition-transform group-hover:scale-x-110" />
          </button>

          <Link href="/" className="shrink-0">
            <div className="relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white">
              <Image
                src="/logo/logo.jpg"
                alt="Dark Angel Clothing"
                fill
                sizes="60px"
                className="object-contain object-center scale-[1.45] p-0.5"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden w-2/4 items-center justify-center lg:flex">
          <ul className="flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="group relative py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:text-white/70"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Spacer / Mobile label */}
        <div className="flex w-1/4 items-center justify-end">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden text-[10px] font-medium uppercase tracking-[0.25em] text-white/70 sm:block"
          >
            Dark Angel
          </motion.span>
        </div>
      </div>
    </header>
  );
}
