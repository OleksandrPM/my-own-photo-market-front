import { createSelector } from "@reduxjs/toolkit";
import { tagsApi } from "@/lib/api/features/tagsApi";
import { RootState } from "@/lib/redux/store";
import { Tag } from "@/types/tag/tag.types";
import { TagsState } from "@/types/tag/tags-state.types";

const EMPTY_TAGS: Tag[] = [];

export const selectTagsResult = tagsApi.endpoints.fetchTags.select();

export const getTags = (state: RootState): Tag[] =>
  selectTagsResult(state)?.data ?? EMPTY_TAGS;

export const getTagsIsLoading = (state: RootState): boolean =>
  selectTagsResult(state)?.isLoading ?? false;

export const getTagsError = (state: RootState) =>
  selectTagsResult(state)?.error ?? null;

export const getSelectedTags = (state: RootState): TagsState["selectedTags"] =>
  state.tags.selectedTags;

export const getRemainingTags = createSelector(
  [getTags, getSelectedTags],
  (allTags, selectedTags): Tag["name"][] =>
    allTags
      .filter((tag) => !selectedTags.includes(tag.name))
      .map((tag) => tag.name),
);

export const getNewTags = createSelector(
  [getTags, getSelectedTags],
  (allTags, selectedTags): Tag["name"][] =>
    selectedTags.filter((name) => !allTags.some((tag) => tag.name === name)),
);

export const getExistedTags = createSelector(
  [getTags, getSelectedTags],
  (allTags, selectedTags): Tag["name"][] =>
    selectedTags.filter((name) => allTags.some((tag) => tag.name === name)),
);
