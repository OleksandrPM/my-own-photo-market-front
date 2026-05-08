import {
  CreateImageData,
  ImageData,
  Orientation,
} from "@/types/image/image-data.types";
import parseXMPMetadata from "./parseXMPMetadata";

export default async function createImageData(
  image: File,
): Promise<CreateImageData> {
  const { name, type } = image;

  const imageData: CreateImageData = {
    name,
    type,
  };

  try {
    const xmpData = await parseXMPMetadata(image);

    if (!xmpData) return imageData;

    imageData.description = xmpData.Description ?? null;
    imageData.creationDate = xmpData.CreateDate
      ? new Date(xmpData.CreateDate)
      : null;

    const width = xmpData.ImageWidth ?? null;
    const height = xmpData.ImageHeight ?? null;

    const orientation = determineOrientation(
      width,
      height,
      xmpData.Orientation ?? null,
    );

    imageData.orientation = orientation;

    if (orientation && width != null && height != null) {
      imageData.width = orientation === Orientation.VERTICAL ? height : width;
      imageData.height = orientation === Orientation.VERTICAL ? width : height;
    }
  } catch (error) {
    console.error("Error creating image data:", error);
  }

  return imageData;
}

function determineOrientation(
  width: number | null,
  height: number | null,
  orientationValue: string | null,
): Orientation | null {
  if (width != null && height != null && orientationValue) {
    if (width === height) {
      return Orientation.SQUARE;
    }
    if (orientationValue.toLowerCase().includes("horizontal")) {
      return Orientation.HORIZONTAL;
    } else {
      return Orientation.VERTICAL;
    }
  } else {
    return null;
  }
}
