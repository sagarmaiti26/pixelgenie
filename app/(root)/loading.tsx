import { Skeleton } from "../../components/ui/skeleton";
import { CollectionSkeleton } from "../../components/shared/Skeletons";

export default function HomeLoading() {
  return (
    <div className="animate-fade-in">
      <Skeleton className="h-[420px] w-full rounded-[28px] sm:h-[380px]" />
      <section className="mt-10 sm:mt-12">
        <CollectionSkeleton withSearch />
      </section>
    </div>
  );
}
