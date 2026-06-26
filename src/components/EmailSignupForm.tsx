"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function EmailSignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cityStateZip, setCityStateZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/email-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          cityStateZip,
          phone,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Unable to join the email list.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Unable to join the email list. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h2 className="font-serif text-2xl tracking-wide text-black">You&apos;re on the list.</h2>
        <p className="mt-4 text-sm text-secondary">
          Thank you for joining Dark Angel Clothing. We&apos;ll be in touch with new products and exclusive offers.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block border border-black bg-black px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-[11px] font-medium uppercase tracking-[0.2em] text-secondary">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-[11px] font-medium uppercase tracking-[0.2em] text-secondary">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="cityStateZip" className="text-[11px] font-medium uppercase tracking-[0.2em] text-secondary">
          City, State, Zip
        </label>
        <input
          id="cityStateZip"
          type="text"
          value={cityStateZip}
          onChange={(e) => setCityStateZip(e.target.value)}
          required
          className="w-full border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-[11px] font-medium uppercase tracking-[0.2em] text-secondary">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-[11px] font-medium uppercase tracking-[0.2em] text-secondary">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
        />
      </div>

      <p className="text-xs leading-relaxed text-secondary">
        By hitting enter you agree to be notified by Dark Angel Clothing about new products and discounts.
      </p>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full border border-black bg-black px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-50"
      >
        {loading ? "Joining..." : "Join Email List"}
      </button>
    </form>
  );
}
