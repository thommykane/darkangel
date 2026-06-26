import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Update Password",
};

export default async function ChangePasswordPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  if (!session.mustChangePassword) {
    redirect("/admin");
  }

  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-secondary">
          Security
        </p>
        <h1 className="font-serif text-4xl tracking-wide text-black sm:text-5xl">
          Update Your Password
        </h1>
        <div className="mt-12 text-left">
          <ChangePasswordForm />
        </div>
      </div>
    </section>
  );
}
