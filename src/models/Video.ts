import mongoose, { Schema } from "mongoose";
import { title } from "process";

export const VIDEO_DIMENTIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    controls: {
      type: String,
      required: true,
    },
    transformation: {
      height: {
        type: Number,
        default: VIDEO_DIMENTIONS.height,
      },
      width: {
        type: Number,
        default: VIDEO_DIMENTIONS.width,
      },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  {
    timestamps: true,
  }
);

const Video =
  mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
