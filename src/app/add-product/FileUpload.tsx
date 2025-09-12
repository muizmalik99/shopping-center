"use client";

import React, { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  label: string;
  preview: string;
  onChange: (fileUrl: string) => void;
  onClear: () => void;
}

export default function FileUpload({
  label,
  preview,
  onChange,
  onClear,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size too large. Maximum 5MB allowed");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onChange(result.url);
      } else {
        alert(result.error || "Failed to upload file");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleClear = async () => {
    if (preview) {
      const filename = preview.split("/").pop();
      if (filename) {
        try {
          await fetch("/api/upload", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename }),
          });
        } catch (error) {
          console.error("Delete error:", error);
        }
      }
    }
    onClear();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="space-y-4">
        <label
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300
                     border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100
                     ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 mb-2 text-gray-400 animate-spin" />
          ) : (
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
          )}
          <p className="text-sm text-gray-500">
            {uploading ? "Uploading..." : "Click to upload or drag and drop"}
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
            required
          />
        </label>

        {preview && (
          <div className="relative inline-block">
            <Image
              src={preview}
              alt="Preview"
              width={128}
              height={128}
              className=" object-cover rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={handleClear}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              disabled={uploading}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
