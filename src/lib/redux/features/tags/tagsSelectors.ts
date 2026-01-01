import { RootState } from "lib/redux/store";
import { Tag } from "types/tag";

export const getTags = (state: RootState): Tag[] => state.tags.tags;

export const getSelectedTags = (state: RootState): Tag[] =>
  state.tags.selectedTags;

export const getAreTagsLoading = (state: RootState): boolean =>
  state.tags.isLoading;

export const getTagsError = (state: RootState): string | null =>
  state.tags.error;
