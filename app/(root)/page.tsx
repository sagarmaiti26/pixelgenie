import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { Sparkles } from "lucide-react";

import { navLinks } from "../../constants";
import { Collection } from "../../components/shared/Collection";
import { Search } from "../../components/shared/Search";
import { CollectionGridSkeleton } from "../../components/shared/Skeletons";
import { getAllImages } from "../../lib/actions/image.actions";

// Data-dependent part of the page. Lives behind its own Suspense boundary so
// the banner and search bar paint immediately and stay mounted while
// searching / paginating — only the grid swaps to a skeleton.
const RecentEdits = async ({
  page,
  searchQuery,
}: {
  page: number;
  searchQuery: string;
}) => {
  const images = await getAllImages({ page, searchQuery });

  return (
    <Collection
      showHeading={false}
      images={images?.data ?? []}
      totalPages={images?.totalPage}
      page={page}
    />
  );
};

const Home = ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";
  const { userId } = auth();

  return (
    <>
      <section className="home">
        <span className="home-eyebrow">
          <Sparkles className="size-4 text-brand-rose" />
          AI-powered image studio
        </span>

        <h1 className="home-heading">
          Unleash Your Creative Vision with{" "}
          <span className="bg-gradient-to-r from-brand-sky via-white to-brand-rose bg-clip-text text-transparent">
            PixelGenie
          </span>
        </h1>

        <p className="home-subheading">
          Restore, fill, remove and recolor your images in seconds.
        </p>

        <ul className="home-actions">
          {navLinks.slice(1, 5).map((link) => (
            <li key={link.route}>
              <Link
                href={userId ? link.route : "/sign-in"}
                className="home-action group"
              >
                <span className="home-action_icon">
                  <Image src={link.icon} alt="" width={24} height={24} />
                </span>
                <span className="p-14-medium text-white">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 sm:mt-12">
        <div className="collection-heading">
          <h2 className="h2-bold text-slate-900">Recent Edits</h2>
          <Search />
        </div>

        <Suspense
          key={`${searchQuery}-${page}`}
          fallback={<CollectionGridSkeleton />}
        >
          <RecentEdits page={page} searchQuery={searchQuery} />
        </Suspense>
      </section>
    </>
  );
};

export default Home;
