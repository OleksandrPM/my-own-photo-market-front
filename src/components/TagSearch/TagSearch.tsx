"use client";

import { useState } from "react";
import clsx from "clsx";
import { useAppSelector } from "lib/hooks/react-redux-hooks";
import { getTags } from "lib/redux/features/tags/tagsSelectors";
import { searchImagesByTag } from "lib/api/imagesApi";

import styles from "./TagSearch.module.scss";

export default function TagSearch() {
  const tags = useAppSelector(getTags);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const filteredTags = tags.filter((tag) =>
    tag.tag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTagClick = async (tagName: string) => {
    setSearchTerm(tagName);
    setShowSuggestions(false);

    try {
      // const data = searchImagesByTag(tagName);
      // console.log("Backend response:", data);
      // тут можна диспатчити в Redux або оновлювати локальний state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={clsx(styles.tagsSearchingInput)}>
      <input
        type="text"
        placeholder="Search by tag..."
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm && showSuggestions && filteredTags.length > 0 && (
        <ul className={clsx(styles.tagsList)}>
          {filteredTags.map((tag) => (
            <li
              className={clsx(styles.tagItem)}
              key={tag.id}
              onClick={handleTagClick.bind(null, tag.tag)}
            >
              {tag.tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
