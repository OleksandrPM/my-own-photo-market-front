import { ImageData } from "@/types/image/image-data.types";
import apiClient from "../core/apiClient";
import { Tag } from "@/types/tag/tag.types";
import { apiRoutes } from "../core/apiRoutes";

const resourcePath = `/${apiRoutes.IMAGES.BASE}`;

export async function fetchImages() {
  const response = await apiClient.get(`/${resourcePath}`);
  return response.data;
}

export async function uploadImage(imageData: FormData) {
  const response = await apiClient.post(`/${resourcePath}`, imageData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function deleteImage(imageId: string) {
  const response = await apiClient.delete(`/${resourcePath}/${imageId}`);
  return response.data;
}

export async function updateImage(imageId: string, imageData: ImageData) {
  const response = await apiClient.put(
    `/${resourcePath}/${imageId}`,
    imageData,
  );
  return response.data;
}

export async function fetchImageById(imageId: string) {
  const response = await apiClient.get(`/${resourcePath}/${imageId}`);
  return response.data;
}

// export async function searchImagesByTags(tags: Tag[]) {
//   const response = await apiClient.get(
//     `/${resourcePath}/${apiRoutes.IMAGES.SEARCH}`,
//     {
//       params: { tags },
//     },
//   );
//   return response.data;
// }
