"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

export default function HomeStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/stats/community`, { cache: "no-store" })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  const cards = [
    { label: "Events organized", value: stats?.totalEvents ?? "—" },
    { label: "Volunteer participations", value: stats?.totalParticipations ?? "—" },
    { label: "Upcoming initiatives", value: stats?.upcomingCount ?? "—" },
    { label: "Newsletter community", value: stats?.subscriberCount ?? "—" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="civora-card rounded-3xl bg-white p-6 text-center dark:bg-[#111d42]">
          <p className="font-display text-3xl font-bold text-[#3569E8]">{c.value}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
