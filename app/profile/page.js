"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { TableSkeleton } from "@/components/skeletons";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [me, setMe] = useState(null);
  const [stats, setStats] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/login");
      return;
    }
    let cancelled = false;
    apiFetch("/api/users/me", { auth: true })
      .then((data) => {
        if (cancelled) return;
        setMe(data);
        setName(data?.name || session.user.name || "");
        setImage(data?.image || session.user.image || "");
      })
      .catch(() => {});
    apiFetch("/api/stats/me", { auth: true })
      .then((data) => {
        if (cancelled) return;
        setStats(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isPending, session, router]);

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await apiFetch("/api/users/me", {
        method: "PATCH",
        auth: true,
        body: { name, image: image || null },
      });
      setMe(updated);
      toast.success("Profile updated");
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (isPending) {
    return <div className="mx-auto max-w-4xl px-4 py-10"><TableSkeleton /></div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Profile</h1>
      <p className="mt-1 text-slate-500">{me?.email || session?.user?.email}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["Organized", stats?.organized ?? "—"],
          ["Joined", stats?.joined ?? "—"],
          ["Upcoming", stats?.upcomingJoined ?? "—"],
        ].map(([l, v]) => (
          <div key={l} className="civora-card rounded-3xl bg-white p-6 text-center dark:bg-[#111d42]">
            <p className="font-display text-3xl font-bold text-[#FF725E]">{v}</p>
            <p className="mt-1 text-sm text-slate-500">Events {l.toLowerCase()}</p>
          </div>
        ))}
      </div>

      <form onSubmit={save} className="civora-card mt-6 space-y-4 rounded-3xl bg-white p-6 dark:bg-[#111d42]">
        <h2 className="font-display text-xl font-bold">Account information</h2>
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image || session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "C")}`}
            alt="avatar"
            className="h-16 w-16 rounded-full object-cover"
          />
          <p className="text-sm text-slate-500">Display name and photo appear in the navbar and event organization.</p>
        </div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Display name" className="w-full rounded-2xl border px-4 py-2.5 text-sm outline-none focus:border-[#3569E8] dark:bg-transparent" />
        <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Photo URL" className="w-full rounded-2xl border px-4 py-2.5 text-sm outline-none focus:border-[#3569E8] dark:bg-transparent" />
        <button disabled={saving} className="rounded-full bg-[#3569E8] px-6 py-2.5 font-display font-semibold text-white disabled:opacity-60">
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>

      {!!stats?.recentEvents?.length && (
        <div className="civora-card mt-6 rounded-3xl bg-white p-6 dark:bg-[#111d42]">
          <h2 className="font-display text-xl font-bold">Personal volunteering history</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {stats.recentEvents.map((e) => (
              <li key={e._id}>• {e.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
