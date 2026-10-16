import React, { useState, useRef, useEffect } from 'react';
import {
  TrendingUp,
  Brain,
  Database,
  BarChart3,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

interface PillarData {
  id: number;
  label: string;
  metric: string;
  sub: string;
  height: number; // percentage
  color: string;
  glow: string;
  icon: React.ElementType;
}

const PILLARS: PillarData[] = [
  {
    id: 1,
    label: 'Data Pipelines',
    metric: '100K+',
    sub: 'Records wrangled',
    height: 52,
    color: 'from-amber-600 via-orange-500 to-amber-300',
    glow: 'rgba(245, 158, 11, 0.45)',
    icon: Database,
  },
  {
    id: 2,
    label: 'BI & Reporting',
    metric: '8.67',
    sub: 'Academic CGPA',
    height: 68,
    color: 'from-orange-600 via-orange-500 to-amber-200',
    glow: 'rgba(255, 107, 0, 0.55)',
    icon: BarChart3,
  },
  {
    id: 3,
    label: 'ML Prediction',
    metric: '98.4%',
    sub: 'Model accuracy',
    height: 92,
    color: 'from-orange-700 via-amber-500 to-orange-300',
    glow: 'rgba(255, 122, 26, 0.65)',
    icon: Brain,
  },
  {
    id: 4,
    label: 'Insight Impact',
    metric: '+38%',
    sub: 'Decision lift',
    height: 78,
    color: 'from-amber-700 via-orange-600 to-amber-400',
    glow: 'rgba(249, 115, 22, 0.5)',
    icon: TrendingUp,
  },
];

export const DataSculpture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState<number>(3); // Default ML pillar
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tilt parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="hero-sculpture-container relative w-full h-[460px] select-none flex items-center justify-center overflow-hidden rounded-2xl"
      style={{
        perspective: '1200px',
      }}
    >
      {/* Dynamic 3D Transform Wrapper */}
      <div
        className="sculpture-scene relative w-full h-full flex flex-col items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        }}
      >
        {/* Ambient Radial Orange/Gold Backdrop Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(255, 107, 0, 0.18) 0%, rgba(245, 158, 11, 0.08) 45%, transparent 75%)',
            opacity: isHovered ? 1 : 0.8,
          }}
        />

        {/* Concentric Tech Grid Rings / Radar Disc at Base */}
        <div className="absolute bottom-6 w-[340px] h-[170px] pointer-events-none opacity-40">
          <svg viewBox="0 0 400 200" className="w-full h-full animate-[spin_60s_linear_infinite]">
            <ellipse
              cx="200"
              cy="100"
              rx="180"
              ry="75"
              fill="none"
              stroke="#ff7a1a"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.6"
            />
            <ellipse
              cx="200"
              cy="100"
              rx="135"
              ry="55"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1"
              strokeDasharray="8 8"
              opacity="0.8"
            />
            <ellipse
              cx="200"
              cy="100"
              rx="90"
              ry="36"
              fill="none"
              stroke="#fb923c"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <line x1="20" y1="100" x2="380" y2="100" stroke="#ff7a1a" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
            <line x1="200" y1="25" x2="200" y2="175" stroke="#ff7a1a" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
          </svg>
        </div>

        {/* Glass Ascending Data Sculpture Pillars */}
        <div className="sculpture-pillars relative z-10 flex items-end justify-center gap-3 sm:gap-4.5 w-full max-w-[390px] h-[320px] px-4 pb-8">
          {PILLARS.map((pillar) => {
            const isSelected = activePillar === pillar.id;
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`pillar-col group relative flex-1 flex flex-col items-center justify-end cursor-pointer transition-all duration-500 ${
                  isSelected ? 'scale-[1.04] -translate-y-2' : 'hover:-translate-y-1 opacity-90'
                }`}
                style={{ height: '100%' }}
              >
                {/* Floating Metric Badge over Active/Hovered Pillar */}
                <div
                  className={`pillar-metric-tag mb-2.5 px-2.5 py-1 rounded-md text-center transition-all duration-300 backdrop-blur-md border ${
                    isSelected
                      ? 'bg-amber-500/20 border-orange-500/60 shadow-[0_0_15px_rgba(255,107,0,0.4)] opacity-100 translate-y-0'
                      : 'bg-black/30 border-white/10 opacity-70 group-hover:opacity-100'
                  }`}
                >
                  <span className="block text-[11px] font-bold text-amber-200 tracking-tight">
                    {pillar.metric}
                  </span>
                  <span className="block text-[8px] uppercase tracking-wider text-orange-200/80">
                    {pillar.label.split(' ')[0]}
                  </span>
                </div>

                {/* 3D Glass Ascending Pillar Body */}
                <div
                  className="pillar-body relative w-full rounded-t-xl overflow-hidden transition-all duration-700 border-t border-x border-orange-400/40 shadow-2xl"
                  style={{
                    height: `${pillar.height}%`,
                    background: `linear-gradient(180deg, rgba(255, 122, 26, 0.35) 0%, rgba(245, 158, 11, 0.15) 30%, rgba(18, 18, 22, 0.85) 100%)`,
                    boxShadow: isSelected
                      ? `0 10px 30px -5px ${pillar.glow}, inset 0 1px 1px rgba(255,255,255,0.4)`
                      : '0 8px 20px -6px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)',
                  }}
                >
                  {/* Top Glowing Crystal Cap */}
                  <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 opacity-90 shadow-[0_0_12px_#ff9933]" />

                  {/* Vertical Light Refraction Shimmer */}
                  <div className="absolute inset-y-0 left-1 w-1 bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
                  <div className="absolute inset-y-0 right-1 w-0.5 bg-gradient-to-b from-orange-300/40 via-transparent to-transparent" />

                  {/* Ascending Light Pulse Beam */}
                  <div className="pillar-pulse-beam absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-orange-300/35 to-transparent animate-[pulseBeam_3.2s_ease-in-out_infinite]" />

                  {/* Horizontal Matrix Grid Steps */}
                  <div className="absolute inset-0 flex flex-col justify-between py-2 px-1 pointer-events-none opacity-25">
                    {[...Array(6)].map((_, idx) => (
                      <div key={idx} className="w-full border-b border-orange-300/40" />
                    ))}
                  </div>

                  {/* Inner Icon at the base of the pillar */}
                  <div className="absolute bottom-3 inset-x-0 flex flex-col items-center justify-center text-orange-300/90">
                    <Icon size={14} className="drop-shadow-[0_0_6px_rgba(255,107,0,0.8)]" />
                  </div>
                </div>

                {/* Base Glow Ring */}
                <div
                  className="w-4/5 h-1.5 mt-1 rounded-full blur-[2px] transition-all duration-500"
                  style={{
                    backgroundColor: isSelected ? '#ff7a1a' : '#f59e0b',
                    opacity: isSelected ? 0.9 : 0.4,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Dynamic Holographic Sparkline Overlay that connects across the tops of pillars */}
        <div className="absolute top-[165px] w-[340px] pointer-events-none z-20">
          <svg viewBox="0 0 340 90" fill="none" className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="sculptureGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#ff7a1a" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#fb923c" stopOpacity="1" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing trend curve */}
            <path
              d="M 25 65 Q 95 50, 130 38 T 215 15 T 310 30"
              stroke="url(#sculptureGradient)"
              strokeWidth="2.5"
              fill="none"
              filter="url(#glow)"
              strokeDasharray="4 2"
            />

            {/* Glowing Data Nodes */}
            {[
              { cx: 38, cy: 62 },
              { cx: 125, cy: 40 },
              { cx: 215, cy: 15 },
              { cx: 300, cy: 30 },
            ].map((node, i) => (
              <g key={i}>
                <circle cx={node.cx} cy={node.cy} r="4.5" fill="#ff7a1a" />
                <circle cx={node.cx} cy={node.cy} r="2" fill="#ffffff" />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="7"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1"
                  className="animate-ping"
                  style={{ animationDuration: `${2 + i * 0.5}s` }}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DataSculpture;
