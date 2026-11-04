"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { navLinks } from "../../constants";

function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
          loading="eager"
          priority
        />
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          {/* Controlled Sheet — closes instantly when a nav link is tapped */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu">
                <Image
                  src="/assets/icons/menu.svg"
                  alt="menu"
                  width={32}
                  height={32}
                  className="cursor-pointer"
                />
              </button>
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <Link
                  href="/"
                  className="sidebar-logo"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={180}
                    height={28}
                  />
                </Link>

                <ul className="header-nav_elements">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname;

                    return (
                      <li
                        key={link.route}
                        className={`${
                          isActive ? "bg-red-100 rounded-full w-full" : ""
                        } p-18 flex whitespace-nowrap text-gray-800`}
                      >
                        {/* onClick closes the Sheet immediately on tap */}
                        <Link
                          className="sidebar-link cursor-pointer"
                          href={link.route}
                          onClick={() => setOpen(false)}
                        >
                          <Image
                            className={isActive ? "brightness-50" : ""}
                            src={link.icon}
                            alt={link.label}
                            width={24}
                            height={24}
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        {/* signed out */}
        <SignedOut>
          <Button
            asChild
            className="button transition duration-300 ease-in-out bg-red-100 hover:bg-red-200 text-gray-800"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
}

export default MobileNav;
