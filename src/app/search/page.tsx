"use client";

import TagManager from "@/components/TagManager";
import { useAppSelector } from "@/lib/hooks/react-redux-hooks";
import { getNewTags } from "@/lib/redux/features/tags/tagsSelectors";

export default function SearchPage() {
  const newTags = useAppSelector(getNewTags);
  const newTagsString = newTags.join(", ");

  // TODO: Think, if to add the Search Button or if to activate searching during the changing of the selectedTags

  return (
    <div className="container mx-auto">
      {newTags.length > 0 && (
        <div className="search_alert-block">
          <h4>Alert!</h4>
          <p>{`These tags are new and will not be used in searching process: ${newTagsString}`}</p>
        </div>
      )}
      <TagManager />
    </div>
  );
}
