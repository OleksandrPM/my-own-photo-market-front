import exifr from "exifr";

export default async function parseXMPMetadata(
  file: File
): Promise<Record<string, any> | null> {
  try {
    const xmpData = await exifr.parse(file, { xmp: true });
    return xmpData;
  } catch (error) {
    console.error("Error parsing XMP metadata:", error);
    return null;
  }
}
