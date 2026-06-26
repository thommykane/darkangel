"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordForm() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Unable to update password.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-6">
      <p className="text-sm leading-relaxed text-secondary">
        For your security, please update your password before continuing.
      </p>

      <div className="space-y-2">
        <label htmlFor="newPassword" className="text-[11px] font-medium uppercase tracking-[0.2em] text-secondary">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={8}
          className="w-full border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-[11px] font-medium uppercase tracking-[0.2em] text-secondary">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
          className="w-full border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full border border-black bg-black px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
