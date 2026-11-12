import React from 'react';
import { SlidersHorizontal, ArrowUpDown, Film, X } from 'lucide-react';
import { Video } from '../data/videos';
import { VideoCard } from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
  onSelectModel: (modelId: string) => void;
  savedVideoIds: string[];
  onToggleSaveVideo: (videoId: string, e: React.MouseEvent) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  sortBy: 'trending' | 'recent' | 'rating' | 'views' | 'duration';
  onSelectSortBy: (sort: 'trending' | 'recent' | 'rating' | 'views' | 'duration') => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  onSelectVideo,
  onSelectModel,
  savedVideoIds,
  onToggleSaveVideo,
  selectedCategory,
  onSelectCategory,
  selectedCity,
  onSelectCity,
  sortBy,
  onSelectSortBy,
  searchQuery,
  onClearSearch
}) => {
  const categories = [
    'All Categories',
    'Penthouse Sessions',
    'Beach & Ocean',
    'Balcony & Skyline',
    'Private Lounge',
    'Poolside Retreats',
  ];

  const sortOptions = [
    { value: 'trending', label: 'Trending Releases' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'duration', label: 'Longest Duration' },
  ];

  return (
    <section className="w-full">
      {/* Grid Controls Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#29243a]/80 mb-6">
        
        {/* Left Side: Headline & Count */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-[#ff3358]" />
            <h2 className="text-xl sm:text-2xl font-bold font-['Syne'] text-white tracking-wide">
              {searchQuery ? `Search: "${searchQuery}"` : selectedCity ? `${selectedCity} Exclusive Tapes` : 'Trending Releases'}
            </h2>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="font-mono tabular-nums text-gray-300 font-semibold">{videos.length} videos</span>
            <span className="text-gray-500">(5 Per Row Grid)</span>
          </div>
        </div>

        {/* Right Side: Category & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Active Search Clear */}
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="px-2.5 py-1.5 text-xs bg-[#ff3358]/15 hover:bg-[#ff3358]/25 text-[#ff3358] border border-[#ff3358]/30 rounded-lg flex items-center gap-1 transition-colors"
            >
              Clear Search <X className="w-3 h-3" />
            </button>
          )}

          {/* Active City Filter Tag */}
          {selectedCity && (
            <button
              onClick={() => onSelectCity('')}
              className="px-2.5 py-1.5 text-xs bg-[#ffaa33]/15 hover:bg-[#ffaa33]/25 text-[#ffaa33] border border-[#ffaa33]/30 rounded-lg flex items-center gap-1 transition-colors"
            >
              City: {selectedCity} <X className="w-3 h-3" />
            </button>
          )}

          {/* Category Dropdown */}
          <div className="relative flex items-center">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 absolute left-3 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value)}
              aria-label="Filter by category"
              className="bg-[#181523] border border-[#29243a] text-xs text-gray-200 rounded-lg pl-8 pr-7 py-2 focus:outline-none focus:border-[#ff3358] appearance-none cursor-pointer hover:bg-[#211c30] transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat === 'All Categories' ? '' : cat} className="bg-[#181523]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="relative flex items-center">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute left-3 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value as any)}
              aria-label="Sort videos by"
              className="bg-[#181523] border border-[#29243a] text-xs text-gray-200 rounded-lg pl-8 pr-7 py-2 focus:outline-none focus:border-[#ff3358] appearance-none cursor-pointer hover:bg-[#211c30] transition-colors"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#181523]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* 5 VIDEOS PER ROW RESPONSIVE GRID (lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5) */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 sm:gap-5">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onSelectVideo={onSelectVideo}
              onSelectModel={onSelectModel}
              isSaved={savedVideoIds.includes(video.id)}
              onToggleSave={onToggleSaveVideo}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center justify-center bg-[#14121e] border border-[#262137] rounded-2xl p-8">
          <Film className="w-12 h-12 text-gray-600 mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No videos found</h3>
          <p className="text-xs text-gray-400 max-w-sm mb-4">
            Try adjusting your search keywords, clearing active category filters, or selecting another Latin hotspot.
          </p>
          <div className="flex gap-2">
            {searchQuery && (
              <button
                onClick={onClearSearch}
                className="px-4 py-2 bg-[#ff3358] hover:bg-[#ff244c] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Clear Search
              </button>
            )}
            {selectedCity && (
              <button
                onClick={() => onSelectCity('')}
                className="px-4 py-2 bg-[#181523] border border-[#29243a] text-white text-xs font-semibold rounded-lg transition-colors hover:border-[#ff3358]"
              >
                Show All Cities
              </button>
            )}
            {selectedCategory && (
              <button
                onClick={() => onSelectCategory('')}
                className="px-4 py-2 bg-[#181523] border border-[#29243a] text-white text-xs font-semibold rounded-lg transition-colors hover:border-[#ff3358]"
              >
                Reset Categories
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
