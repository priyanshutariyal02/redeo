"use client";

import { useState } from "react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, CheckCircle } from "lucide-react";
import { useNotification } from "./notification";
import { useSession } from "next-auth/react";
import FileUpload from "./file-upload";

interface ProfilePictureUploadProps {
  onUpdate?: (url: string) => void;
  className?: string;
}

export default function ProfilePictureUpload({ onUpdate, className = "" }: ProfilePictureUploadProps) {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const handleUploadSuccess = async (response: IKUploadResponse) => {
    console.log("Profile picture upload response:", response);
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch("/api/auth/profile-picture", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profilePicture: response.url,
        }),
      });

      console.log("Profile picture update response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Profile picture update error:", errorData);
        throw new Error(errorData.error || "Failed to update profile picture");
      }

      const result = await res.json();
      console.log("Profile picture update result:", result);

      // Update the session properly
      await update({
        profilePicture: response.url,
      });

      showNotification("Profile picture updated successfully!", "success");
      onUpdate?.(response.url);
      
      // Force a page refresh to ensure the session is updated everywhere
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error("Profile picture update error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to update profile picture";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleUploadProgress = (progress: number) => {
    console.log("Upload progress:", progress);
    setUploadProgress(progress);
  };

  const currentProfilePicture = session?.user?.profilePicture;

  return (
    <div className={`relative ${className}`}>
      {/* Current Profile Picture */}
      <div className="relative group">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
          {currentProfilePicture ? (
            <img
              src={currentProfilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-lg sm:text-xl font-medium">
              {session?.user?.email?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
        </div>

        {/* Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-6 h-6 text-white animate-spin mx-auto mb-2" />
              <span className="text-white text-xs">{uploadProgress}%</span>
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
      <div className="mt-4">
        {uploadProgress === 0 && !loading && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
            <FileUpload
              fileType="image"
              onSuccess={handleUploadSuccess}
              onProgress={handleUploadProgress}
            />
            <p className="text-xs text-gray-500 mt-2">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG up to 100MB
            </p>
          </div>
        )}
      </div>

      {/* Success Message */}
      {uploadProgress === 100 && !loading && !error && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-800 text-sm">Profile picture updated!</span>
          </div>
        </div>
      )}
    </div>
  );
} 