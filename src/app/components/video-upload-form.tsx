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

  const handleUploadSuccess = (
    response: Awaited<ReturnType<typeof upload>>,
  ) => {
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
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Video Title <span className="text-rose-500">*</span>
        </label>

        <div className="relative">
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-0.5 focus:ring-gray-900 focus:border-gray-900 text-sm ${
              errors.title
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            placeholder="Enter a title (minimum 3 characters)..."
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
          />

          {watchedTitle && !errors.title && watchedTitle.length > 2 && (
            <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
          )}
        </div>

        {errors.title && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.title.message}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Description <span className="text-rose-500">*</span>
        </label>

        <div className="relative">
          <textarea
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg bg-white resize-none transition-all duration-200 focus:outline-none focus:ring-0.5 focus:ring-gray-900 focus:border-gray-900 text-sm ${
              errors.description
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            placeholder="Enter a description (minimum 10 characters)..."
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
          />

          {watchedDescription &&
            !errors.description &&
            watchedDescription.length > 9 && (
              <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-emerald-500" />
            )}
        </div>

        {errors.description && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.description.message}
          </div>
        )}
      </div>

      {/* Video Upload */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900">
          Upload Video <span className="text-rose-500">*</span>
        </label>

        {uploadedVideo ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-800 font-medium text-sm">
                Video uploaded successfully
              </span>
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition">
            <FileUpload
              fileType="video"
              onSuccess={handleUploadSuccess}
              onProgress={handleUploadProgress}
            />
          </div>
        )}

        {/* Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading || !isValid}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            loading || !isValid
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-black shadow-sm hover:shadow-md"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Publish Video
            </>
          )}
        </button>
      </div>
    </form>
  );
}
