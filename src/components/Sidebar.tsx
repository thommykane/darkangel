"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/constants";
import { useSidebar } from "./SidebarContext";

export default function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
            onClick={close}
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 top-0 z-50 flex h-full w-[min(320px,85vw)] flex-col bg-black shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="relative border-b border-white/10 px-6 py-8">
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center text-2xl font-light text-white transition-opacity hover:opacity-50"
              >
                ×
              </button>

              <Link
                href="/"
                onClick={close}
                className="mx-auto block w-fit"
              >
                <div className="relative flex h-[125px] w-[125px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black">
                  <Image
                    src="/logo/dark.angel.logo.png"
                    alt="Dark Angel Clothing"
                    fill
                    sizes="125px"
                    className="object-cover object-center scale-[1.6]"
                  />
                </div>
              </Link>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className="block border-b border-transparent py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:text-white/70"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-white/10 px-6 py-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                Minimal Luxury. Maximum Presence.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
