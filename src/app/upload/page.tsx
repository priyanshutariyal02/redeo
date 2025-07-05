"use client";

import VideoUploadForm from "../components/video-upload-form";
import { Upload, Sparkles } from "lucide-react";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-4 sm:mb-6">
              <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              Share Your Story
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Upload your amazing videos and connect with the world. Create,
              share, and inspire with your unique content.
            </p>
          </div>

          {/* Upload Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-1.5 h-6 sm:w-2 sm:h-8 bg-gradient-to-b from-purple-500 to-blue-600 rounded-full"></div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Upload New Reel
              </h2>
            </div>
            <VideoUploadForm />
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-white/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">High Quality</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Upload videos in stunning quality up to 4K resolution
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-white/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Fast Upload</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Lightning-fast upload speeds with progress tracking
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-white/20 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Global Reach</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Share your content with millions of viewers worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
