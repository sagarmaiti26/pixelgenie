import {
  HeaderSkeleton,
  TransformationFormSkeleton,
} from "../../../../../components/shared/Skeletons";

export default function TransformationLoading() {
  return (
    <div className="animate-fade-in">
      <HeaderSkeleton />
      <section className="mt-10">
        <TransformationFormSkeleton />
      </section>
    </div>
  );
}
