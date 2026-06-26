import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (session.mustChangePassword) {
    redirect("/change-password");
  }

  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-secondary">
          Dashboard
        </p>
        <h1 className="font-serif text-4xl tracking-wide text-black sm:text-5xl">
          Admin
        </h1>
        <p className="mt-4 text-sm text-secondary">
          Signed in as {session.name} ({session.email})
        </p>

        <div className="mt-12 border border-border">
          <Link
            href="/admin/email-list"
            className="flex items-center justify-between px-6 py-5 text-sm font-medium uppercase tracking-[0.18em] text-black transition-colors hover:bg-black hover:text-white"
          >
            Email List
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
