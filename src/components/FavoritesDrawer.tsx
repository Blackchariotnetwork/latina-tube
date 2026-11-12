import React from 'react';
import { X, Bookmark, Film, Heart, Trash2, Play } from 'lucide-react';
import { Video } from '../data/videos';
import { Model } from '../data/models';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedVideos: Video[];
  followedModels: Model[];
  onSelectVideo: (video: Video) => void;
  onSelectModel: (modelId: string) => void;
  onRemoveVideo: (videoId: string) => void;
  onUnfollowModel: (modelId: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  savedVideos,
  followedModels,
  onSelectVideo,
  onSelectModel,
  onRemoveVideo,
  onUnfollowModel
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#121019] border-l border-[#29243a] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#29243a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#ff3358]" />
            <h2 className="text-base font-bold font-['Syne'] text-white">
              Saved Vault & Following
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close saved drawer"
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#181523]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Saved Videos Section */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Saved Videos ({savedVideos.length})</span>
            </div>

            {savedVideos.length > 0 ? (
              <div className="space-y-3">
                {savedVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex gap-3 bg-[#181523] border border-[#29243a] rounded-xl p-2.5 hover:border-[#ff3358]/50 transition-colors group cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectVideo(video);
                    }}
                  >
                    <div className="relative aspect-video w-24 rounded-lg overflow-hidden shrink-0 bg-black">
                      <img
                        src={video.thumb}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 text-white px-1 rounded">
                        {video.duration}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h4 className="text-xs font-semibold text-gray-200 group-hover:text-[#ff3358] line-clamp-2 leading-snug">
                        {video.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-gray-400">
                        <span>{video.modelName}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveVideo(video.id);
                          }}
                          className="p-1 hover:text-red-400 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic py-2">
                No videos saved yet. Click the bookmark icon on any tape card.
              </p>
            )}
          </div>

          {/* Followed Models Section */}
          <div className="pt-4 border-t border-[#29243a]">
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Followed Starlets ({followedModels.length})</span>
            </div>

            {followedModels.length > 0 ? (
              <div className="space-y-2.5">
                {followedModels.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center justify-between bg-[#181523] border border-[#29243a] rounded-xl p-2.5 hover:border-[#ff3358]/50 transition-colors cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectModel(model.id);
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={model.avatar}
                        alt={model.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#29243a]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white hover:text-[#ff3358]">
                          {model.name}
                        </h4>
                        <span className="text-[10px] text-[#ffaa33]">{model.origin} {model.flag}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUnfollowModel(model.id);
                      }}
                      className="text-[11px] text-gray-400 hover:text-red-400 px-2 py-1 rounded"
                    >
                      Unfollow
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic py-2">
                No models followed yet. Visit the Models Directory to follow starlets.
              </p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#29243a] bg-[#0d0b13] text-center">
          <p className="text-[11px] text-gray-500">
            Saved items are locally stored on your current device.
          </p>
        </div>
      </div>
    </div>
  );
};
