import { IVideo } from "@/models/Video";
import VideoComponent from "./video-component";
import { Play, TrendingUp } from "lucide-react";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Featured Videos</h3>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Trending now</span>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
        {videos.map((video, index) => (
          <div
            key={video._id?.toString()}
            className="transform transition-all duration-300"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <VideoComponent video={video} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {videos.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Play className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No videos yet</h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-4">Be the first to share amazing content!</p>
        </div>
      )}

      {/* Load More Button */}
      {videos.length > 0 && (
        <div className="text-center pt-6 sm:pt-8">
          <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base">
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            Load More Videos
          </button>
        </div>
      )}
    </div>
  );
}
