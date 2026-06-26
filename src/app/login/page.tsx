import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect(session.mustChangePassword ? "/change-password" : "/admin");
  }

  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-secondary">
          Admin Access
        </p>
        <h1 className="font-serif text-4xl tracking-wide text-black sm:text-5xl">
          Sign In
        </h1>
        <div className="mt-12">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
