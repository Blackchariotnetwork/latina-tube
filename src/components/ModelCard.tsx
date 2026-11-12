import React from 'react';
import { BadgeCheck, Film, Eye, Users, ChevronRight } from 'lucide-react';
import { Model } from '../data/models';

interface ModelCardProps {
  model: Model;
  onSelectModel: (modelId: string) => void;
  isFollowed?: boolean;
  onToggleFollow?: (modelId: string, e: React.MouseEvent) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  model,
  onSelectModel,
  isFollowed = false,
  onToggleFollow
}) => {
  return (
    <article
      onClick={() => onSelectModel(model.id)}
      className="group relative flex flex-col bg-[#14121e] hover:bg-[#1b1728] border border-[#262137] hover:border-[#ff3358]/70 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform-gpu hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-[#ff3358]/15"
    >
      {/* 3:4 Aspect Portrait Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0d0b13]">
        <img
          src={model.avatar}
          alt={model.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out brightness-95 group-hover:brightness-105"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />

        {/* Fallback styling */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#09080e] via-[#1a1629] to-[#28213f] flex items-center justify-center p-4">
          <span className="font-['Syne'] font-bold text-white text-lg">{model.name}</span>
        </div>

        {/* Scrim Overlay for crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09080e] via-[#09080e]/40 to-transparent" />

        {/* Top Badges: Origin Flag & Verified */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-black/75 backdrop-blur-md text-gray-200 border border-white/10 flex items-center gap-1.5">
            <span>{model.flag}</span>
            <span>{model.city}</span>
          </span>

          {onToggleFollow && (
            <button
              onClick={(e) => onToggleFollow(model.id, e)}
              className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                isFollowed
                  ? 'bg-[#ff3358] text-white'
                  : 'bg-black/60 hover:bg-black text-gray-300 hover:text-white'
              }`}
              title={isFollowed ? 'Following' : 'Follow Starlet'}
            >
              <Users className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Bottom Text Over Scrim */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="text-lg font-bold font-['Syne'] text-white group-hover:text-[#ff3358] transition-colors truncate">
              {model.name}
            </h3>
            <BadgeCheck className="w-5 h-5 text-[#ff3358] fill-[#ff3358]/20 shrink-0" />
          </div>

          <p className="text-xs font-medium text-[#ffaa33] mb-2 truncate">
            {model.origin} · {model.age} Yrs
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex items-center justify-between text-[11px] text-gray-300 pt-2 border-t border-white/10 font-mono tabular-nums">
            <span className="flex items-center gap-1">
              <Film className="w-3.5 h-3.5 text-[#ff3358]" />
              {model.scenesCount} Exclusive Tapes
            </span>
            <span className="flex items-center gap-1 text-gray-300">
              <Eye className="w-3.5 h-3.5 text-gray-400" />
              {model.views}
            </span>
          </div>
        </div>
      </div>

      {/* Bio snippet & CTA footer */}
      <div className="p-3.5 flex flex-col justify-between gap-3 flex-1 bg-[#14121e]">
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {model.bio}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-[#262137] text-xs font-semibold text-[#ff3358] group-hover:text-[#ffaa33] transition-colors">
          <span>View Biography & Tapes</span>
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  );
};
