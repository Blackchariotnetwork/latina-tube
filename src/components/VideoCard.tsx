import React from 'react';
import { Play, ThumbsUp, Bookmark, Sparkles } from 'lucide-react';
import { Video } from '../data/videos';

interface VideoCardProps {
  video: Video;
  onSelectVideo: (video: Video) => void;
  onSelectModel: (modelId: string) => void;
  isSaved?: boolean;
  onToggleSave?: (videoId: string, e: React.MouseEvent) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onSelectVideo,
  onSelectModel,
  isSaved = false,
  onToggleSave
}) => {
  return (
    <article
      onClick={() => onSelectVideo(video)}
      className="group relative flex flex-col bg-[#14121e] hover:bg-[#1b1728] border border-[#262137] hover:border-[#ff3358]/60 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 transform-gpu hover:-translate-y-0.5 shadow-sm hover:shadow-lg hover:shadow-[#ff3358]/10"
    >
      {/* 16:9 Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0d0b13]">
        <img
          src={video.thumb}
          alt={video.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
          onError={(e) => {
            // Elegant gradient fallback
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />

        {/* Fallback CSS pattern behind image */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1d192c] to-[#0d0b13] flex items-center justify-center p-3 text-center">
          <span className="text-xs text-gray-500 font-mono">{video.category}</span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/85 backdrop-blur-sm text-[#ff3358] border border-[#ff3358]/30">
            {video.quality}
          </span>
          {video.isFeatured && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#ffaa33]/90 text-black flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 fill-current" /> Hot
            </span>
          )}
        </div>

        {/* Save to Favorites toggle */}
        {onToggleSave && (
          <button
            onClick={(e) => onToggleSave(video.id, e)}
            title={isSaved ? "Remove from Saved" : "Save for Later"}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-md bg-black/70 hover:bg-black text-gray-300 hover:text-white transition-colors"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-[#ff3358] fill-[#ff3358]' : ''}`} />
          </button>
        )}

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 z-10">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold font-mono bg-black/85 backdrop-blur-sm text-gray-100">
            {video.duration}
          </span>
        </div>

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#ff3358] to-[#ff5e36] flex items-center justify-center text-white shadow-xl shadow-[#ff3358]/40 transform scale-90 group-hover:scale-100 transition-transform duration-200">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Meta Content */}
      <div className="p-3 flex flex-col flex-1 justify-between gap-2.5">
        
        {/* Title */}
        <h3 className="text-xs sm:text-sm font-semibold text-gray-100 group-hover:text-[#ff3358] transition-colors line-clamp-2 leading-snug">
          {video.title}
        </h3>

        {/* Model & Stats */}
        <div className="flex flex-col gap-1.5 pt-1 border-t border-[#262137]/80">
          {/* Clickable Model Link */}
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectModel(video.modelId);
              }}
              className="text-xs font-medium text-gray-300 hover:text-[#ffaa33] transition-colors flex items-center gap-1.5 truncate max-w-[70%]"
            >
              <img
                src={video.modelAvatar}
                alt={video.modelName}
                className="w-4 h-4 rounded-full object-cover shrink-0 border border-[#29243a]"
              />
              <span className="truncate">{video.modelName}</span>
            </button>

            <span className="text-[11px] text-gray-400 shrink-0 font-medium flex items-center gap-1">
              <span>{video.city}</span>
              <span className="text-xs">{video.flag}</span>
            </span>
          </div>

          {/* Unboxed Metadata Stats */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono tabular-nums">
            <span>{video.views} views</span>
            <span className="flex items-center gap-1 text-[#ffaa33] font-semibold">
              <ThumbsUp className="w-3 h-3 text-[#ff3358]" />
              {video.rating}
            </span>
          </div>
        </div>

      </div>
    </article>
  );
};
