import apiClient from "./apiClient";

export async function fetchImages() {
  const response = await apiClient.get("/images");
  return response.data;
}

export async function fetchImageById(imageId: string) {
  const response = await apiClient.get(`/images/${imageId}`);
  return response.data;
}

export async function uploadImage(imageData: FormData) {
  const response = await apiClient.post("/images", imageData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function deleteImage(imageId: string) {
  const response = await apiClient.delete(`/images/${imageId}`);
  return response.data;
}

export async function updateImage(
  imageId: string,
  imageData: { title?: string; description?: string; tags?: string[] }
) {
  const response = await apiClient.put(`/images/${imageId}`, imageData);
  return response.data;
}

export async function searchImagesByTag(tag: string) {
  const response = await apiClient.get(`/images/search`, {
    params: { tag },
  });
  return response.data;
}
