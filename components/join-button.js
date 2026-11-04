"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

export default function JoinButton({ eventId, isJoined: initial, participantCount }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [joined, setJoined] = useState(initial);
  const [loading, setLoading] = useState(false);

  // The details page renders on the server without the user's token,
  // so re-check join status from the browser once the session is known.
  useEffect(() => {
    if (isPending || !session?.user) return;
    let cancelled = false;
    apiFetch(`/api/events/${eventId}`, { auth: true })
      .then((e) => {
        if (!cancelled && e?.isJoined) setJoined(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isPending, session, eventId]);

  async function join() {
    if (!session?.user) {
      toast.error("Please login to join events");
      router.push("/login");
      return;
    }
    setLoading(true);
    try {
      await apiFetch(`/api/events/${eventId}/join`, { method: "POST", auth: true });
      setJoined(true);
      toast.success("You joined this event");
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (joined) {
    return (
      <div className="rounded-2xl bg-green-50 px-5 py-3 text-sm font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-300">
        ✓ You have joined • {participantCount} participants
      </div>
    );
  }

  return (
    <button
      onClick={join}
      disabled={loading || isPending}
      className="w-full rounded-full bg-[#FF725E] py-3 font-display font-semibold text-white hover:bg-[#e55a45] disabled:opacity-60 md:w-auto md:px-10"
    >
      {loading ? "Joining..." : "Join Event"}
    </button>
  );
}
