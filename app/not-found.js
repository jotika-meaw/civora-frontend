import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="font-display text-6xl font-bold text-[#3569E8]">404</p>
      <h1 className="font-display mt-2 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-500">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-[#3569E8] px-6 py-2.5 font-semibold text-white">
        Back home
      </Link>
    </div>
  );
}
