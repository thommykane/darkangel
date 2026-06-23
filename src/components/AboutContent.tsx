"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export default function AboutContent() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <motion.header
        {...fadeUp}
        className="mb-16 text-center sm:mb-20"
      >
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-secondary">
          Our Story
        </p>
        <h1 className="font-serif text-4xl tracking-wide text-black sm:text-5xl md:text-6xl">
          About
        </h1>
      </motion.header>

      <div className="space-y-10 text-base leading-relaxed text-secondary sm:text-lg sm:leading-relaxed">
        <motion.p {...fadeUp}>
          Dark Angel was created for the girls who never quite fit into the
          mold.
        </motion.p>

        <motion.div {...fadeUp} className="space-y-4">
          <p>The girls who can be beautiful without feeling seen.</p>
          <p>The girls whose minds never stop moving.</p>
          <p>The girls who crave quiet in a world that never stops talking.</p>
        </motion.div>

        <motion.div {...fadeUp} className="space-y-4 border-y border-border py-10">
          <p>We believe strength can be soft.</p>
          <p>That confidence doesn&apos;t need to be loud.</p>
          <p>
            That wellness isn&apos;t about becoming someone else—it&apos;s about
            coming home to yourself.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="space-y-4">
          <p>
            Dark Angel exists at the intersection of discipline and daydreaming.
          </p>
          <p>For the girls who lift weights and carry books.</p>
          <p>Who choose long walks over crowded rooms.</p>
          <p>Who find comfort in solitude but still love deeply.</p>
          <p>Who can be sweet and sharp.</p>
          <p>Warm and distant.</p>
          <p>Light and shadow.</p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="space-y-4 pt-6 text-center"
        >
          <p className="font-serif text-xl tracking-wide text-black sm:text-2xl">
            This is athleisure for the beautifully complicated.
          </p>
          <p>For moonlit minds and strong bodies.</p>
          <p className="pt-4 font-serif text-2xl tracking-[0.12em] text-black sm:text-3xl">
            Welcome to Dark Angel.
          </p>
        </motion.div>
      </div>
    </article>
  );
}
