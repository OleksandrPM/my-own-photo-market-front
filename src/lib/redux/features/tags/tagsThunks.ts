import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTags, searchTagsByName } from "lib/api/tagsApi";
import { Tag } from "types/tag";
import { setError, setIsLoading, setTags } from "./tagsSlice";

export const allTagsThunk = createAsyncThunk<void>(
  "tags/fetchAll",
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    try {
      const response = await fetchTags();
      const tags = response.map((tag: Tag) => tag.tag);
      dispatch(setTags(tags));
    } catch (err) {
      dispatch(setError("Failed to fetch tags"));
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const tagsByNameThunk = createAsyncThunk<void, string[]>(
  "tags/searchByName",
  async (tagNames, { dispatch }) => {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    try {
      const response = await searchTagsByName(tagNames);
      const tags = response.map((tag: Tag) => tag.tag);
      dispatch(setTags(tags));
    } catch (err) {
      dispatch(setError("Failed to search tags"));
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
