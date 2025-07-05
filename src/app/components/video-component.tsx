import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { IVideo } from "@/models/Video";
import { Play, Heart, MessageCircle, Share2, Eye } from "lucide-react";
import { useSession } from "next-auth/react";

export default function VideoComponent({ video }: { video: IVideo }) {
  const { data: session } = useSession();
  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Video Thumbnail */}
      <div className="relative overflow-hidden">
        {/* <Link href={`/videos/${video._id}`} className="block"> */}
          <div className="relative w-full" style={{ aspectRatio: "9/16" }}>
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover transition-transform duration-300"
            />

            {/* Play Button Overlay */}
            {/* <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-8 h-8 text-purple-600 ml-1" />
              </div>
            </div> */}

            {/* Video Duration Badge */}
            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
              2:34
            </div>
          </div>
        {/* </Link> */}
      </div>

      {/* Video Info */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* Title */}
        <Link href={`/videos/${video._id}`} className="block group/title">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-lg leading-tight group-hover/title:text-purple-600 transition-colors duration-200 line-clamp-2">
            {video.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
          {video.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span className="text-xs">1.2k</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span className="text-xs">234</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              <span className="text-xs">45</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="w-3 h-3" />
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-2 sm:gap-3 pt-2 border-t border-gray-100">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
            {typeof video.user === 'object' && video.user !== null && (video.user as any).profilePicture ? (
              <img
                src={(video.user as any).profilePicture}
                alt="Creator"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-xs font-medium">
                {video.title?.charAt(0).toUpperCase() || "C"}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
              {typeof video.user === 'object' && video.user !== null 
                ? (video.user as { username: string }).username 
                : typeof video.user === 'string' 
                  ? video.user 
                  : 'Unknown User'}
            </p>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>
      </div>

      {/* Hover Actions */}
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="w-6 h-6 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
