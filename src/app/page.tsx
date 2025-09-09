"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import { getHideWelcome, switchHideWelcome } from "lib/localStorage";

export default function HomePage() {
  const [hideWelcome, setHideWelcome] = useState(getHideWelcome());
  const router = useRouter();

  // useEffect(() => {
  //   if (hideWelcome) {
  //     router.push("images/");
  //   }
  // }, [hideWelcome, router]);

  const handleCheckboxChange = () => {
    switchHideWelcome();
    setHideWelcome(getHideWelcome());
  };

  return (
    <div className="container mx-auto">
      <h1>My Own Photo Market</h1>
      <p>
        Welcome to my app, where I’ve combined two of my passions: capturing
        meaningful moments through photography and writing code. In this app,
        you’ll find only original photos taken and curated by me personally. If
        my work resonates with you, I’m open to collaboration — feel free to
        reach out via{" "}
        <a
          type="email"
          href="mailto:olekspm.dev@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          email
        </a>
        .
      </p>
      <Link href={"images/"}>View Images</Link>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={hideWelcome}
          onChange={handleCheckboxChange}
          name="hideWelcome"
          placeholder="Search by tags"
        />
        Don’t show this page again in the future
      </label>
    </div>
  );
}
