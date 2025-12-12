"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeSwitch from "components/ThemeSwitch";
import Logo from "components/Logo";
import UserBar from "components/UserBar";

export default function Header() {
  const pathName = usePathname();

  return (
    <header>
      <div className="container mx-auto flex justify-between">
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
