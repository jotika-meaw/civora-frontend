"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { apiFetch, formatDate } from "@/lib/api";
import { TableSkeleton } from "@/components/skeletons";

export default function JoinedEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/login");
      return;
    }
    apiFetch("/api/my-joined-events", { auth: true })
      .then((d) => setItems(d.items || []))
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [isPending, session, router]);

  if (isPending || loading) {
    return <div className="mx-auto max-w-5xl px-4 py-10"><TableSkeleton /></div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Joined Events</h1>
      <p className="mt-1 text-slate-500">Your participations, sorted by event date.</p>
      {!items.length ? (
        <div className="mt-6 rounded-3xl border border-dashed p-10 text-center text-slate-500">
          You have not joined any events yet. <Link href="/events" className="font-semibold text-[#3569E8]">Explore events</Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((e) => (
            <div key={e._id} className="civora-card flex flex-col gap-3 rounded-3xl bg-white p-4 md:flex-row md:items-center dark:bg-[#111d42]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.image} alt={e.title} className="h-20 w-full rounded-2xl object-cover md:w-28" />
              <div className="flex-1">
                <p className="font-display font-bold">{e.title}</p>
                <p className="text-xs text-slate-500">
                  {e.location} • {formatDate(e.eventDate)} • joined {formatDate(e.joinedAt)} • {e.participantCount ?? 0} participants
                </p>
              </div>
              <Link href={`/events/${e._id}`} className="rounded-full bg-[#3569E8] px-4 py-1.5 text-center text-sm font-semibold text-white">Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
