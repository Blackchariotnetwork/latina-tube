import React, { useState, useEffect, useRef } from 'react';
import {
  X, Play, Pause, Volume2, VolumeX, Maximize, Settings, ThumbsUp,
  Bookmark, Share2, Sparkles, Download, MessageSquare, Check, User, Heart, ChevronRight
} from 'lucide-react';
import { Video } from '../data/videos';
import { Model } from '../data/models';
import { VideoCard } from './VideoCard';

interface VideoPlayerModalProps {
  video: Video | null;
  model: Model | null;
  onClose: () => void;
  onSelectModel: (modelId: string) => void;
  onSelectVideo: (video: Video) => void;
  relatedVideos: Video[];
  isSaved: boolean;
  onToggleSave: (videoId: string, e: React.MouseEvent) => void;
  onOpenVip: () => void;
  savedVideoIds: string[];
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  model,
  onClose,
  onSelectModel,
  onSelectVideo,
  relatedVideos,
  isSaved,
  onToggleSave,
  onOpenVip,
  savedVideoIds
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(128); // start ~2 mins in
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState('4K 60FPS');
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(video?.likes || 0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<{ id: string; user: string; text: string; time: string; likes: number }[]>([
    { id: 'c1', user: 'Carlos_VIP', text: 'The 4K HDR quality on this El Poblado terrace shoot is unmatched. Valentina is breathtaking!', time: '2 hours ago', likes: 42 },
    { id: 'c2', user: 'MiamiNights99', text: 'Hands down best Latina streaming platform right now, the bitrate is pristine.', time: '5 hours ago', likes: 19 },
    { id: 'c3', user: 'RioSambaLover', text: 'The natural lighting during golden hour brings out every detail. Amazing production!', time: '1 day ago', likes: 31 }
  ]);

  const playerRef = useRef<HTMLDivElement>(null);

  // Sync likes count on video switch
  useEffect(() => {
    if (video) {
      setLikesCount(video.likes);
      setLiked(false);
      setCurrentTime(75);
      setIsPlaying(true);
    }
  }, [video]);

  // Video progress simulation ticker
  useEffect(() => {
    let interval: any;
    if (isPlaying && video) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= video.durationSeconds) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, video]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    if (video) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [video, onClose]);

  if (!video) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / video.durationSeconds) * 100;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setCurrentTime(Math.floor(pos * video.durationSeconds));
  };

  const handleToggleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    } else {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: Date.now().toString(),
        user: 'Guest_Viewer',
        text: newComment.trim(),
        time: 'Just now',
        likes: 1
      },
      ...comments
    ]);
    setNewComment('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-[#121019] border border-[#29243a] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close player"
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/75 hover:bg-[#ff3358] border border-white/10 text-white flex items-center justify-center transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Display Container */}
        <div ref={playerRef} className="relative aspect-video w-full bg-black overflow-hidden group select-none">
          {/* Main Visual Frame */}
          <img
            src={video.thumb}
            alt={video.title}
            className="w-full h-full object-cover object-center filter brightness-90"
            referrerPolicy="no-referrer"
          />

          {/* Cinematic Play/Pause Center Indicator on Click */}
          <div
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 cursor-pointer flex items-center justify-center"
          >
            {!isPlaying && (
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#ff3358] to-[#ff5e36] text-white flex items-center justify-center shadow-2xl shadow-[#ff3358]/50 animate-in zoom-in-75">
                <Play className="w-9 h-9 fill-current ml-1" />
              </div>
            )}
          </div>

          {/* Quality Watermark */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-black/80 backdrop-blur-md text-[#ff3358] border border-[#ff3358]/30">
              {quality}
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-black/80 backdrop-blur-md text-white">
              {video.city} {video.flag}
            </span>
          </div>

          {/* Bottom Player Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 flex flex-col gap-2 opacity-95 group-hover:opacity-100 transition-opacity">
            
            {/* Interactive Progress Scrub Bar */}
            <div
              onClick={handleSeek}
              className="relative w-full h-2 hover:h-3 bg-white/20 rounded-full cursor-pointer transition-all flex items-center"
            >
              <div
                className="h-full bg-gradient-to-r from-[#ff3358] to-[#ffaa33] rounded-full relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md border-2 border-[#ff3358]" />
              </div>
            </div>

            {/* Controls Button Row */}
            <div className="flex items-center justify-between text-xs text-white pt-1">
              {/* Left: Play/Pause, Volume, Timer */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 hover:text-[#ff3358] transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 hover:text-[#ff3358] transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <span className="font-mono text-gray-300 text-xs tabular-nums">
                  {formatTime(currentTime)} / {video.duration}
                </span>
              </div>

              {/* Right: Quality, Speed, Fullscreen */}
              <div className="flex items-center gap-3">
                {/* Speed selector */}
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(e.target.value)}
                  className="bg-black/60 border border-white/20 rounded px-2 py-0.5 text-xs text-gray-200 focus:outline-none"
                >
                  <option value="0.75x">0.75x</option>
                  <option value="1.0x">1.0x</option>
                  <option value="1.25x">1.25x</option>
                  <option value="1.5x">1.5x</option>
                  <option value="2.0x">2.0x</option>
                </select>

                {/* Quality selector */}
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="bg-black/60 border border-white/20 rounded px-2 py-0.5 text-xs text-[#ff3358] font-semibold focus:outline-none"
                >
                  <option value="4K 60FPS">4K 60FPS</option>
                  <option value="4K HDR">4K HDR</option>
                  <option value="1440p">1440p</option>
                  <option value="1080p">1080p HD</option>
                  <option value="720p">720p</option>
                </select>

                <button
                  onClick={() => {
                    if (playerRef.current?.requestFullscreen) {
                      playerRef.current.requestFullscreen();
                    }
                  }}
                  className="p-1 hover:text-[#ff3358] transition-colors"
                  title="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Video Details & Interaction Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto">
          
          {/* Headline & Actions Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#29243a]">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-['Syne'] text-white mb-2 leading-snug">
                {video.title}
              </h2>
              
              {/* Unboxed Metadata Line */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 font-mono tabular-nums">
                <span className="text-white font-semibold">{video.views} Views</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#ffaa33] font-semibold">{video.rating} Rating</span>
                <span aria-hidden="true">·</span>
                <span>{video.city}, {video.flag}</span>
                <span aria-hidden="true">·</span>
                <span>Published {video.releaseDate}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#ff3358] font-bold">{video.quality}</span>
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {/* Like Button */}
              <button
                onClick={handleToggleLike}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  liked
                    ? 'bg-[#ff3358] text-white shadow-md'
                    : 'bg-[#181523] text-gray-200 hover:text-white border border-[#29243a] hover:border-[#ff3358]'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                <span>{likesCount.toLocaleString()}</span>
              </button>

              {/* Save / Watch Later Button */}
              <button
                onClick={(e) => onToggleSave(video.id, e)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isSaved
                    ? 'bg-[#29243a] text-[#ff3358] border border-[#3f385c]'
                    : 'bg-[#181523] text-gray-200 hover:text-white border border-[#29243a] hover:border-[#ff3358]'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-[#ff3358]' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Watch Later'}</span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#181523] text-gray-200 hover:text-white border border-[#29243a] hover:border-[#ff3358] flex items-center gap-1.5 transition-all"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>

              {/* Download Master Tape (VIP Action) */}
              <button
                onClick={onOpenVip}
                className="px-3.5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-[#ff3358] to-[#ffaa33] text-black hover:opacity-95 flex items-center gap-1.5 shadow-md transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download 4K</span>
              </button>
            </div>
          </div>

          {/* Model Card Strip & Video Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Description & Tags (2 cols) */}
            <div className="md:col-span-2 space-y-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                {video.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-md bg-[#181523] border border-[#29243a] text-gray-300 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Starlet Card Spotlight (1 col) */}
            {model && (
              <div
                onClick={() => {
                  onClose();
                  onSelectModel(model.id);
                }}
                className="bg-[#181523] hover:bg-[#211c30] border border-[#29243a] hover:border-[#ff3358] rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={model.avatar}
                    alt={model.name}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-[#ff3358] shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold font-['Syne'] text-white group-hover:text-[#ff3358] transition-colors">
                      {model.name}
                    </h4>
                    <p className="text-xs text-[#ffaa33] font-medium">{model.origin} {model.flag}</p>
                    <span className="text-[11px] text-gray-400 font-mono">{model.scenesCount} Exclusive Tapes</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[#ff3358] pt-2 border-t border-[#29243a]">
                  <span>View Full Biography & Tapes</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )}

          </div>

          {/* Section: Related Videos */}
          <div className="pt-4 border-t border-[#29243a]">
            <h3 className="text-base font-bold font-['Syne'] text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ffaa33]" />
              More Exclusive Latina Tapes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedVideos.slice(0, 4).map((rel) => (
                <VideoCard
                  key={rel.id}
                  video={rel}
                  onSelectVideo={(v) => {
                    onSelectVideo(v);
                  }}
                  onSelectModel={onSelectModel}
                  isSaved={savedVideoIds.includes(rel.id)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          </div>

          {/* Section: Interactive Comments */}
          <div className="pt-4 border-t border-[#29243a]">
            <h3 className="text-base font-bold font-['Syne'] text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#ff3358]" />
              Community Discussion ({comments.length})
            </h3>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Leave a comment on this scene..."
                className="flex-1 bg-[#181523] border border-[#29243a] rounded-lg px-4 py-2.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#ff3358]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#ff3358] hover:bg-[#ff244c] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Post
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="p-3 bg-[#181523]/70 rounded-xl border border-[#29243a]/70 text-xs">
                  <div className="flex items-center justify-between text-gray-400 mb-1">
                    <span className="font-semibold text-white">{comment.user}</span>
                    <span className="font-mono text-[11px]">{comment.time}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
