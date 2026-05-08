"use client";

import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/react-redux-hooks";
import { addSelectedTags } from "@/lib/redux/features/tags/tagsSlice";
import {
  getNewTags,
  getSelectedTags,
  getRemainingTags,
  getExistedTags,
} from "@/lib/redux/features/tags/tagsSelectors";
import { Tag } from "@/types/tag";
import TagsCheckboxList from "@/components/TagsCheckboxList";
import { useFetchTagsQuery } from "@/lib/api/features/tagsApi";

export default function TagManager() {
  const dispatch = useAppDispatch();
  const { isLoading } = useFetchTagsQuery();

  const selectedTags = useAppSelector(getSelectedTags);
  const remainingTags = useAppSelector(getRemainingTags);
  const newTags = useAppSelector(getNewTags);
  const existedTags = useAppSelector(getExistedTags);

  const [searchTerm, setSearchTerm] = useState("");
  const [enteredTags, setEnteredTags] = useState<Tag["name"][]>([]);
  const [lastTag, setLastTag] = useState("");

  // ✅ sort without mutation: copy first
  const sortedRemainingTags = useMemo(
    () => [...remainingTags].sort((a, b) => a.localeCompare(b)),
    [remainingTags],
  ); // sort() mutates, so we copy first [1](https://react.dev/learn/updating-arrays-in-state)

  // ✅ derived value: no useState + no useEffect
  const renderedTags = useMemo(() => {
    if (searchTerm === "") return sortedRemainingTags;

    if (lastTag === "") {
      return sortedRemainingTags.filter(
        (tag) =>
          !enteredTags.some((enteredTag) =>
            tag.toLowerCase().includes(enteredTag.toLowerCase()),
          ),
      );
    }

    return sortedRemainingTags.filter((tag) =>
      tag.toLowerCase().includes(lastTag.toLowerCase()),
    );
  }, [searchTerm, lastTag, sortedRemainingTags, enteredTags]);

  const debouncedProcessInput = useMemo(
    () =>
      debounce((input: string) => {
        const tagsInInput = input.split(",").map((tag) => tag.trim());
        const last = tagsInInput.at(-1) ?? "";
        setEnteredTags(tagsInInput.filter(Boolean));
        setLastTag(last);
      }, 300),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedProcessInput.cancel();
    };
  }, [debouncedProcessInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedProcessInput(value);
  };

  const addInputedTags = () => {
    if (enteredTags.length === 0) {
      alert("Please enter at least one tag.");
      setSearchTerm("");
      return;
    }

    const selectedLower = new Set(selectedTags.map((t) => t.toLowerCase()));
    const tagsToAdd = enteredTags.filter(
      (tag) => !selectedLower.has(tag.toLowerCase()),
    );

    dispatch(addSelectedTags(tagsToAdd));
    setSearchTerm("");
  };

  const handleEnterType = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInputedTags();
    }
  };

  return (
    <div className="tagManager">
      {isLoading && <p>Loading tags...</p>}

      {selectedTags.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">Selected tags:</h4>
          <div className="flex gap-2">
            <TagsCheckboxList
              renderedTags={existedTags}
              title="Existed tags:"
            />
            {newTags.length > 0 && (
              <TagsCheckboxList renderedTags={newTags} title="New tags:" />
            )}
          </div>
        </div>
      )}

      <label htmlFor="addPhotoForm-tags">
        Enter tags separated by commas, or select tags from the list below
      </label>

      <div className="relative w-full">
        <input
          id="addPhotoForm-tags"
          type="text"
          className="w-full p-2 pr-20 border border-gray-300 rounded-lg"
          placeholder="tag1, tag2, tag3"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleEnterType}
        />
        <button
          type="button"
          onClick={addInputedTags}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
        >
          Add
        </button>
      </div>

      {renderedTags.length > 0 && (
        <TagsCheckboxList renderedTags={renderedTags} title="Available tags:" />
      )}
    </div>
  );
}
