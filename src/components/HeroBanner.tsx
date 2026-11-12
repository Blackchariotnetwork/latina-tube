import React from 'react';
import { Play, Sparkles, MapPin, Film, ShieldCheck } from 'lucide-react';

interface HeroBannerProps {
  onSelectCityFilter: (city: string) => void;
  selectedCity: string;
  onOpenVip: () => void;
  onScrollToVideos: () => void;
  totalScenesCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCityFilter,
  selectedCity,
  onOpenVip,
  onScrollToVideos,
  totalScenesCount
}) => {
  const popularHubs = [
    { city: 'Medellín', flag: '🇨🇴', label: 'Medellín' },
    { city: 'Rio de Janeiro', flag: '🇧🇷', label: 'Rio de Janeiro' },
    { city: 'Miami', flag: '🇵🇷', label: 'Miami' },
    { city: 'Havana', flag: '🇨🇺', label: 'Havana' },
    { city: 'Cali', flag: '🇨🇴', label: 'Cali' },
    { city: 'Cancún', flag: '🇲🇽', label: 'Cancún' },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#29243a] bg-[#121019]">
      {/* Background with Ambient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/latina_hero_banner_1794487123475.jpg"
          alt="Medellín luxury penthouse sunset"
          className="w-full h-full object-cover object-center opacity-30 sm:opacity-40 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09080e] via-[#09080e]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09080e] via-transparent to-[#09080e]/60" />
      </div>

      <div className="relative z-10 max-w-[1850px] mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        
        {/* Left Column: Typographic Hierarchy */}
        <div className="max-w-2xl">
          {/* Subtle text kicker without pill enclosure */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#ffaa33] mb-3">
            <ShieldCheck className="w-4 h-4 text-[#ff3358]" />
            <span>Verified Latina Starlets</span>
            <span aria-hidden="true" className="text-gray-500">·</span>
            <span>Ultra HD 4K 60FPS Masters</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Syne'] text-white leading-tight mb-4 text-balance">
            Pure Exotics. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#ff3358] via-[#ff5e36] to-[#ffaa33] bg-clip-text text-transparent">
              True 4K 60FPS.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl mb-6">
            The high-end digital network for exclusive South American, Caribbean, and Latin creators. Uncompressed panoramic rooftop suites, tropical private villas, and verified starlet archives.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onScrollToVideos}
              className="px-5 py-2.5 bg-white text-black hover:bg-gray-100 font-bold text-xs sm:text-sm rounded-lg transition-all flex items-center gap-2 shadow-lg"
            >
              <Play className="w-4 h-4 fill-current text-[#ff3358]" />
              Browse 5-Row Grid
            </button>

            <button
              onClick={onOpenVip}
              className="px-5 py-2.5 bg-[#181523]/90 hover:bg-[#211c30] text-white border border-[#29243a] hover:border-[#ff3358] font-semibold text-xs sm:text-sm rounded-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#ffaa33]" />
              VIP Access Passes
            </button>
          </div>
        </div>

        {/* Right Column: Fast Destination Filters */}
        <div className="w-full lg:w-auto flex flex-col items-start lg:items-end gap-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#ff3358]" />
            <span>Filter By Hotspot ({totalScenesCount} Scenes Online)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full lg:w-80">
            {popularHubs.map((hub) => {
              const isActive = selectedCity === hub.city;
              return (
                <button
                  key={hub.city}
                  onClick={() => onSelectCityFilter(hub.city)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-left flex items-center justify-between ${
                    isActive
                      ? 'bg-[#ff3358] border-[#ff3358] text-white shadow-md'
                      : 'bg-[#181523]/80 hover:bg-[#211c30] border-[#29243a] text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="truncate">{hub.label}</span>
                  <span className="text-sm shrink-0 ml-1.5">{hub.flag}</span>
                </button>
              );
            })}
          </div>

          {selectedCity && (
            <button
              onClick={() => onSelectCityFilter('')}
              className="text-xs text-[#ffaa33] hover:underline pt-1"
            >
              Reset Hotspot Filter
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
