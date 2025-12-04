import apiClient from "./apiClient";

export async function fetchTags() {
  const response = await apiClient.get("/tags");

  return response.data;
}

export async function fetchTagById(tagId: string) {
  const response = await apiClient.get(`/tags/${tagId}`);

  return response.data;
}

export async function createTag(tagData: { name: string }) {
  const response = await apiClient.post("/tags", tagData);

  return response.data;
}

export async function deleteTag(tagId: string) {
  const response = await apiClient.delete(`/tags/${tagId}`);

  return response.data;
}

export async function updateTag(tagId: string, tagData: { name: string }) {
  const response = await apiClient.put(`/tags/${tagId}`, tagData);

  return response.data;
}
