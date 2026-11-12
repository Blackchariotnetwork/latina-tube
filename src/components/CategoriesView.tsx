import React from 'react';
import { Film, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { Video } from '../data/videos';

interface CategoriesViewProps {
  onSelectCategory: (category: string) => void;
  onSelectCity: (city: string) => void;
  videos: Video[];
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  onSelectCategory,
  onSelectCity,
  videos
}) => {
  const categoryList = [
    {
      name: 'Penthouse Sessions',
      desc: 'Skyline glass suites, infinity pools, and high-rise panoramic escapes in Medellín, Rio, and Miami.',
      image: '/src/assets/images/latina_hero_banner_1794487123475.jpg',
      tag: 'Penthouse'
    },
    {
      name: 'Beach & Ocean',
      desc: 'Copacabana sand, Ipanema sunsets, and Biscayne Bay mega-yacht stateroom sessions.',
      image: '/src/assets/images/latina_scene_thumb_1794487125829.jpg',
      tag: 'Beachfront'
    },
    {
      name: 'Balcony & Skyline',
      desc: 'Open-air dusk breezes, champagne toasts, and glowing Andean valley cityscapes.',
      image: '/src/assets/images/latina_hero_banner_1794487123475.jpg',
      tag: 'Skyline'
    },
    {
      name: 'Private Lounge',
      desc: 'Antique Havana velvet parlors, vintage cocktail lounges, and sultry midnight sessions.',
      image: '/src/assets/images/latina_model_sofia_1794487124819.jpg',
      tag: 'Lounge'
    },
    {
      name: 'Poolside Retreats',
      desc: 'Tropical gardens, heated villa lagoons, and moonlit cenote waters in Cali and Cancún.',
      image: '/src/assets/images/latina_model_valentina_1794487125326.jpg',
      tag: 'Villa Pool'
    }
  ];

  const cityList = [
    { name: 'Medellín', flag: '🇨🇴', country: 'Colombia', tapes: videos.filter(v => v.city === 'Medellín').length },
    { name: 'Rio de Janeiro', flag: '🇧🇷', country: 'Brazil', tapes: videos.filter(v => v.city === 'Rio de Janeiro').length },
    { name: 'Miami', flag: '🇵🇷', country: 'United States / PR', tapes: videos.filter(v => v.city === 'Miami').length },
    { name: 'Havana', flag: '🇨🇺', country: 'Cuba', tapes: videos.filter(v => v.city === 'Havana').length },
    { name: 'Cali', flag: '🇨🇴', country: 'Colombia', tapes: videos.filter(v => v.city === 'Cali').length },
    { name: 'Cancún', flag: '🇲🇽', country: 'Mexico', tapes: videos.filter(v => v.city === 'Cancún').length },
  ];

  return (
    <div className="space-y-12">
      {/* Category Themed Bento */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#ff3358]" />
          <h2 className="text-2xl font-bold font-['Syne'] text-white">
            Curated Scene Categories
          </h2>
        </div>
        <p className="text-xs text-gray-400 mb-6">
          Explore productions organized by environment, atmosphere, and cinematography style.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryList.map((cat) => {
            const count = videos.filter(v => v.category === cat.name).length;
            return (
              <div
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer border border-[#29243a] hover:border-[#ff3358] transition-all duration-300 transform-gpu hover:-translate-y-1 bg-[#14121e]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09080e] via-[#09080e]/60 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold font-['Syne'] text-white group-hover:text-[#ff3358] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-mono font-bold text-[#ffaa33]">
                      {count} Tapes
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 line-clamp-2 mb-2 leading-relaxed">
                    {cat.desc}
                  </p>
                  <div className="flex items-center text-xs font-semibold text-[#ff3358] group-hover:text-white transition-colors">
                    <span>Browse Collection</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hotspots & Origins */}
      <div className="pt-8 border-t border-[#29243a]">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-[#ffaa33]" />
          <h2 className="text-2xl font-bold font-['Syne'] text-white">
            Latin Production Hubs
          </h2>
        </div>
        <p className="text-xs text-gray-400 mb-6">
          Filter releases by origin city and creator jurisdiction.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {cityList.map((city) => (
            <div
              key={city.name}
              onClick={() => onSelectCity(city.name)}
              className="bg-[#14121e] hover:bg-[#1c182a] border border-[#262137] hover:border-[#ff3358] rounded-xl p-4 cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-2xl mb-2">
                <span>{city.flag}</span>
                <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-[#ff3358]">
                  {city.tapes} tapes
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#ff3358] transition-colors">
                  {city.name}
                </h4>
                <p className="text-[11px] text-gray-400">{city.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
