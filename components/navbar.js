"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, LogOut, PlusCircle, LayoutDashboard, Ticket, User } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = session?.user;

  async function handleLogout() {
    await signOut();
    setMenuOpen(false);
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur dark:bg-[#0b1530]/85">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#3569E8] font-display text-lg font-bold text-white">
            C
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-wide">CIVORA</span>
            <span className="block text-[10px] tracking-[0.2em] text-slate-500 dark:text-slate-400">
              COMMUNITY • PEOPLE • ACTION
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {publicLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                pathname === l.href
                  ? "font-semibold text-[#3569E8]"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full border p-2 hover:bg-slate-100 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {/* Pick the icon in CSS so server and client markup match */}
            <Sun size={16} className="hidden dark:block" />
            <Moon size={16} className="dark:hidden" />
          </button>
          {!isPending && !user && (
            <Link
              href="/login"
              className="rounded-full bg-[#3569E8] px-5 py-2 font-display font-semibold text-white hover:bg-[#254fc0]"
            >
              Login
            </Link>
          )}
          {!isPending && user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border p-1 pr-3 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <span className="tooltip tooltip-bottom" data-tip={user.name || user.email}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email || "C")}`}
                    alt={user.name || "profile"}
                    title={user.name || user.email}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </span>
                <span className="max-w-28 truncate text-sm font-medium">{user.name || user.email}</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border bg-white shadow-xl dark:bg-[#111d42]">
                  <div className="border-b px-4 py-3">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                  </div>
                  {[
                    { href: "/create-event", label: "Create Event", icon: <PlusCircle size={16} /> },
                    { href: "/manage-events", label: "Manage Events", icon: <LayoutDashboard size={16} /> },
                    { href: "/joined-events", label: "Joined Events", icon: <Ticket size={16} /> },
                    { href: "/profile", label: "Profile", icon: <User size={16} /> },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-white/10"
                    >
                      {l.icon} {l.label}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-white/10"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {!isPending && user && (
            <button
              onClick={handleLogout}
              className="rounded-full border border-[#3569E8] px-5 py-2 font-display font-semibold text-[#3569E8] hover:bg-[#3569E8] hover:text-white"
            >
              Logout
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full border p-2"
            aria-label="Toggle theme"
          >
            {/* Pick the icon in CSS so server and client markup match */}
            <Sun size={16} className="hidden dark:block" />
            <Moon size={16} className="dark:hidden" />
          </button>
          <button onClick={() => setOpen((v) => !v)} className="rounded-lg border p-2" aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="space-y-1 border-t px-4 py-3 md:hidden">
          {publicLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 hover:bg-slate-100 dark:hover:bg-white/10">
              {l.label}
            </Link>
          ))}
          {!user && (
            <Link href="/login" onClick={() => setOpen(false)} className="block rounded-full bg-[#3569E8] px-4 py-2 text-center font-semibold text-white">
              Login
            </Link>
          )}
          {user && (
            <>
              {["/create-event", "/manage-events", "/joined-events", "/profile"].map((h) => (
                <Link key={h} href={h} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 hover:bg-slate-100 dark:hover:bg-white/10">
                  {h.replace("/", "").replace("-", " ")}
                </Link>
              ))}
              <button onClick={handleLogout} className="block w-full rounded-lg px-2 py-2 text-left text-red-600">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
