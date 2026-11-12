import React, { useEffect } from 'react';
import { X, BadgeCheck, MapPin, Eye, Film, Heart, Sparkles, ExternalLink, Share2 } from 'lucide-react';
import { Model } from '../data/models';
import { Video } from '../data/videos';
import { VideoCard } from './VideoCard';

interface ModelModalProps {
  model: Model | null;
  onClose: () => void;
  relatedVideos: Video[];
  onSelectVideo: (video: Video) => void;
  isFollowed: boolean;
  onToggleFollow: (modelId: string) => void;
  savedVideoIds: string[];
  onToggleSaveVideo: (videoId: string, e: React.MouseEvent) => void;
}

export const ModelModal: React.FC<ModelModalProps> = ({
  model,
  onClose,
  relatedVideos,
  onSelectVideo,
  isFollowed,
  onToggleFollow,
  savedVideoIds,
  onToggleSaveVideo
}) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (model) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [model, onClose]);

  if (!model) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-[#121019] border border-[#29243a] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/75 hover:bg-[#ff3358] border border-white/10 text-white flex items-center justify-center transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Cinematic Banner & Avatar Header */}
        <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden bg-[#09080e]">
          <img
            src={model.banner}
            alt={`${model.name} banner`}
            className="w-full h-full object-cover object-center opacity-65 brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121019] via-[#121019]/60 to-transparent" />
          
          {/* Starlet Identity Row */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end gap-5 z-20">
            {/* Avatar Photo */}
            <div className="relative shrink-0">
              <img
                src={model.avatar}
                alt={model.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-[#121019] object-cover shadow-2xl ring-2 ring-[#ff3358]/50"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-1 p-1 bg-[#ff3358] text-white rounded-full shadow-md">
                <BadgeCheck className="w-4 h-4 fill-current" />
              </span>
            </div>

            {/* Info & Badges */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Syne'] text-white">
                  {model.name}
                </h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#ff3358]/20 text-[#ff3358] border border-[#ff3358]/40 uppercase tracking-wider">
                  Verified Creator
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#ffaa33] mb-3">
                <MapPin className="w-4 h-4 text-[#ff3358]" />
                <span>{model.origin}</span>
                <span className="text-sm">{model.flag}</span>
                <span aria-hidden="true" className="text-gray-600">·</span>
                <span>{model.city}</span>
                <span aria-hidden="true" className="text-gray-600">·</span>
                <span>Age {model.age}</span>
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap gap-2 sm:gap-3 text-xs font-mono text-gray-200">
                <div className="bg-[#181523]/90 px-3 py-1.5 rounded-lg border border-[#29243a] flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#ff3358]" />
                  <span><strong>{model.scenesCount}</strong> Exclusive Tapes</span>
                </div>
                <div className="bg-[#181523]/90 px-3 py-1.5 rounded-lg border border-[#29243a] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#ffaa33]" />
                  <span><strong>{model.views}</strong> Views</span>
                </div>
                <div className="bg-[#181523]/90 px-3 py-1.5 rounded-lg border border-[#29243a] flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#ff3358]" />
                  <span><strong>{model.followers}</strong> Followers</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onToggleFollow(model.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isFollowed
                    ? 'bg-[#29243a] text-white hover:bg-[#342e4a] border border-[#3f385c]'
                    : 'bg-gradient-to-r from-[#ff3358] to-[#ff5e36] text-white shadow-lg shadow-[#ff3358]/20 hover:opacity-95'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFollowed ? 'fill-current text-[#ff3358]' : ''}`} />
                {isFollowed ? 'Following' : 'Follow Starlet'}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body: Biography & Related Videos */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          
          {/* Section: Biography */}
          <div className="bg-[#181523] border border-[#29243a] rounded-2xl p-5 sm:p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff3358] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Biography & Creator Profile
            </h3>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
              {model.bio}
            </p>

            {/* Specialties */}
            <div className="mt-4 pt-4 border-t border-[#29243a]/70 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-gray-400 mr-1">Specialties:</span>
              {model.specialties.map((spec) => (
                <span
                  key={spec}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#121019] text-[#ffaa33] border border-[#29243a] font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Section: Related Videos on the Site */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-['Syne'] text-white flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#ff3358]" />
                  Exclusive Tapes Starring {model.name}
                </h3>
                <p className="text-xs text-gray-400">
                  {relatedVideos.length} archived high-definition productions available on latinasextapes.fun
                </p>
              </div>
            </div>

            {/* 4 / 3 Column Grid inside Modal */}
            {relatedVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onSelectVideo={(v) => {
                      onClose();
                      onSelectVideo(v);
                    }}
                    onSelectModel={() => {}}
                    isSaved={savedVideoIds.includes(video.id)}
                    onToggleSave={onToggleSaveVideo}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-[#181523] rounded-xl border border-[#29243a] text-gray-400 text-xs">
                No active public tapes available for this creator currently.
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0e0c15] border-t border-[#29243a] flex items-center justify-between text-xs text-gray-400">
          <span>Latin Starlet ID: #{model.id} · Verified 2257 Record</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#181523] hover:bg-[#211c30] text-gray-200 hover:text-white transition-colors"
          >
            Close Biography
          </button>
        </div>

      </div>
    </div>
  );
};
