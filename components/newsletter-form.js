"use client";

import { useState } from "react";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Subscription failed");
      toast.success(data?.message || "Subscribed");
      setEmail("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-full border px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-[#3569E8]"
      />
      <button
        disabled={loading}
        className="rounded-full bg-[#FF725E] px-5 py-2.5 font-display text-sm font-semibold text-white hover:bg-[#e55a45] disabled:opacity-60"
      >
        {loading ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
