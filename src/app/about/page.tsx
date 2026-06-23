import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dark Angel was created for the girls who never quite fit into the mold. Athleisure for the beautifully complicated.",
};

export default function AboutPage() {
  return (
    <section className="bg-white">
      <AboutContent />
    </section>
  );
}
