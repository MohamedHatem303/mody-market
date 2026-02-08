export default function HomeLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#7b1626]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#5a0f1b]/20 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-[#7b1626] border-t-transparent rounded-full animate-spin" />

        {/* Text */}
        <p className="text-[#7b1626] font-bold text-lg tracking-wide animate-pulse">
          Loading Mody Mart...
        </p>
      </div>
    </div>
  )
}
