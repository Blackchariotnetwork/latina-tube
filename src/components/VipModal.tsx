import React, { useState } from 'react';
import { X, Sparkles, Check, Shield, Download, Film, Zap } from 'lucide-react';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipModal: React.FC<VipModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | 'lifetime'>('annual');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleJoin = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  const perks = [
    'True Uncompressed 4K UHD 60FPS Bitrates',
    'Direct Offline Master File Downloads (.MP4 / ProRes)',
    'Exclusive Medellín & Rio Balcony Penthouse Vaults',
    'Multi-Angle Camera Feeds on Select VIP Productions',
    'Zero Advertisements & Lightning High-Speed CDN',
    'Direct Messaging & Scene Requests to Verified Creators'
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#121019] border border-[#29243a] rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close VIP modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-[#ff3358] border border-white/10 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-['Syne'] text-white">VIP 4K Access Activated</h3>
            <p className="text-sm text-gray-300 max-w-sm mx-auto">
              Your session has been upgraded to VIP Ultra HD. Enjoy unrestricted 60FPS streaming and direct archive downloads.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff3358]/15 border border-[#ff3358]/30 text-[#ff3358] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Latina Streaming Vault</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Syne'] text-white mb-2">
                Join <span className="bg-gradient-to-r from-[#ff3358] via-[#ff5e36] to-[#ffaa33] bg-clip-text text-transparent">VIP 4K ULTRA</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
                Unlock 14,000+ uncompressed Latin master tapes in pristine 4K 60FPS with zero buffering.
              </p>
            </div>

            {/* Plan Selector */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  selectedPlan === 'monthly'
                    ? 'bg-[#181523] border-[#ff3358] ring-1 ring-[#ff3358]'
                    : 'bg-[#181523]/60 border-[#29243a] text-gray-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold text-gray-300">Monthly Pass</div>
                <div className="text-lg font-bold text-white font-mono my-1">$14.99</div>
                <div className="text-[10px] text-gray-400">Cancel anytime</div>
              </button>

              <button
                onClick={() => setSelectedPlan('annual')}
                className={`relative p-3.5 rounded-xl border text-center transition-all ${
                  selectedPlan === 'annual'
                    ? 'bg-[#181523] border-[#ff3358] ring-1 ring-[#ff3358]'
                    : 'bg-[#181523]/60 border-[#29243a] text-gray-400 hover:text-white'
                }`}
              >
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#ffaa33] text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                  Best Value
                </span>
                <div className="text-xs font-semibold text-white">Annual VIP</div>
                <div className="text-lg font-bold text-[#ffaa33] font-mono my-1">$7.99<span className="text-xs text-gray-400">/mo</span></div>
                <div className="text-[10px] text-green-400 font-semibold">Save 48%</div>
              </button>

              <button
                onClick={() => setSelectedPlan('lifetime')}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  selectedPlan === 'lifetime'
                    ? 'bg-[#181523] border-[#ff3358] ring-1 ring-[#ff3358]'
                    : 'bg-[#181523]/60 border-[#29243a] text-gray-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold text-gray-300">Lifetime Pass</div>
                <div className="text-lg font-bold text-white font-mono my-1">$149</div>
                <div className="text-[10px] text-gray-400">Single payment</div>
              </button>
            </div>

            {/* Perks List */}
            <div className="bg-[#181523] border border-[#29243a] rounded-xl p-4 mb-6 space-y-2.5">
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2.5 text-xs text-gray-200">
                  <div className="w-4 h-4 rounded-full bg-[#ff3358]/20 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#ff3358]" />
                  </div>
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleJoin}
              className="w-full py-3 bg-gradient-to-r from-[#ff3358] via-[#ff5e36] to-[#ffaa33] text-black font-extrabold text-sm rounded-xl shadow-lg shadow-[#ff3358]/25 hover:opacity-95 transition-opacity"
            >
              Start Instant VIP Access
            </button>

            <p className="text-[11px] text-center text-gray-500 mt-3">
              Discrete billing. 256-bit SSL encrypted. 18+ RTA Compliant.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
