import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className="p-4 space-y-3">
            <Skeleton className="h-52 w-full rounded-xl" />

            <CardContent className="p-0 space-y-3">
              <Skeleton className="h-4 w-3/4" />

              <Skeleton className="h-4 w-1/3" />

              <Skeleton className="h-10 w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
