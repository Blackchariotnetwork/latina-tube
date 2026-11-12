import React from 'react';

interface GoldenPistolLogoProps {
  className?: string;
  size?: number;
  withGlow?: boolean;
}

export const GoldenPistolLogo: React.FC<GoldenPistolLogoProps> = ({
  className = '',
  size = 38,
  withGlow = true
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Golden / Coral Glow on Hover */}
      {withGlow && (
        <div 
          className="absolute inset-0 rounded-lg bg-gradient-to-tr from-[#ffaa33]/30 via-[#ffd700]/20 to-[#ff3358]/20 blur-md -z-10 group-hover:scale-125 transition-transform duration-300"
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 -32 100 132"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-[0_2px_8px_rgba(255,170,51,0.45)] transform group-hover:scale-105 transition-transform duration-200"
      >
        <defs>
          {/* Polished Gold Linear Gradient */}
          <linearGradient id="pistolGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2a3" />
            <stop offset="25%" stopColor="#ffc83b" />
            <stop offset="50%" stopColor="#e59800" />
            <stop offset="75%" stopColor="#ffdc69" />
            <stop offset="100%" stopColor="#9a6100" />
          </linearGradient>

          {/* Dark Metallic Shadow Gradient */}
          <linearGradient id="pistolGoldShadow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#633c00" />
            <stop offset="50%" stopColor="#b37800" />
            <stop offset="100%" stopColor="#ffd857" />
          </linearGradient>

          {/* Specular Highlight Gradient */}
          <linearGradient id="pistolHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffd966" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>

          {/* Muzzle Ember Radial Glow */}
          <radialGradient id="muzzleHeat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff3358" stopOpacity="1" />
            <stop offset="45%" stopColor="#ffaa33" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#ffd700" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff5e36" stopOpacity="0" />
          </radialGradient>

          {/* Gun Smoke Gradient: ethereal warm silver-white fading upward */}
          <linearGradient id="smokeGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fff5ea" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#f1e6da" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#d1c7bc" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="smokeGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffe9d6" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#e2d8cd" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#bfb5a8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Smoke Blur Filter */}
          <filter id="smokeBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
          </filter>
          <filter id="softSmokeBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" />
          </filter>
        </defs>

        <style>
          {`
            @keyframes smokeWispRise1 {
              0% {
                transform: translate(0, 0) scale(0.65);
                opacity: 0;
              }
              15% {
                opacity: 0.85;
              }
              50% {
                transform: translate(-4px, -14px) scale(1.15) rotate(-4deg);
                opacity: 0.6;
              }
              80% {
                opacity: 0.25;
              }
              100% {
                transform: translate(-9px, -28px) scale(1.6) rotate(-10deg);
                opacity: 0;
              }
            }

            @keyframes smokeWispRise2 {
              0% {
                transform: translate(0, 0) scale(0.7);
                opacity: 0;
              }
              20% {
                opacity: 0.8;
              }
              60% {
                transform: translate(4px, -16px) scale(1.25) rotate(5deg);
                opacity: 0.5;
              }
              85% {
                opacity: 0.2;
              }
              100% {
                transform: translate(8px, -32px) scale(1.75) rotate(12deg);
                opacity: 0;
              }
            }

            @keyframes smokePuffExpand1 {
              0% {
                transform: translate(0, 0) scale(0.6);
                opacity: 0.75;
              }
              50% {
                transform: translate(-3px, -12px) scale(1.3);
                opacity: 0.45;
              }
              100% {
                transform: translate(-6px, -24px) scale(2.0);
                opacity: 0;
              }
            }

            @keyframes smokePuffExpand2 {
              0% {
                transform: translate(0, 0) scale(0.5);
                opacity: 0.7;
              }
              50% {
                transform: translate(3px, -14px) scale(1.35);
                opacity: 0.4;
              }
              100% {
                transform: translate(7px, -27px) scale(2.1);
                opacity: 0;
              }
            }

            @keyframes muzzlePulse {
              0%, 100% {
                opacity: 0.45;
                transform: scale(0.9);
              }
              50% {
                opacity: 0.95;
                transform: scale(1.25);
              }
            }

            .smoke-anim-1 {
              transform-origin: 31px 9px;
              animation: smokeWispRise1 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
            }

            .smoke-anim-2 {
              transform-origin: 31px 9px;
              animation: smokeWispRise2 3.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite 0.9s;
            }

            .smoke-puff-1 {
              transform-origin: 31px 8px;
              animation: smokePuffExpand1 3.0s ease-out infinite 0.4s;
            }

            .smoke-puff-2 {
              transform-origin: 31px 8px;
              animation: smokePuffExpand2 3.6s ease-out infinite 1.7s;
            }

            .muzzle-glow {
              transform-origin: 31px 9px;
              animation: muzzlePulse 2.2s ease-in-out infinite;
            }
          `}
        </style>

        {/* ================= ANIMATED SMOKE LAYER ================= */}
        <g id="smoking-gun-effects">
          {/* Muzzle Barrel Hot Ember Glow */}
          <circle
            cx="31"
            cy="9"
            r="4.5"
            fill="url(#muzzleHeat)"
            className="muzzle-glow pointer-events-none"
          />

          {/* Soft Expanding Smoke Puffs */}
          <g filter="url(#softSmokeBlur)" className="pointer-events-none">
            <circle
              cx="31"
              cy="7"
              r="3.5"
              fill="#f7efe5"
              className="smoke-puff-1"
            />
            <circle
              cx="31"
              cy="7"
              r="3"
              fill="#fceee0"
              className="smoke-puff-2"
            />
          </g>

          {/* Primary Wispy Curling Smoke Ribbon 1 */}
          <path
            d="M 31 8
               C 28 3, 25 -1, 28 -7
               C 31 -13, 25 -18, 23 -24
               C 21 -30, 27 -35, 22 -40"
            fill="none"
            stroke="url(#smokeGradient1)"
            strokeWidth="2.4"
            strokeLinecap="round"
            filter="url(#smokeBlur)"
            className="smoke-anim-1 pointer-events-none"
          />

          {/* Secondary Drifting Smoke Ribbon 2 */}
          <path
            d="M 31 8
               C 34 3, 37 -1, 35 -8
               C 33 -15, 39 -20, 36 -28
               C 34 -34, 40 -38, 37 -44"
            fill="none"
            stroke="url(#smokeGradient2)"
            strokeWidth="2.1"
            strokeLinecap="round"
            filter="url(#smokeBlur)"
            className="smoke-anim-2 pointer-events-none"
          />

          {/* Tiny drifting ember / spark */}
          <circle cx="30" cy="5" r="0.75" fill="#ffd700" className="smoke-anim-1 opacity-70" />
          <circle cx="32" cy="4" r="0.6" fill="#ff5e36" className="smoke-anim-2 opacity-60" />
        </g>

        {/* ================= GOLDEN PISTOL BODY (THE "L") ================= */}
        {/* Outer Bevel / Base Glow Layer for Dimensionality */}
        <path
          d="M 22 10 
             L 42 10 
             L 42 14 
             L 40 14 
             L 40 48 
             L 54 48 
             C 62 48, 64 54, 60 62 
             L 76 69 
             C 80 71, 81 76, 79 81 
             L 74 91 
             C 72 95, 67 96, 62 94 
             L 43 85 
             L 37 87 
             L 24 87 
             C 21 87, 19 84, 19 81 
             L 19 13 
             C 19 11, 20 10, 22 10 Z"
          fill="url(#pistolGoldShadow)"
          opacity="0.6"
        />

        {/* Main Golden Pistol forming the letter 'L' */}
        {/* The Vertical Slide/Barrel forms the stem of 'L', the Grip & Magazine form the base foot of 'L' */}
        <path
          d="M 24 12
             L 38 12
             L 38 15
             L 36 15
             L 36 50
             L 52 50
             C 58 50, 60 55, 57 62
             L 74 69
             C 77 70, 78 74, 76 78
             L 72 88
             C 70 91, 66 92, 62 90
             L 42 81
             L 38 84
             L 24 84
             C 22 84, 21 82, 21 80
             L 21 14
             C 21 13, 22 12, 24 12 Z"
          fill="url(#pistolGoldGrad)"
          stroke="#fff4a8"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Slide Serrations (Vertical tactile ridges on the L's vertical barrel) */}
        <line x1="24" y1="20" x2="34" y2="20" stroke="#7a4d00" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="25" x2="34" y2="25" stroke="#7a4d00" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="30" x2="34" y2="30" stroke="#7a4d00" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="35" x2="34" y2="35" stroke="#7a4d00" strokeWidth="1.5" strokeLinecap="round" />

        {/* Barrel / Slide Specular Highlight Streak */}
        <path
          d="M 23 14 L 26 14 L 26 78 L 23 78 Z"
          fill="url(#pistolHighlight)"
          opacity="0.75"
        />

        {/* Ejection Port / Chamber Accent on the slide */}
        <rect
          x="30"
          y="40"
          width="5"
          height="10"
          rx="1"
          fill="#523200"
          stroke="#ffe57f"
          strokeWidth="0.8"
        />

        {/* Pistol Trigger Guard Loop (creates the inner curve of the L) */}
        <path
          d="M 36 52
             C 45 52, 49 57, 46 64
             C 44 68, 40 70, 36 71"
          fill="none"
          stroke="#ffe57f"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Curved Trigger inside Guard */}
        <path
          d="M 38 56 C 41 58, 41 62, 39 65"
          fill="none"
          stroke="#422600"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Grip Checkered Texture Lines (The horizontal foot of the L) */}
        <line x1="47" y1="72" x2="65" y2="79" stroke="#7a4d00" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="45" y1="76" x2="63" y2="83" stroke="#7a4d00" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="43" y1="80" x2="61" y2="87" stroke="#7a4d00" strokeWidth="1.2" strokeLinecap="round" />

        {/* Grip Medallion Star / Rose Accent in Center of Handle */}
        <circle cx="54" cy="80" r="3" fill="#ffeaa7" stroke="#7a4d00" strokeWidth="1" />
        <polygon
          points="54,78 55,79.5 56.5,80 55,80.5 54,82 53,80.5 51.5,80 53,79.5"
          fill="#ff3358"
        />

        {/* Muzzle Tip with Barrel Opening (Top of the L) */}
        <rect
          x="27"
          y="9"
          width="8"
          height="3"
          rx="0.5"
          fill="#fff3a8"
          stroke="#7a4d00"
          strokeWidth="0.8"
        />
        {/* Bore Hole at Muzzle */}
        <ellipse
          cx="31"
          cy="9"
          rx="2.2"
          ry="0.9"
          fill="#331b00"
        />

        {/* Magazine Floor Plate (Bottom right tip of the L) */}
        <path
          d="M 68 87 L 76 90 L 73 94 L 65 91 Z"
          fill="#ffdf70"
          stroke="#7a4d00"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
};
