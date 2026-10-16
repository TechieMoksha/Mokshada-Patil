import React, { useEffect, useState, useCallback } from 'react';

interface SparkleItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  opacity: number;
}

interface CursorSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

const THEME_COLORS = [
  '#ff6b00', // Primary orange
  '#f59e0b', // Amber
  '#fb923c', // Peach orange
  '#fbbf24', // Warm gold
  '#38bdf8', // Digital cyan accent
  '#ffffff', // Crisp white sparkle
];

export const DigitalSparkles: React.FC = () => {
  const [ambientSparkles, setAmbientSparkles] = useState<SparkleItem[]>([]);
  const [cursorSparkles, setCursorSparkles] = useState<CursorSparkle[]>([]);

  // Generate static ambient background sparkles
  useEffect(() => {
    const sparkles: SparkleItem[] = [];
    const count = 32;

    for (let i = 0; i < count; i++) {
      // Avoid placing too densely in top center to keep text super legible
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.floor(Math.random() * 9) + 8; // 8px to 16px
      const color = THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
      const delay = +(Math.random() * 5).toFixed(2);
      const duration = +(Math.random() * 3 + 2.5).toFixed(2);
      const opacity = +(Math.random() * 0.4 + 0.35).toFixed(2);

      sparkles.push({
        id: i,
        x,
        y,
        size,
        color,
        delay,
        duration,
        opacity,
      });
    }

    setAmbientSparkles(sparkles);
  }, []);

  // Subtle interactive digital sparkle trail on cursor move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Only spawn occasionally to keep it refined and lightweight
    if (Math.random() > 0.28) return;

    const newSparkle: CursorSparkle = {
      id: Date.now() + Math.random(),
      x: e.clientX + (Math.random() * 18 - 9),
      y: e.clientY + (Math.random() * 18 - 9),
      size: Math.floor(Math.random() * 7) + 7, // 7px - 14px
      color: THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)],
      rotation: Math.floor(Math.random() * 90),
    };

    setCursorSparkles((prev) => [...prev.slice(-14), newSparkle]);

    // Auto-remove sparkle after animation finishes
    setTimeout(() => {
      setCursorSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 750);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      className="digital-sparkles-container pointer-events-none fixed inset-0 overflow-hidden z-10"
      aria-hidden="true"
    >
      {/* Ambient Twinkling Digital Sparkles */}
      {ambientSparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="digital-sparkle ambient"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            color: sparkle.color,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            opacity: sparkle.opacity,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full drop-shadow-[0_0_8px_currentColor]"
          >
            {/* 4-point faceted digital sparkle */}
            <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
          </svg>
        </span>
      ))}

      {/* Interactive Cursor Trail Sparkles */}
      {cursorSparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="digital-sparkle cursor-trail"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            color: sparkle.color,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg)`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full drop-shadow-[0_0_6px_currentColor]"
          >
            <path d="M12 0L13.8 10.2L24 12L13.8 13.8L12 24L10.2 13.8L0 12L10.2 10.2L12 0Z" />
          </svg>
        </span>
      ))}
    </div>
  );
};

export default DigitalSparkles;
