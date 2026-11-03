"use client";

import Link from "next/link";
import { MapPin, CalendarDays, Users } from "lucide-react";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/constants";

export default function EventCard({ event }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="civora-card flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-[#111d42]"
    >
      <div className="relative h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.image} alt={event.title} className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute left-3 top-3 rounded-full bg-[#FF725E] px-3 py-1 text-xs font-bold text-white">
          {event.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-lg font-bold leading-snug">{event.title}</h3>
        <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <MapPin size={15} /> {event.location}
        </p>
        <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <CalendarDays size={15} /> {formatDate(event.eventDate)}
        </p>
        <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <Users size={15} /> {event.participantCount ?? 0} joined
        </p>
        <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{event.description}</p>
        <Link
          href={`/events/${event._id}`}
          className="mt-auto rounded-full bg-[#3569E8] px-4 py-2 text-center font-display text-sm font-semibold text-white hover:bg-[#254fc0]"
        >
          View Event
        </Link>
      </div>
    </motion.article>
  );
}
