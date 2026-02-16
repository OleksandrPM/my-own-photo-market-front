import { Tag } from "types/tag";
import apiClient from "./apiClient";

const resourcePath = "/tags";

export async function fetchTags() {
  const response = await apiClient.get(resourcePath);

  return response.data;
}

export async function createTag(tagData: { name: string }) {
  const response = await apiClient.post(resourcePath, tagData);

  return response.data;
}

export async function updateTag(tagId: string, tagData: { name: Tag["name"] }) {
  const response = await apiClient.put(`${resourcePath}/${tagId}`, tagData);

  return response.data;
}

export async function deleteTagById(tagId: string) {
  const response = await apiClient.delete(`${resourcePath}/id/${tagId}`);

  return response.data;
}

export async function deleteTagByName(tagName: string) {
  const response = await apiClient.delete(`${resourcePath}/name/${tagName}`);

  return response.data;
}

export async function fetchTagById(tagId: string) {
  const response = await apiClient.get(`${resourcePath}/${tagId}`);

  return response.data;
}

export async function searchTagsByName(tags: string[]) {
  const response = await apiClient.get(`${resourcePath}/search`, {
    params: { tags },
  });
  return response.data;
}
