"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { useAppDispatch, useAppSelector } from "lib/hooks/react-redux-hooks";
import {
  addSelectedTags,
  setNewTags,
  toggleSelectedTag,
} from "lib/redux/features/tags/tagsSlice";
import {
  getTagsIsLoading,
  getNewTags,
  getSelectedTags,
  getTags,
  getRemainingTags,
} from "lib/redux/features/tags/tagsSelectors";
import { allTagsThunk } from "lib/redux/features/tags/tagsThunks";

export default function TagManager() {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(getTags);
  const selectedTags = useAppSelector(getSelectedTags);
  const newTags = useAppSelector(getNewTags);
  const isLoading = useAppSelector(getTagsIsLoading);
  const remainingTags = useAppSelector(getRemainingTags).sort((a, b) =>
    a.tag.localeCompare(b.tag)
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [enteredTags, setEnteredTags] = useState<string[]>([]);
  const [renderedTags, setRenderedTags] = useState(remainingTags);

  // Downloading tags from the server
  useEffect(() => {
    dispatch(allTagsThunk());
  }, [dispatch]);

  //   Filter remaining tags during entering tags in the input field
  useEffect(() => {
    if (enteredTags.length > 0) {
      const rendered = remainingTags.filter(
        (tag) =>
          !enteredTags.some((entered) =>
            tag.tag.toLowerCase().includes(entered)
          )
      );
      setRenderedTags(rendered);
    } else {
      setRenderedTags(remainingTags);
    }
  }, [remainingTags, enteredTags]);

  // Set newTags
  useEffect(() => {
    const newTags = selectedTags.filter(
      (tag) => !tags.some((t) => t.tag == tag)
    );

    dispatch(setNewTags(newTags));
  }, [selectedTags, tags]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    let tagsInInput = [] as string[];

    setSearchTerm(input);

    if (input.at(-1) === ",") {
      //   LowerCase - no, also change spaces between words in tags
      tagsInInput = input
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      setEnteredTags(tagsInInput);
      setRenderedTags(
        remainingTags.filter(
          (tag) =>
            !tagsInInput.some((t) =>
              t.toLowerCase().includes(tag.tag.toLowerCase())
            )
        )
      );
    }

    let lastTag;

    if (input.includes(",")) {
      lastTag = input.split(",").pop()?.trim();
    } else {
      lastTag = input.trim();
    }

    if (lastTag && lastTag.length > 0 && lastTag !== "") {
      const filtered = remainingTags.filter((tag) =>
        tag.tag.toLowerCase().includes(lastTag)
      );
      setRenderedTags(filtered);
    }
  };

  const handleAdd = () => {
    if (searchTerm.trim() === "") return;

    const tagsToAdd = searchTerm
      .split(",")
      .map((tag) => tag.trim())
      .filter(
        (tag) =>
          tag !== "" &&
          !selectedTags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      );

    dispatch(addSelectedTags(tagsToAdd));
    setSearchTerm("");
  };

  const handleSelect = (tagName: string) => {
    dispatch(toggleSelectedTag(tagName));
    setRenderedTags(remainingTags);
  };

  return (
    <div className="tagManager">
      {/* Loader */}
      {isLoading && <p>Loading tags...</p>}
      {/* Selected Tags Block */}
      {selectedTags.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">Selected Tags:</h4>
          <div className="flex gap-2">
            <div>
              <h5>Existed tags:</h5>
              <ul className=" gap-2">
                {selectedTags
                  .filter((tag) => !newTags.some((t) => t === tag))
                  .map((tag) => (
                    <li className="" key={tag}>
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleSelect(tag)}
                        title={tag}
                      />
                      {tag}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h5>New tags:</h5>
              <ul className=" gap-2">
                {newTags.map((tag) => (
                  <li className="" key={tag}>
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleSelect(tag)}
                      title={tag}
                    />
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Add Tag Input */}
      <label htmlFor="addPhotoForm-tags">
        Enter tag`s name or select from the list below
      </label>
      <div className="relative w-full">
        <input
          id="addPhotoForm-tags"
          type="text"
          className="w-full p-2 pr-20 border border-gray-300 rounded-lg"
          placeholder="tag1, tag2, tag3"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
        >
          Add
        </button>
      </div>

      {/* Remaining/filtered Tags List */}
      {renderedTags.length > 0 && (
        <ul className={clsx()}>
          {renderedTags.map((tag) => (
            <li className={clsx()} key={tag.id}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.tag)}
                onChange={() => handleSelect(tag.tag)}
                title={tag.tag}
              />
              {tag.tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
