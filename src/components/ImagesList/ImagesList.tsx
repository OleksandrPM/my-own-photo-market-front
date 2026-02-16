import ImageCard from "components/ImageCard";
import { ImageDataResponse } from "types/imageData";

export interface ImagesListProps {
  images: ImageDataResponse[];
}

export default function ImagesList({ images }: ImagesListProps) {
  return (
    <ul>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
}
