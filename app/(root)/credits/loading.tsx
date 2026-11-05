import { Skeleton } from "../../../components/ui/skeleton";
import { HeaderSkeleton } from "../../../components/shared/Skeletons";

export default function CreditsLoading() {
  return (
    <div className="animate-fade-in">
      <HeaderSkeleton />

      <ul className="credits-list">
        {[0, 1, 2].map((i) => (
          <li key={i} className="credits-item hover:translate-y-0">
            <div className="flex-center flex-col gap-3">
              <Skeleton className="size-14 rounded-2xl" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-11 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex flex-col gap-5 py-9">
              {[0, 1, 2, 3].map((j) => (
                <div key={j} className="flex items-center gap-4">
                  <Skeleton className="size-6 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
            <Skeleton className="h-12 w-full rounded-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
