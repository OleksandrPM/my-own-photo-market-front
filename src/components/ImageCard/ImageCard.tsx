import { ImageDataResponse } from "types/imageData";

export interface ImageCardProps {
  image: ImageDataResponse;
}

export default function ImageCard({ image }: ImageCardProps) {
  return <div>Image Card Component</div>;
}
