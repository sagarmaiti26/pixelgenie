"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { navLinks } from "../../constants";
import { cn } from "../../lib/utils";

function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="PixelGenie"
          width={180}
          height={28}
          priority
        />
      </Link>

      <nav className="flex items-center gap-3">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="flex-center size-10 rounded-xl border border-slate-200 bg-white shadow-sm transition-transform active:scale-90"
              >
                <Image src="/assets/icons/menu.svg" alt="" width={24} height={24} />
              </button>
            </SheetTrigger>
            <SheetContent className="sheet-content bg-white/95 backdrop-blur-xl sm:w-72">
              <Link href="/" className="sidebar-logo" onClick={() => setOpen(false)}>
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="PixelGenie"
                  width={180}
                  height={28}
                />
              </Link>

              <ul className="header-nav_elements">
                {navLinks.map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li key={link.route} className="w-full">
                      <Link
                        className={cn(
                          "sidebar-link active:scale-[0.98]",
                          isActive
                            ? "bg-gradient-to-r from-brand-cyan via-brand-600 to-brand-pink text-white shadow-glow"
                            : "text-slate-600 hover:bg-slate-100"
                        )}
                        href={link.route}
                        onClick={() => setOpen(false)}
                      >
                        <Image
                          className={isActive ? "icon-white" : ""}
                          src={link.icon}
                          alt=""
                          width={22}
                          height={22}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in" className="btn-primary h-10 px-5 text-sm">
            Login
          </Link>
        </SignedOut>
      </nav>
    </header>
  );
}

export default MobileNav;
