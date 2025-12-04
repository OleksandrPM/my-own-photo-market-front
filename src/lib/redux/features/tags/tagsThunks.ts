import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTags } from "lib/api/tagsApi";
import { Tag } from "types/tag";

export const fetchTagsThunk = createAsyncThunk<Tag[]>(
  "tags/fetchTags",
  async () => {
    const response = await fetchTags();
    return response; // must be Tag[]
  }
);
