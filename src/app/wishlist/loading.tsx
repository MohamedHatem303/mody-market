export default function WishlistLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-muted animate-pulse h-[280px]"
          />
        ))}
      </div>

    </div>
  );
}
