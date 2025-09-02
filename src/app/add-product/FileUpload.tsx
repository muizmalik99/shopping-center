"use client";

import React from "react";
import { Upload, X } from "lucide-react";

interface FileUploadProps {
  label: string;
  preview: string;
  onChange: (file: File | null) => void;
  onClear: () => void;
}

export default function FileUpload({ label, preview, onChange, onClear }: FileUploadProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="space-y-4">
        <label
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300
                     border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <Upload className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onChange(e.target.files?.[0] || null)}
            className="hidden"
            required
          />
        </label>

        {preview && (
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={onClear}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
