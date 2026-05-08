"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import createImageData from "@/lib/utils/createImageData";
import { ImageData } from "@/types/image/image-data.types";
import TagManager from "@/components/TagManager";

export default function ImageUploader() {
  const [image, setImage] = useState<File | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedImage = e.dataTransfer.files?.[0];

    if (droppedImage) {
      setImage(droppedImage);
      createImageData(droppedImage).then(setImageData);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      createImageData(selectedFile).then(setImageData);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    // Form data, send file to server, clear state, etc.
    const formData = new FormData();
    formData.append("image", image);
    formData.append("metadata", JSON.stringify(imageData));

    // Send to server (replace with actual endpoint)
    // try {
    //   const response = await uploadImage(formData);
    //   if (response.ok) {
    //     console.log("Upload successful");
    //   } else {
    //     console.error("Upload failed");
    //   }
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    // }

    // del
    console.log(imageData);

    setImage(null);
    setImageData(null);
  };

  return (
    <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit}>
      {!image ? (
        <div>
          {/* Drag & Drop Zone */}
          <div
            className={`flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-xl transition cursor-pointer
        ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-100"
        }
    `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <p className="text-gray-600 text-center pointer-events-none">
              Drag & drop your image here
            </p>
          </div>

          {/* OR separator */}
          <div className="flex items-center my-4">
            <div className="grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <div className="grow border-t border-gray-300"></div>
          </div>

          {/* Add Image Button */}
          <label
            htmlFor="file-input"
            className="block w-full py-2.5 text-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Choose Image
          </label>

          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      ) : (
        <div>
          {/* Preview */}
          <div className="mt-4">
            <p className="text-gray-700 text-sm mb-2">Selected:</p>
            <Image
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-full rounded-lg shadow"
              width={500}
              height={300}
            />
            <p>File name: {imageData?.name}</p>
            <p>Created: {imageData?.creationDate?.toString()}</p>
            <p>
              File size: {imageData?.width} X {imageData?.height}
            </p>
            <p>Orientation: {imageData?.orientation}</p>
          </div>

          {/* Reducted Fields */}

          <label htmlFor="addPhotoForm-description">Description:</label>
          <input
            id="addPhotoForm-description"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter description"
            value={imageData?.description || ""}
            onChange={(e) =>
              setImageData((prev) =>
                prev ? { ...prev, description: e.target.value } : null,
              )
            }
          />
          <TagManager />

          <button
            className="block w-full py-2.5 text-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
}
