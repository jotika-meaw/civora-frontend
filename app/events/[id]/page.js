import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, CalendarDays, Users, Mail } from "lucide-react";
import JoinButton from "@/components/join-button";
import { formatDate } from "@/lib/constants";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getEvent(id) {
  const res = await fetch(`${API}/api/events/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load event");
  return res.json();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const event = await getEvent(id);
    return { title: event ? `${event.title} — CIVORA` : "Event — CIVORA" };
  } catch {
    return { title: "Event — CIVORA" };
  }
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const event = await getEvent(id).catch(() => null);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/events" className="text-sm font-semibold text-[#3569E8]">← Back to events</Link>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.image} alt={event.title} className="h-80 w-full rounded-[2rem] object-cover" />
        <div>
          <span className="rounded-full bg-[#FF725E] px-3 py-1 text-xs font-bold text-white">{event.category}</span>
          <h1 className="font-display mt-3 text-3xl font-bold md:text-4xl">{event.title}</h1>
          <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p className="flex items-center gap-2"><MapPin size={16} /> {event.location}</p>
            <p className="flex items-center gap-2"><CalendarDays size={16} /> {formatDate(event.eventDate)}</p>
            <p className="flex items-center gap-2"><Users size={16} /> {event.participantCount ?? 0} participants</p>
            <p className="flex items-center gap-2"><Mail size={16} /> Organized by {event.creatorEmail}</p>
          </div>
          <div className="mt-6">
            <JoinButton eventId={event._id} isJoined={event.isJoined} participantCount={event.participantCount ?? 0} />
          </div>
        </div>
      </div>
      <div className="civora-card mt-8 rounded-3xl bg-white p-6 dark:bg-[#111d42]">
        <h2 className="font-display text-xl font-bold">About this event</h2>
        <p className="mt-2 whitespace-pre-line text-slate-600 dark:text-slate-300">{event.description}</p>
      </div>
    </div>
  );
}
