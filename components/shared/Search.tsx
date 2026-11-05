"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Seed from the URL so a reload / shared link keeps its search term
  const [query, setQuery] = useState(searchParams.get("query") ?? "");

  useEffect(() => {
    const current = searchParams.get("query") ?? "";
    if (query === current) return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      // A new search should always start from page 1
      params.delete("page");
      if (query) params.set("query", query);
      else params.delete("query");

      const qs = params.toString();
      const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ""}`;

      router.replace(newUrl, { scroll: false });
    }, 350);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="search">
      <Image
        src="/assets/icons/search.svg"
        alt=""
        width={22}
        height={22}
        className="opacity-70"
      />

      <Input
        className="search-field"
        placeholder="Search your edits…"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
};
