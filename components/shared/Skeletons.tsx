import { Skeleton } from "../ui/skeleton";

export const HeaderSkeleton = ({ withSubtitle = true }) => (
  <div className="flex flex-col gap-4">
    <Skeleton className="h-10 w-64 md:h-11" />
    {withSubtitle && <Skeleton className="h-5 w-80 max-w-full" />}
  </div>
);

export const CollectionGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <ul className="collection-list" aria-busy="true" aria-label="Loading images">
    {Array.from({ length: count }).map((_, i) => (
      <li
        key={i}
        className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-3 shadow-soft"
      >
        <Skeleton className="h-52 w-full rounded-2xl" />
        <div className="flex-between px-1 pb-1">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="size-8 rounded-full" />
        </div>
      </li>
    ))}
  </ul>
);

export const CollectionSkeleton = ({ withSearch = false }) => (
  <>
    <div className="collection-heading">
      <Skeleton className="h-10 w-56" />
      {withSearch && <Skeleton className="h-[54px] w-full rounded-2xl md:w-96" />}
    </div>
    <CollectionGridSkeleton />
  </>
);

export const TransformationFormSkeleton = () => (
  <div className="space-y-8" aria-busy="true">
    <div className="space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-[54px] w-full rounded-2xl" />
    </div>
    <div className="media-uploader-field">
      {[0, 1].map((i) => (
        <div key={i} className="flex flex-col gap-4">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-72 w-full rounded-3xl" />
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-4">
      <Skeleton className="h-[54px] w-full rounded-full" />
      <Skeleton className="h-[54px] w-full rounded-full" />
    </div>
  </div>
);
