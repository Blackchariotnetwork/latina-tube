/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { VideoGrid } from './components/VideoGrid';
import { ModelCard } from './components/ModelCard';
import { ModelModal } from './components/ModelModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { VipModal } from './components/VipModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { CategoriesView } from './components/CategoriesView';
import { Footer } from './components/Footer';

import { VIDEOS_DATA, Video } from './data/videos';
import { MODELS_DATA, Model } from './data/models';
import { Users, Sparkles, Filter } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'videos' | 'models' | 'categories'>('videos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'rating' | 'views' | 'duration'>('trending');
  
  // Selected Modals
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [activeModelId, setActiveModelId] = useState<string | null>(null);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Local Storage State for Saved Videos & Followed Models
  const [savedVideoIds, setSavedVideoIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('lst_saved_videos');
      return stored ? JSON.parse(stored) : ['v1', 'v5'];
    } catch {
      return ['v1', 'v5'];
    }
  });

  const [followedModelIds, setFollowedModelIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('lst_followed_models');
      return stored ? JSON.parse(stored) : ['m1', 'm2'];
    } catch {
      return ['m1', 'm2'];
    }
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('lst_saved_videos', JSON.stringify(savedVideoIds));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [savedVideoIds]);

  useEffect(() => {
    try {
      localStorage.setItem('lst_followed_models', JSON.stringify(followedModelIds));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [followedModelIds]);

  // Toggle Video Save
  const handleToggleSaveVideo = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedVideoIds((prev) =>
      prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId]
    );
  };

  // Toggle Model Follow
  const handleToggleFollowModel = (modelId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFollowedModelIds((prev) =>
      prev.includes(modelId) ? prev.filter((id) => id !== modelId) : [...prev, modelId]
    );
  };

  // Filtered & Sorted Videos
  const filteredVideos = useMemo(() => {
    let result = [...VIDEOS_DATA];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.modelName.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // City filter
    if (selectedCity) {
      result = result.filter((v) => v.city === selectedCity);
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((v) => v.category === selectedCategory);
    }

    // Sorting
    switch (sortBy) {
      case 'views':
        result.sort((a, b) => b.viewsCount - a.viewsCount);
        break;
      case 'rating':
        result.sort((a, b) => b.ratingPercent - a.ratingPercent);
        break;
      case 'duration':
        result.sort((a, b) => b.durationSeconds - a.durationSeconds);
        break;
      case 'recent':
        // Keep order or sort by id
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'trending':
      default:
        // Featured first, then likes
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.likes - a.likes);
        break;
    }

    return result;
  }, [searchQuery, selectedCity, selectedCategory, sortBy]);

  // Active Model Object & Their Related Videos
  const activeModel = useMemo(() => {
    if (!activeModelId) return null;
    return MODELS_DATA.find((m) => m.id === activeModelId) || null;
  }, [activeModelId]);

  const activeModelRelatedVideos = useMemo(() => {
    if (!activeModelId) return [];
    return VIDEOS_DATA.filter((v) => v.modelId === activeModelId);
  }, [activeModelId]);

  // Model object for the currently playing video
  const activeVideoModel = useMemo(() => {
    if (!activeVideo) return null;
    return MODELS_DATA.find((m) => m.id === activeVideo.modelId) || null;
  }, [activeVideo]);

  // Related videos for the video player
  const playerRelatedVideos = useMemo(() => {
    if (!activeVideo) return [];
    return VIDEOS_DATA.filter(
      (v) => v.id !== activeVideo.id && (v.modelId === activeVideo.modelId || v.city === activeVideo.city)
    );
  }, [activeVideo]);

  // Saved videos list
  const savedVideosList = useMemo(() => {
    return VIDEOS_DATA.filter((v) => savedVideoIds.includes(v.id));
  }, [savedVideoIds]);

  // Followed models list
  const followedModelsList = useMemo(() => {
    return MODELS_DATA.filter((m) => followedModelIds.includes(m.id));
  }, [followedModelIds]);

  const handleScrollToVideos = () => {
    setCurrentTab('videos');
    const el = document.getElementById('video-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09080e] text-[#f1f5f9] flex flex-col font-sans selection:bg-[#ff3358] selection:text-white">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (currentTab !== 'videos') setCurrentTab('videos');
        }}
        favoritesCount={savedVideoIds.length + followedModelIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenVip={() => setIsVipModalOpen(true)}
      />

      {/* Hero Banner (Always displayed for high-end aesthetic) */}
      <HeroBanner
        onSelectCityFilter={(city) => {
          setSelectedCity(city);
          setCurrentTab('videos');
          const el = document.getElementById('video-catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        selectedCity={selectedCity}
        onOpenVip={() => setIsVipModalOpen(true)}
        onScrollToVideos={handleScrollToVideos}
        totalScenesCount={VIDEOS_DATA.length}
      />

      {/* Main Content Area */}
      <main id="video-catalog-section" className="max-w-[1850px] mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        
        {/* TAB 1: VIDEOS (5 VIDEOS PER ROW) */}
        {currentTab === 'videos' && (
          <VideoGrid
            videos={filteredVideos}
            onSelectVideo={(video) => setActiveVideo(video)}
            onSelectModel={(modelId) => setActiveModelId(modelId)}
            savedVideoIds={savedVideoIds}
            onToggleSaveVideo={handleToggleSaveVideo}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
            sortBy={sortBy}
            onSelectSortBy={setSortBy}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
          />
        )}

        {/* TAB 2: MODELS DIRECTORY */}
        {currentTab === 'models' && (
          <section className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#29243a] mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-[#ff3358]" />
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-['Syne'] text-white">
                    Verified Latina Starlets
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">
                  Browse verified models, discover their origins, and click any profile to read their full biography and stream their related tapes.
                </p>
              </div>

              <div className="text-xs font-mono text-gray-400 bg-[#181523] px-3.5 py-2 rounded-xl border border-[#29243a] shrink-0">
                <span className="text-white font-bold">{MODELS_DATA.length}</span> Registered Creators · <span className="text-[#ffaa33] font-bold">100% Verified</span>
              </div>
            </div>

            {/* Models Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {MODELS_DATA.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onSelectModel={(id) => setActiveModelId(id)}
                  isFollowed={followedModelIds.includes(model.id)}
                  onToggleFollow={handleToggleFollowModel}
                />
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: CATEGORIES & HUBS */}
        {currentTab === 'categories' && (
          <CategoriesView
            videos={VIDEOS_DATA}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setCurrentTab('videos');
              const el = document.getElementById('video-catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onSelectCity={(city) => {
              setSelectedCity(city);
              setCurrentTab('videos');
              const el = document.getElementById('video-catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Model Biography & Related Videos Modal */}
      <ModelModal
        model={activeModel}
        onClose={() => setActiveModelId(null)}
        relatedVideos={activeModelRelatedVideos}
        onSelectVideo={(video) => setActiveVideo(video)}
        isFollowed={activeModel ? followedModelIds.includes(activeModel.id) : false}
        onToggleFollow={handleToggleFollowModel}
        savedVideoIds={savedVideoIds}
        onToggleSaveVideo={handleToggleSaveVideo}
      />

      {/* Full Video Player Modal */}
      <VideoPlayerModal
        video={activeVideo}
        model={activeVideoModel}
        onClose={() => setActiveVideo(null)}
        onSelectModel={(modelId) => {
          setActiveVideo(null);
          setActiveModelId(modelId);
        }}
        onSelectVideo={(v) => setActiveVideo(v)}
        relatedVideos={playerRelatedVideos}
        isSaved={activeVideo ? savedVideoIds.includes(activeVideo.id) : false}
        onToggleSave={handleToggleSaveVideo}
        onOpenVip={() => setIsVipModalOpen(true)}
        savedVideoIds={savedVideoIds}
      />

      {/* VIP Passes Modal */}
      <VipModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
      />

      {/* Saved / Favorites Slide-over Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        savedVideos={savedVideosList}
        followedModels={followedModelsList}
        onSelectVideo={(v) => setActiveVideo(v)}
        onSelectModel={(id) => setActiveModelId(id)}
        onRemoveVideo={(id) => setSavedVideoIds((prev) => prev.filter((vId) => vId !== id))}
        onUnfollowModel={(id) => setFollowedModelIds((prev) => prev.filter((mId) => mId !== id))}
      />

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenVip={() => setIsVipModalOpen(true)}
      />
    </div>
  );
}
