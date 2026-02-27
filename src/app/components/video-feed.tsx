"use client";
import { IVideo } from "@/models/Video";
import VideoComponent from "./video-component";
import { Play, TrendingUp } from "lucide-react";
import { useState } from "react";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-rose-50 border border-rose-100 rounded-lg flex items-center justify-center">
            <Play className="w-4 h-4 text-rose-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Video Feed
          </h3>
        </div>

        {/* <div className="flex items-center gap-2 text-sm text-gray-500">
          <TrendingUp className="w-4 h-4 text-rose-500" />
          <span>Trending now</span>
        </div> */}
      </div>

      {/* Video Grid */}
      {videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoComponent
              key={video._id?.toString()}
              video={video}
              activeVideoId={activeVideoId}
              setActiveVideoId={setActiveVideoId}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {videos.length === 0 && (
        <div className="text-center py-20 bg-white border rounded-2xl shadow-sm">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Play className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            No videos yet
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Be the first to share amazing content with the community.
          </p>
        </div>
      )}
    </div>
  );
}
