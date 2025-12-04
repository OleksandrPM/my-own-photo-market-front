import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "types/tag";
import { fetchTagsThunk } from "./tagsThunks";

const initialState: Tag[] = [];

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags(state, action: PayloadAction<Tag[]>) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTagsThunk.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export const { setTags } = tagsSlice.actions;

export default tagsSlice.reducer;
