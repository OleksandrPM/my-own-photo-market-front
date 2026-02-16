import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "lib/redux/store";
import { Tag } from "types/tag";
import { TagsState } from "types/tagsState";

export const getTags = (state: RootState): TagsState["allTags"] =>
  state.tags.allTags;

export const getSelectedTags = (state: RootState): TagsState["selectedTags"] =>
  state.tags.selectedTags;

export const getTagsIsLoading = (
  state: RootState,
): TagsState["isTagsLoading"] => state.tags.isTagsLoading;

export const getTagsError = (state: RootState): TagsState["error"] =>
  state.tags.error;

export const getRemainingTags = createSelector(
  [
    (state: RootState) => state.tags.allTags,
    (state: RootState) => state.tags.selectedTags,
  ],
  (allTags, selectedTags): Tag["name"][] => {
    console.log(allTags);

    return allTags.filter((tag) => !selectedTags.includes(tag));
  },
);

export const getNewTags = createSelector(
  [
    (state: RootState) => state.tags.selectedTags,
    (state: RootState) => state.tags.allTags,
  ],
  (selectedTags, allTags): Tag["name"][] => {
    return selectedTags.filter((tag) => !allTags.includes(tag));
  },
);

export const getExistedTags = createSelector(
  [
    (state: RootState) => state.tags.selectedTags,
    (state: RootState) => state.tags.allTags,
  ],
  (selectedTags, allTags): Tag["name"][] => {
    return selectedTags.filter((tag) => allTags.includes(tag));
  },
);
