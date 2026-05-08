import { ImageDataResponse } from "@/types/image/image-data.types";

export interface ImageCardProps {
  image: ImageDataResponse;
}

export default function ImageCard({ image }: ImageCardProps) {
  return <div>Image Card Component</div>;
}
