import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag, TagsState } from "@/types/tag";

const initialState: TagsState = {
  selectedTags: [],
};

const tagsSlice = createSlice({
  name: "tagsUI",
  initialState,
  reducers: {
    setSelectedTags(state, action: PayloadAction<Tag["name"][]>) {
      state.selectedTags = action.payload;
    },

    addSelectedTag(state, action: PayloadAction<Tag["name"]>) {
      state.selectedTags.push(action.payload);
    },

    addSelectedTags(state, action: PayloadAction<Tag["name"][]>) {
      state.selectedTags = Array.from(
        new Set([...state.selectedTags, ...action.payload]),
      );
    },

    toggleSelectedTag(state, action: PayloadAction<Tag["name"]>) {
      const tagName = action.payload;
      state.selectedTags = state.selectedTags.includes(tagName)
        ? state.selectedTags.filter((name) => name !== tagName)
        : [...state.selectedTags, tagName];
    },

    clearSelectedTags(state) {
      state.selectedTags = [];
    },
  },
});

export const {
  setSelectedTags,
  addSelectedTag,
  addSelectedTags,
  toggleSelectedTag,
  clearSelectedTags,
} = tagsSlice.actions;

export default tagsSlice.reducer;
