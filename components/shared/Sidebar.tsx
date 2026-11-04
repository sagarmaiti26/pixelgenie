"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { navLinks } from "../../constants";

// Memoized nav item — only re-renders when isActive actually changes
const NavItem = memo(
  ({
    link,
    isActive,
  }: {
    link: { route: string; icon: string; label: string };
    isActive: boolean;
  }) => (
    <li
      className={`sidebar-nav_element group ${
        isActive ? "bg-red-100 text-gray-800" : "text-gray-600"
      }`}
    >
      <Link className="sidebar-link" href={link.route}>
        <Image
          src={link.icon}
          alt={link.label}
          width={24}
          height={24}
          // Sidebar icons are always visible — load them eagerly
          priority
          className={isActive ? "brightness-50" : ""}
        />
        {link.label}
      </Link>
    </li>
  )
);
NavItem.displayName = "NavItem";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
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
                  isActive={link.route === pathname}
                />
              ))}
            </ul>

            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((link) => (
                <NavItem
                  key={link.route}
                  link={link}
                  isActive={link.route === pathname}
                />
              ))}
              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
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
      </div>
    </aside>
  );
};

export default Sidebar;
