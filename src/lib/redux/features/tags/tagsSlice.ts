import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "types/tag";
import { allTagsThunk, tagsByNameThunk } from "./tagsThunks";
import { TagsState } from "types/tagsState";
import { stat } from "fs";

const initialState: TagsState = {
  tags: [],
  selectedTags: [],
  isLoading: false,
  error: null,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags(state, action: PayloadAction<TagsState["tags"]>) {
      state.tags = action.payload;
    },
    setSelectedTags(state, action: PayloadAction<TagsState["selectedTags"]>) {
      state.selectedTags = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allTagsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allTagsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        return { ...state, tags: action.payload };
      })
      .addCase(allTagsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch tags";
      })
      .addCase(tagsByNameThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tagsByNameThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        return { ...state, tags: action.payload };
      })
      .addCase(tagsByNameThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch tags by name";
      });
  },
});

export const { setTags } = tagsSlice.actions;

export default tagsSlice.reducer;
