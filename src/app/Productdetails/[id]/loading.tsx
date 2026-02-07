import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

        {/* Image Skeleton */}
        <div className="md:col-span-1">
          <div className="rounded-2xl bg-white shadow-md p-4 space-y-4">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="md:col-span-2">
          <div className="rounded-2xl shadow-lg border p-6 space-y-6">

            {/* Badges */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>

            {/* Title */}
            <Skeleton className="h-6 w-3/4" />

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Stock */}
            <Skeleton className="h-4 w-32" />

            {/* Footer */}
            <div className="flex justify-between items-center pt-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-10 w-36 rounded-xl" />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
