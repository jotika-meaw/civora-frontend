import EventsExplorer from "@/components/events-explorer";

export const metadata = { title: "Upcoming Events — CIVORA" };

export default async function EventsPage({ searchParams }) {
  const sp = await searchParams;
  const initialCategory = sp?.category || "";
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold md:text-4xl">Upcoming Events</h1>
      <p className="mt-1 text-slate-500">Search, filter by location and category, sort by nearest date.</p>
      <div className="mt-6">
        <EventsExplorer initialCategory={initialCategory} />
      </div>
    </div>
  );
}
