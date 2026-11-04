"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { apiFetch, formatDate } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import { eventSchema, toISO, toLocalInput, minLocalInput } from "@/lib/event-schema";
import { TableSkeleton } from "@/components/skeletons";

const input = "w-full rounded-2xl border px-4 py-2.5 text-sm outline-none focus:border-[#3569E8] dark:bg-transparent";

function EditEventModal({ event, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      category: event.category,
      image: event.image,
      location: event.location,
      eventDate: toLocalInput(event.eventDate),
    },
  });

  async function onSubmit(values) {
    setSaving(true);
    try {
      const updated = await apiFetch(`/api/events/${event._id}`, {
        method: "PATCH",
        auth: true,
        body: { ...values, eventDate: toISO(values.eventDate) },
      });
      onSaved(updated);
      toast.success("Event updated");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <dialog open className="modal modal-open">
      <form onSubmit={handleSubmit(onSubmit)} className="modal-box max-w-lg space-y-3 rounded-3xl bg-white p-6 dark:bg-[#111d42]">
        <h2 className="font-display text-xl font-bold">Edit event</h2>
        <input {...register("title")} placeholder="Title" className={input} />
        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        <textarea {...register("description")} placeholder="Description" rows={4} className={input} />
        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        <div className="grid gap-3 md:grid-cols-2">
          <select {...register("category")} className={input}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input {...register("eventDate")} type="datetime-local" min={minLocalInput()} className={input} />
        </div>
        {(errors.category || errors.eventDate) && <p className="text-xs text-red-500">{errors.category?.message || errors.eventDate?.message}</p>}
        <input {...register("image")} placeholder="Image URL https://..." className={input} />
        {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
        <input {...register("location")} placeholder="Location" className={input} />
        {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
        <div className="flex gap-2 pt-2">
          <button disabled={saving} className="flex-1 rounded-full bg-[#3569E8] py-2.5 font-display text-sm font-semibold text-white disabled:opacity-60">
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button type="button" onClick={onClose} className="rounded-full border px-5 py-2.5 text-sm">Cancel</button>
        </div>
      </form>
      <div className="modal-backdrop bg-black/50" onClick={onClose} />
    </dialog>
  );
}

function DeleteEventModal({ event, onCancel, onConfirm, deleting }) {
  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-sm rounded-3xl bg-white p-6 text-center dark:bg-[#111d42]">
        <h2 className="font-display text-xl font-bold">Delete this event?</h2>
        <p className="mt-2 text-sm text-slate-500">
          &ldquo;{event.title}&rdquo; and all of its participant records will be removed. This cannot be undone.
        </p>
        <div className="mt-5 flex gap-2">
          <button onClick={onConfirm} disabled={deleting} className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
            {deleting ? "Deleting..." : "Delete"}
          </button>
          <button onClick={onCancel} className="flex-1 rounded-full border py-2.5 text-sm">Cancel</button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onCancel} />
    </dialog>
  );
}

export default function ManageEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/login");
      return;
    }
    apiFetch("/api/my-events", { auth: true })
      .then((d) => setItems(d.items || []))
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [isPending, session, router]);

  async function remove() {
    setDeleting(true);
    try {
      await apiFetch(`/api/events/${deletingEvent._id}`, { method: "DELETE", auth: true });
      setItems((prev) => prev.filter((e) => e._id !== deletingEvent._id));
      setDeletingEvent(null);
      toast.success("Event deleted");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  }

  function onSaved(updated) {
    setItems((prev) => prev.map((x) => (x._id === updated._id ? { ...x, ...updated } : x)));
    setEditing(null);
  }

  if (isPending || loading) {
    return <div className="mx-auto max-w-5xl px-4 py-10"><TableSkeleton /></div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Manage Events</h1>
          <p className="mt-1 text-slate-500">Only events you organized. Edit or delete them here.</p>
        </div>
        <Link href="/create-event" className="rounded-full bg-[#3569E8] px-5 py-2 text-sm font-semibold text-white">+ New</Link>
      </div>

      {!items.length ? (
        <div className="mt-6 rounded-3xl border border-dashed p-10 text-center text-slate-500">
          You have not organized any events yet.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((e) => (
            <div key={e._id} className="civora-card flex flex-col gap-3 rounded-3xl bg-white p-4 md:flex-row md:items-center dark:bg-[#111d42]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.image} alt={e.title} className="h-20 w-full rounded-2xl object-cover md:w-28" />
              <div className="flex-1">
                <p className="font-display font-bold">{e.title}</p>
                <p className="text-xs text-slate-500">{e.location} • {formatDate(e.eventDate)} • {e.participantCount ?? 0} joined • {e.category}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/events/${e._id}`} className="rounded-full border px-4 py-1.5 text-sm">View</Link>
                <button onClick={() => setEditing(e)} className="rounded-full border px-4 py-1.5 text-sm">Edit</button>
                <button onClick={() => setDeletingEvent(e)} className="rounded-full bg-red-50 px-4 py-1.5 text-sm text-red-600 dark:bg-red-500/10">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && <EditEventModal event={editing} onClose={() => setEditing(null)} onSaved={onSaved} />}
      {deletingEvent && (
        <DeleteEventModal event={deletingEvent} deleting={deleting} onCancel={() => setDeletingEvent(null)} onConfirm={remove} />
      )}
    </div>
  );
}
