"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { navLinks } from "../../constants";

function MobileNav() {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>

                <Link href="/" className="sidebar-logo">
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
                        className={`${isActive && "bg-red-100 rounded-full w-full"
                          } p-18 flex whitespace-nowrap text-gray-800`}
                        key={link.route}
                      >
                        <Link
                          className="sidebar-link cursor-pointer"
                          href={link.route}
                        >
                          <Image
                            className={`${isActive && "brightness-50"
                              } `}
                            src={link.icon}
                            alt="logo"
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
          <Button asChild className="button transition hover:duration-500 ease-in-out bg-red-100 hover:bg-red-200  text-gray-800">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
}

export default MobileNav;
