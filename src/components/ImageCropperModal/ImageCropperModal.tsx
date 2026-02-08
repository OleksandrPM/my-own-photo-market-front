"use client";

import { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImage } from "lib/utils/cropImage";

export interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onApply: (file: File) => void;
}

export function ImageCropperModal({
  isOpen,
  imageSrc,
  onClose,
  onApply,
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  if (!isOpen || !imageSrc) return null;

  const handleCropComplete = (_: any, area: any) => {
    setCroppedAreaPixels(area);
  };

  const handleApply = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const croppedFile = await getCroppedImage(
      imageSrc,
      crop,
      zoom,
      croppedAreaPixels,
    );

    onApply(croppedFile);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[90vw] max-w-md">
        <div className="relative w-full h-64 bg-gray-200">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
}
