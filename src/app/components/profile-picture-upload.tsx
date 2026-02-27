"use client";

import { useState } from "react";
import { upload } from "@imagekit/next";
import { Loader2, CheckCircle } from "lucide-react";
import { useNotification } from "./notification";
import { useSession } from "next-auth/react";
import FileUpload from "./file-upload";

interface ProfilePictureUploadProps {
  onUpdate?: (url: string) => void;
  className?: string;
}

export default function ProfilePictureUpload({
  onUpdate,
  className = "",
}: ProfilePictureUploadProps) {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const handleUploadSuccess = async (
    response: Awaited<ReturnType<typeof upload>>,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/profile-picture", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profilePicture: response.url || "",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Profile picture update error:", errorData);
        throw new Error(errorData.error || "Failed to update profile picture");
      }

      const profilePictureUrl = response.url || "";

      // Update the session properly
      await update({
        profilePicture: profilePictureUrl,
      });

      showNotification("Profile picture updated successfully!", "success");
      onUpdate?.(profilePictureUrl);

      // Force a page refresh to ensure the session is updated everywhere
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Profile picture update error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update profile picture";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const currentProfilePicture = session?.user?.profilePicture;
  console.log(currentProfilePicture);
  return (
    <div className={`relative ${className}`}>
      {/* Current Profile Picture */}
      <div className="relative group">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
          {currentProfilePicture ? (
            <img
              src={currentProfilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-700 text-lg sm:text-xl font-semibold">
              {session?.user?.email?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
        </div>

        {/* Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-6 h-6 text-white animate-spin mx-auto mb-2" />
              <span className="text-white text-xs font-medium">
                {uploadProgress}%
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}
      </div>

      {/* Upload Area */}
      <div className="mt-6">
        {uploadProgress === 0 && !loading && (
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-all duration-300 bg-white hover:border-gray-400">
            <FileUpload
              fileType="image"
              onSuccess={handleUploadSuccess}
              onProgress={handleUploadProgress}
            />

            <p className="text-sm text-gray-600 mt-3">
              Click to upload or drag and drop
            </p>

            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 100MB</p>
          </div>
        )}
      </div>

      {/* Success Message */}
      {uploadProgress === 100 && !loading && !error && (
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 text-sm font-medium">
              Profile picture updated!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
