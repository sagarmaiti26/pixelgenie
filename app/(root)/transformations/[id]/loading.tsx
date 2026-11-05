import { Skeleton } from "../../../../components/ui/skeleton";
import { HeaderSkeleton } from "../../../../components/shared/Skeletons";

export default function ImageDetailsLoading() {
  return (
    <div className="animate-fade-in">
      <HeaderSkeleton withSubtitle={false} />

      <div className="mt-5 flex flex-wrap gap-3">
        <Skeleton className="h-9 w-48 rounded-full" />
        <Skeleton className="h-9 w-40 rounded-full" />
      </div>

      <section className="mt-10 border-t border-slate-200">
        <div className="transformation-grid">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="h-8 w-36" />
              <Skeleton className="h-72 w-full rounded-2xl" />
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-4">
          <Skeleton className="h-[54px] w-full rounded-full" />
          <Skeleton className="h-[54px] w-full rounded-full" />
        </div>
      </section>
    </div>
  );
}
