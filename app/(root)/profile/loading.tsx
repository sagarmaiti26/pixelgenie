import { Skeleton } from "../../../components/ui/skeleton";
import {
  CollectionSkeleton,
  HeaderSkeleton,
} from "../../../components/shared/Skeletons";

export default function ProfileLoading() {
  return (
    <div className="animate-fade-in">
      <HeaderSkeleton withSubtitle={false} />

      <section className="profile">
        {[0, 1].map((i) => (
          <div key={i} className="profile-balance">
            <Skeleton className="h-4 w-40" />
            <div className="mt-4 flex items-center gap-4">
              <Skeleton className="size-12 rounded-2xl md:size-14" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 md:mt-14">
        <CollectionSkeleton />
      </section>
    </div>
  );
}
