import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTags, searchTagsByName } from "lib/api/tagsApi";
import { Tag } from "types/tag";

export const allTagsThunk = createAsyncThunk<Tag[]>(
  "tags/fetchTags",
  async () => {
    const response = await fetchTags();
    return response; // must be Tag[]
  }
);

export const tagsByNameThunk = createAsyncThunk<Tag[], string[]>(
  "tags/searchTagsByName",
  async (tags: string[]) => {
    const response = await searchTagsByName(tags);
    return response; // must be Tag[]
  }
);
