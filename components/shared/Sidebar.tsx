"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { usePathname } from "next/navigation";
import { navLinks } from "../../constants";
import { cn } from "../../lib/utils";

const PILL_TRANSITION = { type: "spring", stiffness: 380, damping: 32 } as const;

const NavItem = memo(
  ({
    link,
    isActive,
    onNavigate,
  }: {
    link: { route: string; icon: string; label: string };
    isActive: boolean;
    onNavigate: (route: string) => void;
  }) => (
    <li className="sidebar-nav_element">
      {isActive && (
        <motion.span
          layoutId="sidebar-active-pill"
          transition={PILL_TRANSITION}
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-cyan via-brand-600 to-brand-pink shadow-glow"
        />
      )}
      <Link
        className={cn(
          "sidebar-link group",
          isActive
            ? "text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )}
        href={link.route}
        onClick={() => onNavigate(link.route)}
      >
        <Image
          src={link.icon}
          alt=""
          width={22}
          height={22}
          priority
          className={cn(
            "transition-transform duration-200 group-hover:scale-110",
            isActive && "icon-white"
          )}
        />
        {link.label}
      </Link>
    </li>
  )
);
NavItem.displayName = "NavItem";

const Sidebar = () => {
  const pathname = usePathname();
  // Optimistic route: highlight the clicked item immediately instead of
  // waiting for the server to finish rendering the next page.
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  useEffect(() => {
    setPendingRoute(null);
  }, [pathname]);

  const activeRoute = pendingRoute ?? pathname;

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-6">
        <Link href="/" className="sidebar-logo" onClick={() => setPendingRoute("/")}>
          <Image
            src="/assets/images/logo-text.svg"
            alt="PixelGenie"
            width={180}
            height={28}
            priority
          />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((link) => (
                <NavItem
                  key={link.route}
                  link={link}
                  isActive={link.route === activeRoute}
                  onNavigate={setPendingRoute}
                />
              ))}
            </ul>

            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((link) => (
                <NavItem
                  key={link.route}
                  link={link}
                  isActive={link.route === activeRoute}
                  onNavigate={setPendingRoute}
                />
              ))}
              <li className="mt-2 flex w-full items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in" className="btn-primary h-12 w-full px-6">
              Login
            </Link>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
