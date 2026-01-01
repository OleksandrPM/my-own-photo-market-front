"use client";

import { useState, useCallback } from "react";
import * as exifr from "exifr";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  // TODO: Define proper type for fileData
  const [fileData, setFileData] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);

  // del
  console.log(fileData);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      setFile(droppedFile);
      parseXMPMetadata(droppedFile);
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
      setFile(selectedFile);
      parseXMPMetadata(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    // Form data, send file to server, clear state, etc.
    const formData = new FormData();
    formData.append("image", file);
    formData.append("metadata", JSON.stringify(fileData));

    // Example: Send to server (replace with actual endpoint)
    // try {
    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   if (response.ok) {
    //     console.log("Upload successful");
    //   } else {
    //     console.error("Upload failed");
    //   }
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    // }

    setFile(null);
  };

  const parseXMPMetadata = async (file: File) => {
    try {
      const xmpData = await exifr.parse(file, { xmp: true });
      // Restructure or process xmpData as needed
      setFileData(xmpData);
    } catch (error) {
      console.error("Error parsing XMP metadata:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      {!file ? (
        <>
          {/* Drag & Drop Zone */}
          <div
            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition cursor-pointer
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
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
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
        </>
      ) : (
        <>
          {/* Preview */}
          <div className="mt-4">
            <p className="text-gray-700 text-sm mb-2">Selected:</p>
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-full rounded-lg shadow"
            />
            <p>File name: {file?.name}</p>
            <p>Created: {fileData?.CreateDate.toString()}</p>
            <p>
              File size: {fileData?.ImageWidth} X {fileData?.ImageHeight}
            </p>
            <p>Orientation: {fileData?.Orientation}</p>
          </div>

          {/* Submit Form */}

          <label
            htmlFor="file-input-submit"
            className="block w-full py-2.5 text-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Submit
          </label>

          <input
            id="file-input-submit"
            type="submit"
            className="hidden"
            onClick={handleSubmit}
          />
        </>
      )}
    </div>
  );
}
