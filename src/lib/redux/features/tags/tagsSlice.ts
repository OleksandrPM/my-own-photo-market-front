import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allTagsThunk, tagsByNameThunk } from "./tagsThunks";
import { TagsState } from "types/tagsState";

const initialState: TagsState = {
  allTags: [],
  selectedTags: [],
  newTags: [],
  isTagsLoading: false,
  error: null,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags(state, action: PayloadAction<TagsState["allTags"]>) {
      state.allTags = action.payload;
    },
    setSelectedTags(state, action: PayloadAction<TagsState["selectedTags"]>) {
      state.selectedTags = action.payload;
    },
    addSelectedTag(state, action: PayloadAction<string>) {
      state.selectedTags.push(action.payload);
    },
    addSelectedTags(state, action: PayloadAction<string[]>) {
      state.selectedTags = Array.from(
        new Set([...state.selectedTags, ...action.payload])
      );
    },
    toggleSelectedTag(state, action: PayloadAction<string>) {
      const tag = action.payload;
      if (state.selectedTags.includes(tag)) {
        state.selectedTags = state.selectedTags.filter((t) => t !== tag);
      } else {
        state.selectedTags = [...state.selectedTags, tag];
      }
    },
    setNewTags(state, action: PayloadAction<TagsState["newTags"]>) {
      state.newTags = action.payload;
    },
    addNewTags(state, action: PayloadAction<string[]>) {
      action.payload.forEach((tag) => {
        if (!state.newTags.includes(tag)) {
          state.newTags.push(tag);
        }
      });
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isTagsLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setTags,
  setSelectedTags,
  addSelectedTag,
  addSelectedTags,
  toggleSelectedTag,
  setNewTags,
  addNewTags,
  setIsLoading,
  setError,
} = tagsSlice.actions;

export default tagsSlice.reducer;
