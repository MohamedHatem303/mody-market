export default function ProfileLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="h-8 w-40 bg-muted rounded animate-pulse" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-xl border bg-muted animate-pulse"
          />
        ))}
      </div>

      <div className="border rounded-xl p-4 space-y-4">
        <div className="h-6 w-32 bg-muted rounded animate-pulse" />

        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-full bg-muted rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}
