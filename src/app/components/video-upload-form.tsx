"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { upload } from "@imagekit/next";
import { Loader2, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { useNotification } from "./notification";
import { apiClient } from "@/lib/api-client";
import FileUpload from "./file-upload";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  const watchedTitle = watch("title");
  const watchedDescription = watch("description");

  const handleUploadSuccess = (response: Awaited<ReturnType<typeof upload>>) => {
    setValue("videoUrl", response.filePath || "");
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath || "");
    setUploadedVideo(response.filePath || "");
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const resetForm = () => {
    setValue("title", "");
    setValue("description", "");
    setValue("videoUrl", "");
    setValue("thumbnailUrl", "");
    setUploadProgress(0);
    setUploadedVideo(null);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);
      showNotification("Video published successfully!", "success");
      resetForm();
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
      {/* Title Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Video Title <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base ${
              errors.title
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            placeholder="Enter an engaging title for your video..."
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
          />
          {watchedTitle && !errors.title && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          )}
        </div>
        {errors.title && (
          <div className="flex items-center gap-2 text-red-500 text-xs sm:text-sm">
            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            {errors.title.message}
          </div>
        )}
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base ${
              errors.description
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            rows={4}
            placeholder="Describe your video content, add hashtags, or share the story behind your creation..."
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
          />
          {watchedDescription && !errors.description && (
            <CheckCircle className="absolute right-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          )}
        </div>
        {errors.description && (
          <div className="flex items-center gap-2 text-red-500 text-xs sm:text-sm">
            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            {errors.description.message}
          </div>
        )}
      </div>

      {/* Video Upload Section */}
      <div className="space-y-3 sm:space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload Video <span className="text-red-500">*</span>
        </label>

        {uploadedVideo ? (
          <div className="bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span className="text-green-800 font-medium text-sm sm:text-base">
                  Video uploaded successfully!
                </span>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-6 sm:p-8 text-center hover:border-purple-400 transition-colors">
            <FileUpload
              fileType="video"
              onSuccess={handleUploadSuccess}
              onProgress={handleUploadProgress}
            />
          </div>
        )}

        {/* Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm text-gray-600">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4 sm:pt-6">
        <button
          type="submit"
          disabled={loading || !isValid}
          className={`w-full py-3 sm:py-4 px-6 rounded-lg sm:rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${
            loading || !isValid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform shadow-lg hover:shadow-xl hover:scale-[1.02]"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              Publishing Video...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
              Publish Video
            </>
          )}
        </button>
      </div>
    </form>
  );
}
