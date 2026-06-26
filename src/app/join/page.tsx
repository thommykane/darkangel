import type { Metadata } from "next";
import EmailSignupForm from "@/components/EmailSignupForm";

export const metadata: Metadata = {
  title: "Join Our Email List",
};

export default function JoinPage() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-secondary">
          Stay Connected
        </p>
        <h1 className="font-serif text-4xl tracking-wide text-black sm:text-5xl">
          Join Our Email List
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-secondary">
          Be the first to know about new drops, exclusive offers, and Dark Angel news.
        </p>
        <div className="mt-12 text-left">
          <EmailSignupForm />
        </div>
      </div>
    </section>
  );
}
