"use client";

import { IKVideo } from "imagekitio-next";
import { useEffect, useRef, useState } from "react";
import { Loader2, Play } from "lucide-react";
import { IVideo } from "@/models/Video";

interface Props {
  video: IVideo;
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
}

export default function VideoComponent({
  video,
  activeVideoId,
  setActiveVideoId,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = video._id?.toString();
  const domId = `video-${videoId}`;

  const togglePlay = () => {
    const currentVideo = document.getElementById(
      domId,
    ) as HTMLVideoElement | null;
    if (!currentVideo) return;

    if (isPlaying) {
      currentVideo.pause();
      setIsPlaying(false);
      setActiveVideoId(null);
    } else {
      const allVideos = document.querySelectorAll("video");
      allVideos.forEach((vid) => {
        if (vid.id !== domId) {
          vid.pause();
        }
      });

      currentVideo.play();
      setIsPlaying(true);
      setActiveVideoId(videoId || null);
    }
  };

  useEffect(() => {
    if (activeVideoId !== videoId && isPlaying) {
      const currentVideo = document.getElementById(
        domId,
      ) as HTMLVideoElement | null;
      currentVideo?.pause();
      setIsPlaying(false);
    }
  }, [activeVideoId, videoId, isPlaying, domId]);

  return (
    <div className="group bg-white rounded-lg overflow-hidden relative">
      <div
        className="relative w-full cursor-pointer"
        style={{ aspectRatio: "9/16" }}
        onClick={togglePlay}
      >
        <IKVideo
          id={domId}
          path={video.videoUrl}
          transformation={[
            {
              height: "1920",
              width: "1080",
            },
          ]}
          className="w-full h-full object-cover"
          controls={false}
          onLoadedData={() => setIsLoading(false)}
        />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        {/* Center Play Button */}
        {!isPlaying && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-black ml-1" />
            </div>
          </div>
        )}

        {/* Bottom Overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 
                        bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        >
          <h3 className="text-white font-semibold text-sm line-clamp-2">
            {video.title}
          </h3>
          <p className="text-gray-200 text-xs line-clamp-2 mt-1">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}
