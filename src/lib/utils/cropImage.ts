import { Area } from "react-easy-crop";

export enum ImageMimeType {
  JPEG = "image/jpeg",
  PNG = "image/png",
  WEBP = "image/webp",
}

export enum ImageExtension {
  JPEG = "jpg",
  PNG = "png",
  WEBP = "webp",
}

export const MimeToExtension: Record<ImageMimeType, ImageExtension> = {
  [ImageMimeType.JPEG]: ImageExtension.JPEG,
  [ImageMimeType.PNG]: ImageExtension.PNG,
  [ImageMimeType.WEBP]: ImageExtension.WEBP,
};

export function getImageMime(fileName: string): ImageMimeType | null {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (!ext) return null;

  for (const mime in MimeToExtension) {
    const mappedExt = MimeToExtension[mime as ImageMimeType];
    if (mappedExt === ext) {
      return mime as ImageMimeType;
    }
  }

  return null;
}

export async function getCroppedImage(
  imageSrc: string,
  croppedAreaPixels: Area,
  fileName: string = "image",
  mimeType: ImageMimeType = ImageMimeType.JPEG,
  quality: number = 1,
): Promise<File> {
  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        const ext = MimeToExtension[mimeType];
        const finalFile = new File([blob!], `${fileName}.${ext}`, {
          type: mimeType,
        });
        resolve(finalFile);
      },
      mimeType,
      quality,
    );
  });
}
