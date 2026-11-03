import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

// Brand marks as inline SVG (lucide no longer ships brand icons). X uses the current logo, not the old bird.
const SOCIALS = [
  {
    label: "X",
    href: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-[#172554] text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold text-white">CIVORA</p>
          <p className="mt-1 text-[11px] tracking-[0.2em] text-slate-400">COMMUNITY • PEOPLE • ACTION</p>
          <p className="mt-4 text-sm text-slate-300">
            Turn local care into collective action. Discover events, organize initiatives, create impact.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-[#FF725E]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display font-semibold text-white">Explore</p>
          <div className="mt-3 space-y-2 text-sm">
            <Link href="/" className="block hover:text-white">Home</Link>
            <Link href="/events" className="block hover:text-white">Upcoming Events</Link>
            <Link href="/create-event" className="block hover:text-white">Organize an Event</Link>
            <Link href="/joined-events" className="block hover:text-white">Joined Events</Link>
          </div>
        </div>
        <div>
          <p className="font-display font-semibold text-white">Account</p>
          <div className="mt-3 space-y-2 text-sm">
            <Link href="/login" className="block hover:text-white">Login</Link>
            <Link href="/register" className="block hover:text-white">Register</Link>
            <Link href="/profile" className="block hover:text-white">Profile</Link>
            <Link href="/manage-events" className="block hover:text-white">Manage Events</Link>
          </div>
        </div>
        <div>
          <p className="font-display font-semibold text-white">Contact</p>
          <div className="mt-3 space-y-2 text-sm text-slate-300">
            <p className="flex items-center gap-2"><MapPin size={15} /> Dhaka, Bangladesh</p>
            <p className="flex items-center gap-2"><Mail size={15} /> hello@civora.org</p>
            <p className="flex items-center gap-2"><Phone size={15} /> +880 1700-000000</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © 2026 CIVORA • Built for community impact
      </div>
    </footer>
  );
}
