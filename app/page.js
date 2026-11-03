import Link from "next/link";
import HomeStats from "@/components/home-stats";
import HomeEvents from "@/components/home-events";
import NewsletterForm from "@/components/newsletter-form";
import { CATEGORIES } from "@/lib/constants";

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80", alt: "Volunteers packing food" },
  { src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80", alt: "Community cleanup" },
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80", alt: "Helping hands" },
  { src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80", alt: "Plantation drive" },
];

export default function Home() {
  return (
    <div>
      {/* 1. Hero — asymmetric editorial */}
      <section className="bg-[#F5F7FC] dark:bg-[#0b1530]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="inline-block rounded-full bg-[#FFD166] px-4 py-1 text-xs font-bold tracking-widest text-[#172554]">
              MAKE YOUR COMMUNITY BETTER
            </p>
            <h1 className="font-display mt-4 text-4xl font-bold leading-tight md:text-6xl">
              Your Community. Your People. <span className="text-[#3569E8]">Your Impact.</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Discover meaningful local events and become part of something bigger.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/events" className="rounded-full bg-[#3569E8] px-6 py-3 font-display font-semibold text-white hover:bg-[#254fc0]">
                Explore Events →
              </Link>
              <Link href="/create-event" className="rounded-full border border-[#3569E8] px-6 py-3 font-display font-semibold text-[#3569E8] hover:bg-[#3569E8] hover:text-white">
                Organize an Event
              </Link>
            </div>
            <div className="mt-8 flex gap-8">
              {[
                ["Events", "Discover"],
                ["People", "Connect"],
                ["Impact", "Contribute"],
              ].map(([a, b]) => (
                <div key={a}>
                  <p className="font-display text-xl font-bold">{a}</p>
                  <p className="text-sm text-slate-500">{b}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
              alt="Community volunteers"
              className="h-[420px] w-full rounded-[2.5rem] object-cover"
            />
            <div className="absolute -bottom-5 -left-5 rounded-3xl bg-white p-4 shadow-xl dark:bg-[#111d42]">
              <p className="font-display text-2xl font-bold text-[#FF725E]">12k+</p>
              <p className="text-xs text-slate-500">volunteers acting weekly</p>
            </div>
            <div className="absolute -top-4 -right-3 rounded-3xl bg-[#172554] p-4 text-white shadow-xl">
              <p className="font-display text-lg font-bold">CIVORA</p>
              <p className="text-[10px] tracking-widest opacity-70">PEOPLE • ACTION</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Impact statistics */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-2xl font-bold">Community impact</h2>
        <p className="mt-1 text-slate-500">Live numbers from the CIVORA platform.</p>
        <div className="mt-6">
          <HomeStats />
        </div>
      </section>

      {/* 3. Trending upcoming events */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Trending upcoming events</h2>
            <p className="mt-1 text-slate-500">Soonest initiatives across the community.</p>
          </div>
          <Link href="/events" className="font-semibold text-[#3569E8]">View all →</Link>
        </div>
        <div className="mt-6">
          <HomeEvents />
        </div>
      </section>

      {/* 4. Explore by category */}
      <section className="bg-[#F5F7FC] py-12 dark:bg-white/5">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl font-bold">Explore by category</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                href={`/events?category=${encodeURIComponent(c)}`}
                className="rounded-full border bg-white px-5 py-2.5 text-sm font-semibold hover:border-[#3569E8] hover:text-[#3569E8] dark:bg-transparent"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How CIVORA works */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-2xl font-bold">How CIVORA works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["1. Discover", "Search events by name, filter by location and category, sort by nearest date."],
            ["2. Join & organize", "Join an initiative in one click, or create your own with validation and ownership controls."],
            ["3. Create impact", "Track participations, manage your events and grow your volunteering history."],
          ].map(([t, d]) => (
            <div key={t} className="civora-card rounded-3xl bg-white p-6 dark:bg-[#111d42]">
              <p className="font-display text-lg font-bold text-[#3569E8]">{t}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Community gallery */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="font-display text-2xl font-bold">Community stories</h2>
        <p className="mt-1 text-slate-500">Moments from recent drives and meetups.</p>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((g) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={g.src} src={g.src} alt={g.alt} className="h-44 w-full rounded-3xl object-cover" loading="lazy" />
          ))}
        </div>
      </section>

      {/* 7. Volunteer CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-[2.5rem] bg-[#172554] p-10 text-center text-white md:p-14">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to make an impact?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Organize a cleanup, food drive or plantation — CIVORA handles discovery, joining and tracking.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/create-event" className="rounded-full bg-[#FF725E] px-6 py-3 font-display font-semibold text-white hover:bg-[#e55a45]">
              Start organizing
            </Link>
            <Link href="/events" className="rounded-full bg-white px-6 py-3 font-display font-semibold text-[#172554]">
              Find an event
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Newsletter */}
      <section className="mx-auto max-w-6xl px-4 pb-4 text-center">
        <h2 className="font-display text-2xl font-bold">Stay in the loop</h2>
        <p className="mt-1 text-slate-500">Monthly community opportunities, no spam.</p>
        <NewsletterForm />
      </section>
    </div>
  );
}
