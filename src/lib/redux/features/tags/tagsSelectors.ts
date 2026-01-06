import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "lib/redux/store";
import { TagsState } from "types/tagsState";

export const getTags = (state: RootState): TagsState["allTags"] =>
  state.tags.allTags;

export const getSelectedTags = (state: RootState): TagsState["selectedTags"] =>
  state.tags.selectedTags;

export const getNewTags = (state: RootState): TagsState["newTags"] =>
  state.tags.newTags;

export const getTagsIsLoading = (
  state: RootState
): TagsState["isTagsLoading"] => state.tags.isTagsLoading;

export const getTagsError = (state: RootState): TagsState["error"] =>
  state.tags.error;

export const getRemainingTags = createSelector(
  [
    (state: RootState) => state.tags.allTags,
    (state: RootState) => state.tags.selectedTags,
  ],
  (tags, selectedTags) => {
    return tags.filter((tag) => !selectedTags.includes(tag.tag));
  }
);
