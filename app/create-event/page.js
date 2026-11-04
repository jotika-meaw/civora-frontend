"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import { eventSchema, toISO, minLocalInput } from "@/lib/event-schema";

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(eventSchema) });

  async function onSubmit(values) {
    setLoading(true);
    try {
      await apiFetch("/api/events", {
        method: "POST",
        auth: true,
        body: { ...values, eventDate: toISO(values.eventDate) },
      });
      toast.success("Event created successfully");
      router.push("/events");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!isPending && !session?.user) {
    router.push("/login");
    return <p className="p-10 text-center">Redirecting to login...</p>;
  }

  const input = "w-full rounded-2xl border px-4 py-2.5 text-sm outline-none focus:border-[#3569E8] dark:bg-transparent";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Create Event</h1>
      <p className="mt-1 text-slate-500">Organize an initiative for your community.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="civora-card mt-6 space-y-4 rounded-3xl bg-white p-6 dark:bg-[#111d42]">
        <input {...register("title")} placeholder="Title" className={input} />
        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        <textarea {...register("description")} placeholder="Description (min 10 chars)" rows={4} className={input} />
        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        <div className="grid gap-4 md:grid-cols-2">
          <select {...register("category")} className={input} defaultValue="">
            <option value="" disabled>Select category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input {...register("eventDate")} type="datetime-local" min={minLocalInput()} className={input} />
        </div>
        {(errors.category || errors.eventDate) && <p className="text-xs text-red-500">{errors.category?.message || errors.eventDate?.message}</p>}
        <input {...register("image")} placeholder="Image URL https://..." className={input} />
        {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
        <input {...register("location")} placeholder="Location, e.g. Agrabad, Chattogram" className={input} />
        {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
        <button disabled={loading} className="w-full rounded-full bg-[#3569E8] py-2.5 font-display font-semibold text-white disabled:opacity-60">
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
