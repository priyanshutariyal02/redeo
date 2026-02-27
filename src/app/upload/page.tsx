"use client";

import VideoUploadForm from "../components/video-upload-form";
import { Upload, Sparkles } from "lucide-react";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-900 rounded-lg mb-6">
              <Upload className="w-6 h-6 text-white" />
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Share Your Story
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your content and connect with a global audience. Create,
              inspire, and grow your presence with Redeo.
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-rose-500 rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Upload New Video
              </h2>
            </div>

            <VideoUploadForm />
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">High Quality</h3>
              <p className="text-gray-600 text-sm">
                Upload videos in stunning quality up to 4K resolution.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Upload</h3>
              <p className="text-gray-600 text-sm">
                Reliable and fast upload speeds with real-time progress
                tracking.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600 text-sm">
                Share your content with viewers around the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
