"use client";
// import Image from "next/image";
import { useEffect, useState } from "react";

import Link from "next/link";
import { getHideWelcome, switchHideWelcome } from "lib/localStorage";
import { useRouter } from "next/navigation";

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
    <>
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
        />
        Don’t show this page again in the future
      </label>
    </>
  );
}
