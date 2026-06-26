"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";

export default function HeaderAuth() {
  const router = useRouter();
  const { user, loaded, setUser } = useSession();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  if (!loaded) {
    return (
      <div className="h-4 w-16 animate-pulse rounded bg-white/20" aria-hidden="true" />
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-[10px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:text-white/70"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <button
        type="button"
        onClick={handleLogout}
        className="text-[10px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:text-white/70"
      >
        Logout
      </button>
      {!user.mustChangePassword && (
        <Link
          href="/admin"
          className="text-[10px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:text-white/70"
        >
          Admin
        </Link>
      )}
    </div>
  );
}
