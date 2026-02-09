export default function HomeLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-[#7b1626] border-t-transparent rounded-full animate-spin" />

        <p className="text-[#7b1626] font-bold text-lg tracking-wide animate-pulse">
          Loading Allorders...
        </p>
      </div>
    </div>
  );
}
