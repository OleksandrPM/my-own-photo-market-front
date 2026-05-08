"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "../Logo";
import ThemeSwitch from "../ThemeSwitch";
import UserBar from "../UserBar";

export default function Header() {
  const pathName = usePathname();

  return (
    <header>
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        {pathName !== "/search" ? (
          <Link href="/search">Searching by tag</Link>
        ) : (
          <Link href="/">Back to the main page</Link>
        )}
        <ThemeSwitch />
        <UserBar />
      </div>
    </header>
  );
}
