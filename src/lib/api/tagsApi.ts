import { Tag } from "types/tag";
import apiClient from "./apiClient";

export async function fetchTags() {
  const response = await apiClient.get("/tags");

  return response.data;
}

export async function createTag(tagData: { name: string }) {
  const response = await apiClient.post("/tags", tagData);

  return response.data;
}

export async function updateTag(tagId: string, tagData: { name: Tag["tag"] }) {
  const response = await apiClient.put(`/tags/${tagId}`, tagData);

  return response.data;
}

export async function deleteTagById(tagId: string) {
  const response = await apiClient.delete(`/tags/${tagId}`);

  return response.data;
}

export async function fetchTagById(tagId: string) {
  const response = await apiClient.get(`/tags/${tagId}`);

  return response.data;
}

export async function searchTagsByName(tags: string[]) {
  const response = await apiClient.get(`/tags/search`, {
    params: { tags },
  });
  return response.data;
}
