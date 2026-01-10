"use client";

import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useAppDispatch, useAppSelector } from "lib/hooks/react-redux-hooks";
import { addSelectedTags } from "lib/redux/features/tags/tagsSlice";
import {
  getTagsIsLoading,
  getNewTags,
  getSelectedTags,
  getRemainingTags,
  getExistedTags,
} from "lib/redux/features/tags/tagsSelectors";
import { allTagsThunk } from "lib/redux/features/tags/tagsThunks";
import { Tag } from "types/tag";
import TagsCheckboxList from "components/TagsCheckboxList";

export default function TagManager() {
  const dispatch = useAppDispatch();
  const selectedTags = useAppSelector(getSelectedTags);
  const isLoading = useAppSelector(getTagsIsLoading);
  const remainingTags = useAppSelector(getRemainingTags).sort((a, b) =>
    a.localeCompare(b)
  );
  const newTags = useAppSelector(getNewTags);
  const existedTags = useAppSelector(getExistedTags);

  const [searchTerm, setSearchTerm] = useState("");
  const [enteredTags, setEnteredTags] = useState<Tag["tag"][]>([]);
  const [lastTag, setLastTag] = useState("");
  const [renderedTags, setRenderedTags] = useState(remainingTags);

  // Downloading tags from the server
  useEffect(() => {
    dispatch(allTagsThunk());
  }, [dispatch]);

  // Update rendered tags based on search term and remaining tags
  useEffect(() => {
    if (searchTerm === "") {
      setRenderedTags(remainingTags);
    } else if (lastTag === "") {
      const filtered = remainingTags.filter(
        (tag) =>
          !enteredTags.some((enteredTag) =>
            tag.toLowerCase().includes(enteredTag.toLowerCase())
          )
      );
      setRenderedTags(filtered);
    } else {
      const filtered = remainingTags.filter((tag) =>
        tag.toLowerCase().includes(lastTag.toLowerCase())
      );
      setRenderedTags(filtered);
    }
  }, [searchTerm, lastTag, remainingTags]);

  const debouncedProcessInput = useCallback(
    debounce((input: string) => {
      const tagsInInput = input.split(",").map((tag) => tag.trim());
      const lastTag = tagsInInput.at(-1) ?? "";

      setEnteredTags(tagsInInput.filter(Boolean));
      setLastTag(lastTag);
    }, 300),
    []
  );

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

    const tagsToAdd = enteredTags.filter(
      (tag) =>
        !selectedTags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
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

  const handleAddClick = () => {
    addInputedTags();
  };

  return (
    <div className="tagManager">
      {/* Loader */}
      {isLoading && <p>Loading tags...</p>}

      {/* Selected Tags Block */}
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

      {/* Add Tag Input */}
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
          onClick={handleAddClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
        >
          Add
        </button>
      </div>

      {/* Remaining/filtered Tags List */}
      {renderedTags.length > 0 && (
        <TagsCheckboxList renderedTags={renderedTags} title="Available tags:" />
      )}
    </div>
  );
}
