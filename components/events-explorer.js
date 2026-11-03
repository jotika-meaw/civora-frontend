"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventCard from "@/components/event-card";
import { EventCardSkeleton } from "@/components/skeletons";
import { API_URL } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";

export default function EventsExplorer({ initialCategory = "" }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("asc");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (search) q.set("search", search);
      if (category) q.set("category", category);
      if (location) q.set("location", location);
      q.set("sort", sort);
      q.set("limit", "24");
      const res = await fetch(`${API_URL}/api/events?${q.toString()}`, { cache: "no-store" });
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    const q = new URLSearchParams();
    if (initialCategory) q.set("category", initialCategory);
    q.set("sort", "asc");
    q.set("limit", "24");
    fetch(`${API_URL}/api/events?${q.toString()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setItems(d.items || []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clear() {
    setSearch("");
    setCategory("");
    setLocation("");
    setSort("asc");
    router.push("/events");
    setTimeout(load, 0);
  }

  return (
    <div>
      <div className="civora-card grid gap-3 rounded-3xl bg-white p-4 md:grid-cols-5 dark:bg-[#111d42]">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name..." className="rounded-2xl border px-4 py-2 text-sm outline-none focus:border-[#3569E8]" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border px-4 py-2 text-sm outline-none">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Filter by location..." className="rounded-2xl border px-4 py-2 text-sm outline-none focus:border-[#3569E8]" />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-2xl border px-4 py-2 text-sm outline-none">
          <option value="asc">Nearest date first</option>
          <option value="desc">Farthest date first</option>
        </select>
        <div className="flex gap-2">
          <button onClick={load} className="flex-1 rounded-full bg-[#3569E8] px-4 py-2 text-sm font-semibold text-white">Apply</button>
          <button onClick={clear} className="rounded-full border px-4 py-2 text-sm">Clear</button>
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-3xl border border-dashed p-10 text-center text-slate-500">
            No events match your filters.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((e) => (
              <EventCard key={e._id} event={e} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
