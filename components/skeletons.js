export function EventCardSkeleton() {
  return (
    <div className="civora-card animate-pulse overflow-hidden rounded-3xl bg-white dark:bg-[#111d42]">
      <div className="h-48 bg-slate-200 dark:bg-white/10" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-white/10" />
        <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-white/10" />
        <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-white/10" />
        <div className="h-10 rounded-full bg-slate-200 dark:bg-white/10" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 4 }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 rounded-2xl bg-slate-200 dark:bg-white/10" />
      ))}
    </div>
  );
}
