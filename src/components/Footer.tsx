import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { GoldenPistolLogo } from './GoldenPistolLogo';

interface FooterProps {
  onSelectTab: (tab: 'videos' | 'models' | 'categories') => void;
  onOpenVip: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenVip }) => {
  return (
    <footer className="mt-20 border-t border-[#29243a] bg-[#0c0a12] text-xs text-gray-400">
      <div className="max-w-[1850px] mx-auto px-4 sm:px-6 py-12 space-y-8">
        
        {/* Top Row: Brand & Compliance Badges */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#29243a]/70">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <GoldenPistolLogo size={28} withGlow={false} />
              <span className="font-['Syne'] font-extrabold text-lg text-white tracking-wide">
                latina<span className="text-[#ff3358]">sextapes</span><span className="text-[#ffaa33] text-sm">.fun</span>
              </span>
              <span className="text-[11px] font-semibold text-gray-500 uppercase">· Ultra HD VIP Network</span>
            </div>
            <p className="text-gray-400 max-w-lg text-xs leading-relaxed">
              Curated streaming destination for Latin cinematography, uncompressed 4K master tapes, and verified creators across Colombia, Brazil, Cuba, Puerto Rico, and Mexico.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-[#181523] border border-[#29243a] flex items-center gap-2 text-gray-300 font-mono text-[11px]">
              <ShieldAlert className="w-4 h-4 text-[#ff3358]" />
              <span>18+ RTA Restricted To Adults</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#181523] border border-[#29243a] flex items-center gap-2 text-gray-300 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>18 U.S.C. § 2257 Compliant</span>
            </div>
          </div>
        </div>

        {/* Links Navigation Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">Network</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('videos')} className="hover:text-white transition-colors">
                  Trending Releases (5 Per Row)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('models')} className="hover:text-white transition-colors">
                  Verified Models Directory
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('categories')} className="hover:text-white transition-colors">
                  City & Theme Collections
                </button>
              </li>
              <li>
                <button onClick={onOpenVip} className="hover:text-[#ffaa33] transition-colors">
                  VIP 4K Uncompressed Passes
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">Hotspot Hubs</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-white cursor-pointer">🇨🇴 Medellín Penthouses</li>
              <li className="text-gray-400 hover:text-white cursor-pointer">🇧🇷 Rio Copacabana Suites</li>
              <li className="text-gray-400 hover:text-white cursor-pointer">🇵🇷 Miami & San Juan Cabanas</li>
              <li className="text-gray-400 hover:text-white cursor-pointer">🇨🇺 Havana Vintage Lounges</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">Legal & Safety</h4>
            <ul className="space-y-2">
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#dmca" className="hover:text-white transition-colors">DMCA Takedown Notice</a></li>
              <li><a href="#2257" className="hover:text-white transition-colors">Record-Keeping Custodian</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">Creators & Press</h4>
            <ul className="space-y-2">
              <li><a href="#portal" className="hover:text-white transition-colors">Model Verification Portal</a></li>
              <li><a href="#studios" className="hover:text-white transition-colors">Production Partner API</a></li>
              <li><a href="#support" className="hover:text-white transition-colors">24/7 Creator Support</a></li>
              <li><a href="#press" className="hover:text-white transition-colors">Press & Media Inquiries</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-6 border-t border-[#29243a]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© 2026 latinasextapes.fun — All rights reserved. Strictly 18+ content.</p>
          <p>
            All records required by 18 U.S.C. 2257 and 28 C.F.R. 75 are maintained by the records custodian on file.
          </p>
        </div>

      </div>
    </footer>
  );
};
