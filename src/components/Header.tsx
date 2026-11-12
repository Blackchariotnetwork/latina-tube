import React, { useState } from 'react';
import { Search, Bookmark, Sparkles, X } from 'lucide-react';
import { GoldenPistolLogo } from './GoldenPistolLogo';

interface HeaderProps {
  currentTab: 'videos' | 'models' | 'categories';
  onSelectTab: (tab: 'videos' | 'models' | 'categories') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenVip: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  favoritesCount,
  onOpenFavorites,
  onOpenVip
}) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#09080e]/95 backdrop-blur-md border-b border-[#29243a]">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-[1850px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Wordmark with Golden Pistol 'L' Logo */}
        <a 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('videos');
          }}
          className="text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group flex items-center gap-2.5"
          title="latinasextapes.fun — Home"
        >
          <GoldenPistolLogo size={34} withGlow={true} />
          <span className="font-['Syne'] tracking-wide">
            latina<span className="text-[#ff3358]">sextapes</span><span className="text-[#ffaa33] text-sm">.fun</span>
          </span>
        </a>

        {/* Zone 2: 4 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => onSelectTab('videos')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentTab === 'videos'
                ? 'text-[#ff3358] border-[#ff3358] font-semibold'
                : 'text-gray-300 hover:text-white border-transparent'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => onSelectTab('models')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentTab === 'models'
                ? 'text-[#ff3358] border-[#ff3358] font-semibold'
                : 'text-gray-300 hover:text-white border-transparent'
            }`}
          >
            Models Directory
          </button>
          <button
            onClick={() => onSelectTab('categories')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentTab === 'categories'
                ? 'text-[#ff3358] border-[#ff3358] font-semibold'
                : 'text-gray-300 hover:text-white border-transparent'
            }`}
          >
            Categories
          </button>
          <button
            onClick={onOpenVip}
            className="text-gray-300 hover:text-[#ffaa33] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ffaa33]" />
            VIP 4K Passes
          </button>
        </nav>

        {/* Zone 3: Search Bar & Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Desktop Search */}
          <div className="hidden lg:flex items-center relative w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Colombian, Brazilian, Cuban..."
              className="w-full bg-[#181523] border border-[#29243a] rounded-full py-2 pl-9 pr-8 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#ff3358] transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile search trigger */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#181523]"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Watch Later / Favorites trigger */}
          <button
            onClick={onOpenFavorites}
            className="relative px-3 py-2 text-xs font-semibold text-gray-200 hover:text-white bg-[#181523] hover:bg-[#211c30] border border-[#29243a] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            title="Saved Videos & Models"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#ff3358]" />
            <span className="hidden sm:inline">Saved</span>
            {favoritesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#ff3358] text-[10px] text-white flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenVip}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#ff3358] to-[#ff5e36] hover:from-[#ff244c] hover:to-[#ff4c21] rounded-lg shadow-md shadow-[#ff3358]/20 transition-all whitespace-nowrap shrink-0"
          >
            Join VIP 4K
          </button>
        </div>

      </div>

      {/* Mobile Search Bar Dropdown */}
      {mobileSearchOpen && (
        <div className="lg:hidden px-4 py-3 bg-[#121019] border-t border-[#29243a] flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tapes, creators, Medellín, Rio..."
              className="w-full bg-[#181523] border border-[#29243a] rounded-lg py-2 pl-9 pr-8 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#ff3358]"
              autoFocus
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button 
            onClick={() => setMobileSearchOpen(false)}
            className="text-xs text-gray-400 hover:text-white px-2 py-1"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden flex items-center justify-around py-2 bg-[#121019] border-t border-[#29243a] text-xs">
        <button
          onClick={() => onSelectTab('videos')}
          className={`py-1.5 px-3 rounded-md transition-colors ${
            currentTab === 'videos' ? 'text-[#ff3358] font-bold' : 'text-gray-400'
          }`}
        >
          Videos
        </button>
        <button
          onClick={() => onSelectTab('models')}
          className={`py-1.5 px-3 rounded-md transition-colors ${
            currentTab === 'models' ? 'text-[#ff3358] font-bold' : 'text-gray-400'
          }`}
        >
          Models
        </button>
        <button
          onClick={() => onSelectTab('categories')}
          className={`py-1.5 px-3 rounded-md transition-colors ${
            currentTab === 'categories' ? 'text-[#ff3358] font-bold' : 'text-gray-400'
          }`}
        >
          Categories
        </button>
      </div>
    </header>
  );
};
