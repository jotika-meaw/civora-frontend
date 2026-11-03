"use client";

import { useEffect, useState } from "react";
import EventCard from "./event-card";
import { EventCardSkeleton } from "./skeletons";
import { API_URL } from "@/lib/api";

export default function HomeEvents() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/events/recent?limit=6`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-dashed p-10 text-center text-slate-500">
        No upcoming events yet. Be the first to organize one.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((e) => (
        <EventCard key={e._id} event={e} />
      ))}
    </div>
  );
}
