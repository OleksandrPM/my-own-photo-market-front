"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "lib/hooks/react-redux-hooks";
import { getTags } from "lib/redux/features/tags/tagsSelectors";

import styles from "./TagSearch.module.scss";
import { allTagsThunk } from "lib/redux/features/tags/tagsThunks";
import { useRouter } from "next/navigation";

export default function TagSearch() {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(getTags);
  const [selectedTags, setSelectedTags] = useState([] as string[]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    dispatch(allTagsThunk());
  }, [dispatch]);

  const filteredTags = tags.filter(
    (tag) =>
      tag.tag?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedTags.includes(tag.tag)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = async (tagName: string) => {
    setSearchTerm("");
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tagName)) {
        return prevTags.filter((tag) => tag !== tagName);
      } else {
        return [...prevTags, tagName];
      }
    });
  };

  const handleButtonClick = () => async () => {
    if (selectedTags.length === 0) {
      alert("No tag selected. View images without restrictions?");
      return;
    } else {
      router.push(`/images/filtered?tags=${selectedTags.join(",")}`);
    }
  };

  return (
    <div className={clsx(styles.tagsSearchingInput)}>
      <h3>
        Select a tag from the list below or enter the tag name in the search
        field
      </h3>
      {selectedTags.length > 0 && (
        <p className={clsx(styles.selectedTags)}>
          Selected tags: {selectedTags.join(", ")}
        </p>
      )}
      <input
        id="tagSearch"
        type="text"
        placeholder="Search tag"
        value={searchTerm}
        onChange={handleChange}
      />

      {filteredTags.length > 0 && (
        <ul className={clsx(styles.tagsList)}>
          {filteredTags.map((tag) => (
            <li
              className={clsx(styles.tagItem)}
              key={tag.id}
              // onClick={handleTagClick.bind(null, tag.tag)}
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.tag)}
                onChange={() => handleSelect(tag.tag)}
                title={tag.tag}
                // readOnly
              />
              {tag.tag}
            </li>
          ))}
        </ul>
      )}

      <button type="button" onClick={handleButtonClick()}>
        Search images
      </button>
    </div>
  );
}

// const TagSearchInput = () => {
//   const dispatch = useDispatch();
//   const tags = useSelector((state) => state.tags.all);
//   const selectedTags = useSelector((state) => state.tags.selected);
//   const [term, setTerm] = useState("");

//   const filtered = tags.filter((t) => t.includes(term));

//   const handleSelect = (tag: string) => {
//     dispatch(addTag(tag));
//     setTerm("");
//   };

//   return (
//     <div>
//       <input value={term} onChange={(e) => setTerm(e.target.value)} />
//       <ul>
//         {filtered.map((tag) => (
//           <li key={tag}>
//             <input
//               type="checkbox"
//               checked={selectedTags.includes(tag)}
//               onChange={() => handleSelect(tag)}
//             />
//             {tag}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
