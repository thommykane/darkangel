import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getEmailSubscribers } from "@/lib/users";

export const metadata: Metadata = {
  title: "Email List",
};

export default async function EmailListPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (session.mustChangePassword) {
    redirect("/change-password");
  }

  const subscribers = await getEmailSubscribers();

  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="text-[10px] font-medium uppercase tracking-[0.2em] text-secondary transition-colors hover:text-black"
        >
          ← Back to Admin
        </Link>

        <h1 className="mt-6 font-serif text-4xl tracking-wide text-black sm:text-5xl">
          Email List
        </h1>
        <p className="mt-2 text-sm text-secondary">
          {subscribers.length} subscriber{subscribers.length === 1 ? "" : "s"}
        </p>

        <div className="mt-10 overflow-x-auto border border-border">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-border bg-[#fafafa]">
              <tr>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-secondary">
                  First Name
                </th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-secondary">
                  Last Name
                </th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-secondary">
                  City
                </th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-secondary">
                  State
                </th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-secondary">
                  Zip
                </th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-secondary">
                  Phone
                </th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-secondary">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-secondary">
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3">{subscriber.first_name}</td>
                    <td className="px-4 py-3">{subscriber.last_name}</td>
                    <td className="px-4 py-3">
                      {subscriber.city ?? subscriber.city_state_zip ?? "—"}
                    </td>
                    <td className="px-4 py-3">{subscriber.state ?? "—"}</td>
                    <td className="px-4 py-3">{subscriber.zip ?? "—"}</td>
                    <td className="px-4 py-3">{subscriber.phone}</td>
                    <td className="px-4 py-3">{subscriber.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
