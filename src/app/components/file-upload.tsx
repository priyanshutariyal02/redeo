"use client"; // This component must be a client component

import { upload } from "@imagekit/next";
import { useState, useRef, useCallback } from "react";
import { Video, Image, AlertCircle, CheckCircle } from "lucide-react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({
  onSuccess,
  onProgress,
  fileType = "video",
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError("");

    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file (MP4, MOV, AVI, etc.)");
        return false;
      }
    } else if (fileType === "image") {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file (JPG, PNG, GIF, etc.)");
        return false;
      }
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }

    return true;
  };

  const handleFileUpload = async (file: File) => {
    if (!validateFile(file)) return;

    setUploading(true);
    setError("");
    setSelectedFile(file);

    try {
      // Get ImageKit authentication
      const authRes = await fetch("/api/auth/imagekit-auth");

      let auth;
      try {
        auth = await authRes.json();
      } catch (parseError) {
        console.error("Failed to parse auth response:", parseError);
        throw new Error("Invalid server response");
      }

      // Check if we have the required authentication parameters
      if (!auth.signature || !auth.expire || !auth.token) {
        console.error("Invalid auth response:", auth);
        throw new Error("Invalid authentication response");
      }

      // Upload file to ImageKit
      const res = await upload({
        file,
        fileName: `${Date.now()}-${file.name}`, // Add timestamp to prevent conflicts
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent));
          }
        },
      });

      console.log("Upload successful:", res);
      onSuccess(res);
    } catch (error) {
      console.error("Upload failed:", error);

      // Provide more specific error messages
      if (error instanceof Error) {
        if (
          error.message.includes("authentication") ||
          error.message.includes("configuration")
        ) {
          setError("Server configuration error. Please contact support.");
        } else if (
          error.message.includes("network") ||
          error.message.includes("fetch")
        ) {
          setError(
            "Network error. Please check your connection and try again."
          );
        } else if (error.message.includes("Invalid server response")) {
          setError("Server error. Please try again later.");
        } else {
          setError(`Upload failed: ${error.message}`);
        }
      } else {
        setError("Upload failed. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getUploadText = () => {
    if (fileType === "image") {
      return {
        title: uploading ? "Uploading..." : "Drop your image here",
        subtitle: uploading
          ? "Please wait while we upload your image"
          : "or click to browse files",
        icon: Image,
      };
    } else {
      return {
        title: uploading ? "Uploading..." : "Drop your video here",
        subtitle: uploading
          ? "Please wait while we upload your video"
          : "or click to browse files",
        icon: Video,
      };
    }
  };

  const uploadText = getUploadText();
  const IconComponent = uploadText.icon;

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive
            ? "border-purple-400 bg-purple-50"
            : "border-gray-300 hover:border-gray-400"
        } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={fileType === "video" ? "video/*" : "image/*"}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="flex justify-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                dragActive ? "bg-purple-100" : "bg-gray-100"
              }`}
            >
              {uploading ? (
                <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <IconComponent
                  className={`w-8 h-8 ${
                    dragActive ? "text-purple-600" : "text-gray-600"
                  }`}
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">
              {uploadText.title}
            </h3>
            <p className="text-gray-500">{uploadText.subtitle}</p>
            {selectedFile && (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <span>{selectedFile.name}</span>
                <span className="text-gray-400">•</span>
                <span>{formatFileSize(selectedFile.size)}</span>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Display */}
          {!uploading && !error && selectedFile && (
            <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 border border-green-200 rounded-lg p-3">
              <CheckCircle className="w-4 h-4" />
              <span>File selected: {selectedFile.name}</span>
            </div>
          )}
        </div>

        {/* Click to upload overlay */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        />
      </div>
    </div>
  );
};

export default FileUpload;
