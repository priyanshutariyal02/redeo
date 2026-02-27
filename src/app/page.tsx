"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./components/video-feed";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import { Play, TrendingUp, Users, Sparkles } from "lucide-react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-50 border border-rose-100 rounded-full mb-8">
              <div className="w-8 h-8 flex items-center justify-center bg-rose-500 rounded-full">
                <Play className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-rose-600">
                Welcome to Redeo
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900">
              Discover. Create.
              <span className="block bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                Share Your Story.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Explore high-quality content, connect with creators worldwide, and
              share your creativity with a global audience.
            </p>

            {/* Feature Row */}
            <div className="flex flex-wrap justify-center gap-8 mt-10 text-gray-600 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-500" />
                Trending Content
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                Global Community
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Premium Quality
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12">
              <a
                href="/upload"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5" />
                Start Uploading
              </a>
            </div>
          </div>
        </div>

        {/* Background Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-100 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && videos.length === 0 && (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm border">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No videos yet
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to share your content with the world.
              </p>
              <a
                href="/upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition"
              >
                Upload Video
              </a>
            </div>
          )}

          {/* Video Feed */}
          {!loading && videos.length > 0 && (
            <div className="">
              <VideoFeed videos={videos} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
