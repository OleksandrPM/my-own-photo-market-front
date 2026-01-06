import { ImageData, Orientation } from "types/imageData";
import parseXMPMetadata from "./parseXMPMetadata";

export default async function createImageData(image: File): Promise<ImageData> {
  const { name, type } = image;
  const imageData = {} as ImageData;

  try {
    imageData.name = name;
    imageData.type = type;
    const xmpData = await parseXMPMetadata(image);

    if (xmpData) {
      imageData.description = xmpData.Description || null;
      imageData.creationDate = xmpData.CreateDate
        ? new Date(xmpData.CreateDate)
        : null;

      const imageWidth = xmpData.ImageWidth || null;
      const imageHeight = xmpData.ImageHeight || null;
      const orientationValue = xmpData.Orientation || null;
      imageData.orientation = determineOrientation(
        imageWidth,
        imageHeight,
        orientationValue
      );

      imageData.width =
        imageData.orientation === Orientation.VERTICAL
          ? imageHeight
          : imageWidth;
      imageData.height =
        imageData.orientation === Orientation.VERTICAL
          ? imageWidth
          : imageHeight;
    }
  } catch (error) {
    console.error("Error creating image data:", error);
  }

  return imageData;
}

function determineOrientation(
  width: number | null,
  height: number | null,
  orientationValue: string | null
): Orientation | null {
  if (width && height && orientationValue) {
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
