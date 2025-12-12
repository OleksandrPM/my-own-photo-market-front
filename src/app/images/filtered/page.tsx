"use client";

import { use, useEffect } from "react";
import { useAppDispatch } from "lib/hooks/react-redux-hooks";
import { tagsByNameThunk } from "lib/redux/features/tags/tagsThunks";

export default function FilteredImagesPage({
  searchParams,
}: {
  searchParams: Promise<{ tags?: string }>;
}) {
  const { tags } = use(searchParams);
  const dispatch = useAppDispatch();

  console.log(tags);

  // Fetch images by tags
  useEffect(() => {
    if (tags) {
      const tagsArray = tags.split(",");
      // dispatch(imagesByTagsThunk(tagsArray));
    }
  }, [tags, dispatch]);

  return (
    <div className="container mx-auto">
      <h2>Filtered Images Page</h2>
      <p>Searching tags: {tags?.split(",").join(", ")}</p>
      <p>
        This page displays images filtered by selected tags. Users can select
        tags to refine their image search.
      </p>
    </div>
  );
}
