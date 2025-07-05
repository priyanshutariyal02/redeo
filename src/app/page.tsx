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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <span>Welcome to</span>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-l from-purple-500 to-blue-500 backdrop-blur-sm rounded-full">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                </span>
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Redeo
                </span>
              </div>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl my-6 sm:my-8 max-w-2xl sm:max-w-3xl mx-auto px-4">
              Discover amazing videos, share your stories, and connect with
              creators from around the world
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-white/80 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Trending Content</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Global Community</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>High Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-4 sm:right-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/10 rounded-full blur-lg"></div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-left mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
              Video Feed
            </h2>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
              <div className="space-y-4 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-gray-600 text-sm sm:text-base">Loading amazing videos...</p>
              </div>
            </div>
          )}

          {/* Video Feed */}
          {!loading && (
            <>
              {videos.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    No videos yet
                  </h3>
                  <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base px-4">
                    Be the first to share your amazing content!
                  </p>
                  <a
                    href="/upload"
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    Upload Your First Video
                  </a>
                </div>
              ) : (
                <VideoFeed videos={videos} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
