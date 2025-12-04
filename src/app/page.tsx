"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import { useAppDispatch, useAppSelector } from "lib/hooks/react-redux-hooks";
import { setHideWelcome } from "lib/redux/features/local-preferences/localPreferencesSlice";
import { getHideWelcome } from "lib/redux/features/local-preferences/localPreferencesSelectors";
import { fetchTags } from "lib/api/tagsApi";
import { fetchTagsThunk } from "lib/redux/features/tags/tagsThunks";

export default function HomePage() {
  const isHideWelcome = useAppSelector(getHideWelcome);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // del
  const tags = useAppSelector((state) => state.tags);

  useEffect(() => {
    dispatch(fetchTagsThunk());
  }, [dispatch]);

  useEffect(() => {
    // if (isHideWelcome) {
    //   router.push("images/");
    // }
  }, [isHideWelcome]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setHideWelcome(e.target.checked));
  };

  return (
    <div className="container mx-auto">
      <h2>
        THESE ARE TAGS:{" "}
        {tags && tags.length > 0 ? JSON.stringify(tags) : "No tags yet"}
      </h2>
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
          checked={isHideWelcome}
          onChange={handleCheckboxChange}
          name="hideWelcome"
        />
        Don’t show this page again in the future
      </label>
    </div>
  );
}

// delete
export function deleteStorageByKey(storageKey: string) {
  if (typeof window === "undefined") return;

  localStorage.removeItem(storageKey);

  return localStorage.getItem(storageKey);
}
