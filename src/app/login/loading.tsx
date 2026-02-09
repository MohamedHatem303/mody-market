export default function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="h-7 w-1/2 mx-auto bg-muted rounded animate-pulse" />

        <div className="space-y-4">
          <div className="h-10 w-full bg-muted rounded animate-pulse" />
          <div className="h-10 w-full bg-muted rounded animate-pulse" />
        </div>

        <div className="h-10 w-full bg-muted rounded animate-pulse" />

        <div className="h-4 w-1/3 mx-auto bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}
