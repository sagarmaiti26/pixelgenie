"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

import { transformationTypes } from "../../constants";
import { IImage } from "../../lib/database/models/image.model";
import { cn, formUrlQuery } from "../../lib/utils";

import { Search } from "./Search";

export const Collection = ({
  hasSearch = false,
  showHeading = true,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
  showHeading?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (action: "next" | "prev") => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      {showHeading && (
        <div className="collection-heading">
          <h2 className="h2-bold text-slate-900">Recent Edits</h2>
          {hasSearch && <Search />}
        </div>
      )}

      {images.length > 0 ? (
        <ul className="collection-list">
          {images.map((image, i) => (
            <Card image={image} key={image._id} index={i} />
          ))}
        </ul>
      ) : (
        <div className="collection-empty animate-fade-in">
          <Image src="/assets/icons/photo.svg" alt="" width={40} height={40} />
          <p className="p-16-semibold text-slate-500">No images yet</p>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="mt-10 flex w-full items-center" aria-label="Pagination">
          <button
            disabled={Number(page) <= 1}
            className="collection-btn"
            onClick={() => onPageChange("prev")}
          >
            ← Previous
          </button>

          <p className="flex-center p-16-medium flex-1 text-slate-600">
            <span className="rounded-full bg-white px-4 py-1.5 shadow-sm">
              {page} / {totalPages}
            </span>
          </p>

          <button
            className="collection-btn"
            onClick={() => onPageChange("next")}
            disabled={Number(page) >= totalPages}
          >
            Next →
          </button>
        </nav>
      )}
    </>
  );
};

const Card = ({ image, index }: { image: IImage; index: number }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <li
      className="animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <Link href={`/transformations/${image._id}`} className="collection-card group">
        <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-slate-100">
          {!loaded && <div className="skeleton absolute inset-0 rounded-2xl" />}
          <CldImage
            src={image.publicId}
            alt={image.title}
            width={image.width}
            height={image.height}
            {...image.config}
            loading={index < 3 ? "eager" : "lazy"}
            onLoad={() => setLoaded(true)}
            className={cn(
              "size-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-105",
              loaded ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          />
        </div>
        <div className="flex-between px-1 pb-1">
          <p className="p-18-semibold mr-3 line-clamp-1 text-slate-900">
            {image.title}
          </p>
          <span className="flex-center size-9 shrink-0 rounded-full bg-brand-50 transition-colors duration-300 group-hover:bg-brand-100">
            <Image
              src={`/assets/icons/${
                transformationTypes[
                  image.transformationType as TransformationTypeKey
                ].icon
              }`}
              alt={image.transformationType}
              width={20}
              height={20}
            />
          </span>
        </div>
      </Link>
    </li>
  );
};
