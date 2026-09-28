import React from "react";

// Helper for standard hand-drawn class styles
// Custom vector icons mimicking a refined, boutique, organic hand-sketch style
// with graceful line-weight variations, overshoots, and warm imperfections.

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
  className?: string;
}

export const Menu = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Slightly organic, hand-sketched parallel lines with unequal lengths */}
    <path d="M 3.8 6.2 C 8.2 5.8, 14.8 6.1, 20.2 5.9" />
    <path d="M 4.1 12.1 C 9.5 12.4, 13.2 11.8, 18.9 12.0" />
    <path d="M 3.9 17.8 C 7.8 17.9, 12.4 17.6, 17.6 18.1" />
  </svg>
);

export const X = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Intersecting stroke lines that slightly overshoot in sketch form */}
    <path d="M 4.5 4.8 L 19.2 19.5" />
    <path d="M 19.5 4.5 L 4.8 19.2" />
    {/* Subtle reinforcing second sketch layer */}
    <path d="M 5.5 4.2 L 18.8 19.8" className="opacity-40" />
  </svg>
);

export const ChevronRight = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 8.5 4.3 C 10.5 7.8, 14.8 10.5, 15.6 11.9 C 14.8 13.2, 11.2 16.2, 8.8 19.6" />
  </svg>
);

export const ChevronLeft = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 15.5 4.3 C 13.5 7.8, 9.2 10.5, 8.4 11.9 C 9.2 13.2, 12.8 16.2, 15.2 19.6" />
  </svg>
);

export const ArrowLeft = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 19.8 12.1 C 14.2 11.8, 8.5 12.2, 4.2 12.1" />
    <path d="M 9.5 6.5 L 4.0 12.1 L 9.8 17.5" />
    <path d="M 9.2 7.1 L 4.5 11.9" className="opacity-35" />
  </svg>
);

export const ArrowRight = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 4.2 12.1 C 9.8 11.8, 15.5 12.2, 19.8 12.1" />
    <path d="M 14.5 6.5 L 20.0 12.1 L 14.2 17.5" />
    <path d="M 14.8 7.1 L 19.5 11.9" className="opacity-35" />
  </svg>
);

export const ChevronUp = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 4.3 15.5 C 7.8 13.5, 10.5 9.2, 11.9 8.4 C 13.2 9.2, 16.2 12.8, 19.6 15.2" />
  </svg>
);

export const ChevronDown = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 4.3 8.5 C 7.8 10.5, 10.5 14.8, 11.9 15.6 C 13.2 14.8, 16.2 11.2, 19.6 8.8" />
  </svg>
);

export const ArrowUp = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 12.1 19.8 C 11.8 14.2, 12.2 8.5, 12.1 4.2" />
    <path d="M 6.5 9.5 L 12.1 4.0 L 17.5 9.8" />
  </svg>
);

export const Wheat = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Exquisite hand-drawn organic wheat stalk */}
    <path d="M 12 23 C 12 18, 11 12, 12.5 2" />
    {/* Seeds on left */}
    <path d="M 12 17 C 8.5 15.5, 7.5 16, 7 18 C 8 18.5, 10 18, 12 17" />
    <path d="M 7 18 Q 4 16, 2 15" /> {/* Seed beard */}
    
    <path d="M 12 13 C 8.2 11.5, 7.2 12, 6.5 14 C 7.5 14.5, 10 14, 12 13" />
    <path d="M 6.5 14 Q 3 12, 1 11" />

    <path d="M 12 9 C 8.0 7.5, 7.0 8.0, 6.2 10 C 7.2 10.5, 10 10, 12 9" />
    <path d="M 6.2 10 Q 2.8 8, 1 7" />

    {/* Seeds on right */}
    <path d="M 12 17 C 15.5 15.5, 16.5 16, 17 18 C 16 18.5, 14 18, 12 17" />
    <path d="M 17 18 Q 20 16, 22 15" />

    <path d="M 12 13 C 15.8 11.5, 16.8 12, 17.5 14 C 16.5 14.5, 14 14, 12 13" />
    <path d="M 17.5 14 Q 21 12, 23 11" />

    <path d="M 12 9 C 16.0 7.5, 17.0 8.0, 17.8 10 C 16.8 10.5, 14 10, 12 9" />
    <path d="M 17.8 10 Q 21.2 8, 23 7" />

    {/* Top glumes */}
    <path d="M 12 5 C 10.5 3, 9.8 3.5, 9.5 5 C 10.2 5.5, 11.5 5.5, 12 5" />
    <path d="M 9.5 5 Q 8 2.5, 7 1" />
    <path d="M 12 5 C 13.5 3, 14.2 3.5, 14.5 5 C 13.8 5.5, 12.5 5.5, 12 5" />
    <path d="M 14.5 5 Q 16 2.5, 17 1" />
  </svg>
);

export const ShieldCheck = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Slightly asymmetrical medieval shield outline */}
    <path d="M 12 2.2 C 15.5 2.1, 19.8 3.1, 19.8 7.5 C 19.8 12.8, 16.2 18.2, 12 21.8 C 7.8 18.2, 4.2 12.8, 4.2 7.5 C 4.2 3.1, 8.5 2.1, 12 2.2 Z" />
    <path d="M 12 3 C 15 2.9, 19 3.8, 19 8 C 19 12, 15.8 17.2, 12 20.8 C 8.2 17.2, 5 12, 5 8 C 5 3.8, 9 2.9, 12 3" className="opacity-30" />
    {/* Exquisite sketchy checkmark */}
    <path d="M 8.5 11.5 L 11.2 14.5 L 15.8 9.2" />
  </svg>
);

export const CheckCircle = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Hand-drawn circular oval loop that doesn't quite close */}
    <path d="M 12 2.5 C 17.5 2.6, 21.6 6.8, 21.4 12.2 C 21.2 17.6, 17.1 21.4, 11.8 21.5 C 6.5 21.6, 2.7 17.1, 2.6 11.8 C 2.5 7.1, 6.2 3.1, 11.2 2.6" />
    <path d="M 8.8 12.2 L 11.1 14.5 L 16.2 9" />
  </svg>
);

export const CheckCircle2 = CheckCircle;

export const Cpu = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Handcrafted rustic processor chip */}
    <path d="M 5.8 5.8 H 18.2 V 18.2 H 5.8 Z" />
    <path d="M 8.5 8.5 H 15.5 V 15.5 H 8.5 Z" className="opacity-40" />
    
    {/* Asymmetrical sketchy chip legs */}
    <path d="M 9 2 V 5.8" />
    <path d="M 12 2 V 5.8" />
    <path d="M 15 2 V 5.8" />

    <path d="M 9 18.2 V 22" />
    <path d="M 12 18.2 V 22" />
    <path d="M 15 18.2 V 22" />

    <path d="M 2 9 H 5.8" />
    <path d="M 2 12 H 5.8" />
    <path d="M 2 15 H 5.8" />

    <path d="M 18.2 9 H 22" />
    <path d="M 18.2 12 H 22" />
    <path d="M 18.2 15 H 22" />
  </svg>
);

export const Leaf = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Exquisitely sketched organic leaf */}
    <path d="M 2 22 Q 13 13, 21.5 2.5" />
    <path d="M 21.5 2.5 C 17.5 5.5, 11 8.5, 7.5 14.5 C 5.5 18, 5 21, 5.5 21.5 C 6 22, 9 20, 11.5 17.5 C 16.5 12.5, 20.5 6.5, 21.5 2.5 Z" />
    
    {/* Leaf branch veins */}
    <path d="M 9 15 C 11.5 14, 13 15, 14 16" />
    <path d="M 13 11 C 15.5 10, 17 11.5, 18 12.5" />
    <path d="M 16 8 C 18 7, 19.5 8.2, 20.2 9" />
  </svg>
);

export const Activity = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 2.2 12 H 6 L 9 4 L 14 20 L 17.5 9.5 L 19 14 H 21.8" />
    <path d="M 2.2 12 H 6 L 9.2 4.2 T 14.2 19.8" className="opacity-25" />
  </svg>
);

export const Globe = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Spheroid circle with sketch lines */}
    <path d="M 12 2.2 C 17.4 2.2, 21.8 6.6, 21.8 12 C 21.8 17.4, 17.4 21.8, 12 21.8 C 6.6 21.8, 2.2 17.4, 2.2 12 C 2.2 6.6, 6.6 2.2, 12 2.2" />
    {/* Latitudes & Longitudes */}
    <path d="M 2.5 12 H 21.5" />
    <path d="M 12 2.2 V 21.8" />
    
    {/* Elispoid lines */}
    <path d="M 12 2.2 C 15.5 5.5, 17 8.5, 17 12 C 17 15.5, 15.5 18.5, 12 21.8" />
    <path d="M 12 2.2 C 8.5 5.5, 7 8.5, 7 12 C 7 15.5, 8.5 18.5, 12 21.8" />
    <path d="M 3.8 7 C 8 8.8, 16 8.8, 20.2 7" className="opacity-40" />
    <path d="M 3.8 17 C 8 15.2, 16 15.2, 20.2 17" className="opacity-40" />
  </svg>
);

export const Database = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Barrel style database tubes stacked */}
    <path d="M 3.5 5 C 3.5 2.8, 20.5 2.8, 20.5 5 C 20.5 7.2, 3.5 7.2, 3.5 5" />
    <path d="M 3.5 5 V 19 C 3.5 22, 20.5 22, 20.5 19 V 5" />
    
    <path d="M 3.5 12 C 3.5 14.5, 20.5 14.5, 20.5 12" />
    <path d="M 3.5 19 C 3.5 21.5, 20.5 21.5, 20.5 19" className="opacity-70" />
  </svg>
);

export const Maximize2 = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Corner expands */}
    <path d="M 15 3 H 21 V 9" />
    <path d="M 21 3 L 14 10" />
    
    <path d="M 9 21 H 3 V 15" />
    <path d="M 3 21 L 10 14" />
  </svg>
);

export const TrendingUp = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 22 5.8 L 13.5 14.3 L 8.5 9.3 L 2 15.8" />
    <path d="M 17 5.8 H 22 V 10.8" />
    <path d="M 22.2 6 L 13.8 14.4" strokeWidth="0.75" className="opacity-40" />
  </svg>
);

export const Heart = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Loose, adorable sketched overlapping heart shape */}
    <path d="M 12 21 C 11.5 21, 2.5 14, 2.5 8.5 C 2.5 5.2, 5.2 2.5, 8.5 2.5 C 10.5 2.5, 11.5 3.5, 12 4.2 C 12.5 3.5, 13.5 2.5, 15.5 2.5 C 18.8 2.5, 21.5 5.2, 21.5 8.5 C 21.5 14, 12.5 21, 12 21 Z" />
    {/* Inner reinforcing shade line */}
    <path d="M 4 8 C 4 6.5, 5 4.5, 7.5 4.5" className="opacity-40" />
  </svg>
);

export const Users = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Hand-drawn minimal community silhouette */}
    {/* Person 1 */}
    <circle cx="9" cy="7" r="3.2" />
    <path d="M 2.8 19 C 2.8 15.5, 5.5 13.5, 9 13.5 C 12.5 13.5, 15.2 15.5, 15.2 19" />
    
    {/* Person 2 (offset) */}
    <circle cx="16.5" cy="6" r="2.5" className="opacity-80" />
    <path d="M 13.5 15 C 14.5 13.2, 16.5 12.8, 18.5 12.8 C 20.5 12.8, 21.8 14.1, 21.8 16.8" className="opacity-85" />
  </svg>
);

export const Mail = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Sketchy mail envelope */}
    <path d="M 3.8 5.2 H 20.2 C 21 5.2, 21.2 5.5, 21.2 6.5 V 17.5 C 21.2 18.5, 21 18.8, 20.2 18.8 H 3.8 C 3 18.8, 2.8 18.5, 2.8 17.5 V 6.5 C 2.8 5.5, 3 5.2, 3.8 5.2 Z" />
    <path d="M 3.1 5.8 L 12 12.8 L 20.9 5.8" />
  </svg>
);

export const Phone = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Classic cozy organic receiver */}
    <path d="M 5 3 C 4.5 3, 3 4.2, 3 6.5 C 3 11.5, 7.5 17.5, 13.5 20.5 C 16.2 21.8, 18.2 21.2, 19.5 20.5 C 20.8 19.8, 21.2 18.2, 20.2 16.8 L 17.8 13.8 C 16.8 12.8, 15.2 12.8, 14.2 13.8 C 13.2 14.8, 12 14, 10.5 12.5 C 9 11, 8.2 9.8, 9.2 8.8 C 10.2 7.8, 10.2 6.2, 9.2 5.2 L 6.8 2.8 C 6.2 2.2, 5.5 3, 5 3 Z" />
  </svg>
);

export const MapPin = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Slightly asymmetric droplet drop pin */}
    <path d="M 12 21.5 C 12 21.5, 4.2 14.5, 4.2 9.5 C 4.2 5.1, 7.8 1.5, 12 1.5 C 16.2 1.5, 19.8 5.1, 19.8 9.5 C 19.8 14.5, 12 21.5, 12 21.5 Z" />
    <circle cx="12" cy="9.5" r="3" />
  </svg>
);

export const Send = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Sketchy paper airplane ready to launch */}
    <path d="M 21.5 2.5 L 2.8 11.2 L 9.8 14.2 L 11.8 19.5 L 14.8 14.2 L 21.5 2.5 Z" />
    <path d="M 9.8 14.2 L 21.5 2.5" />
  </svg>
);

export const Check = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 4.5 12.8 L 9.8 18.1 L 19.5 5.8" />
  </svg>
);

export const Loader2 = ({ size = "24", strokeWidth = "2", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Segmented spinning ring */}
    <path d="M 12 2 C 17.5 2, 22 6.5, 22 12 C 22 14.5, 21.1 16.8, 19.5 18.5" />
    <path d="M 4.5 18.5 C 2.9 16.8, 2 14.5, 2 12" className="opacity-30" />
  </svg>
);

export const Building2 = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Sketchy mill/grain storage terminal */}
    <path d="M 2.8 21.5 H 21.2" />
    <path d="M 4.5 21.5 V 3.5 C 4.5 3.5, 10.5 2.5, 12.5 3.5 V 21.5" />
    <path d="M 12.5 21.5 V 7.5 H 19.5 V 21.5" />
    
    {/* Industrial micro-windows */}
    <path d="M 7 7 H 9" />
    <path d="M 7 11 H 9" />
    <path d="M 7 15 H 9" />
    <path d="M 15 11 H 17" />
    <path d="M 15 15 H 17" />
  </svg>
);

export const Landmark = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Classical architectural facade */}
    <path d="M 2 21.5 H 22" />
    <path d="M 2.8 18.8 H 21.2" />
    <path d="M 12 2.5 L 3 7.8 H 21 L 12 2.5 Z" />
    
    {/* Pillars */}
    <path d="M 5.5 7.8 V 18.8" />
    <path d="M 9.8 7.8 V 18.8" />
    <path d="M 14.2 7.8 V 18.8" />
    <path d="M 18.5 7.8 V 18.8" />
  </svg>
);

export const Award = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Laurel wreath style award medallion */}
    <circle cx="12" cy="8.5" r="5" />
    <circle cx="12" cy="8.5" r="3.2" className="opacity-40" />
    {/* Pendant sash */}
    <path d="M 9.5 13 C 8.5 15, 6.5 19.8, 6.5 21.5 L 12 18.5 L 17.5 21.5 C 17.5 19.8, 15.5 15, 14.5 13" />
    {/* Leaves flanking */}
    <path d="M 4 8 C 4 12, 6.5 14, 8 14.5" />
    <path d="M 20 8 C 20 12, 17.5 14, 16 14.5" />
  </svg>
);

export const Sparkles = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Hand-sketched 4-point magic starbursts */}
    <path d="M 10 2 Q 10 7, 5 7 Q 10 7, 10 12 Q 10 7, 15 7 Q 10 7, 10 2 Z" />
    <path d="M 19 14 Q 19 17, 16 17 Q 19 17, 19 20 Q 19 17, 22 17 Q 19 17, 19 14 Z" />
    <path d="M 5 15 Q 5 16, 4 16 Q 5 16, 5 17 Q 5 16, 6 16 Q 5 16, 5 15 Z" />
  </svg>
);

export const Truck = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Clean hand-modeled delivery truck */}
    <path d="M 2.2 16.5 H 21.8" />
    <path d="M 2.2 16.5 V 6.8 C 2.2 6.8, 13.5 5.8, 15.2 6.8 V 16.5" />
    <path d="M 15.2 9.5 H 20.2 L 21.8 12.8 V 16.5" />
    {/* Wheels not perfectly perfect */}
    <circle cx="6.5" cy="17.8" r="2.2" />
    <circle cx="16.5" cy="17.8" r="2.2" />
  </svg>
);

export const Calendar = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Loose scheduler block */}
    <path d="M 3.8 4.2 H 20.2 C 21 4.2, 21.2 4.5, 21.2 5.5 V 19.5 C 21.2 20.5, 19 20.8, 18.2 20.8 H 5.8 C 4 20.8, 2.8 20.5, 2.8 19.5 V 5.5 C 2.8 4.5, 3 4.2, 3.8 4.2 Z" />
    <path d="M 2.8 8.8 H 21.2" />
    {/* Rings binding top */}
    <path d="M 7.5 2 V 5.5" />
    <path d="M 16.5 2 V 5.5" />
    
    {/* Interior sketchy dots */}
    <circle cx="7.5" cy="12.5" r="0.75" />
    <circle cx="12" cy="12.5" r="0.75" />
    <circle cx="16.5" cy="12.5" r="0.75" />
    <circle cx="7.5" cy="16.8" r="0.75" />
    <circle cx="12" cy="16.8" r="0.75" />
    <circle cx="16.5" cy="16.8" r="0.75" />
  </svg>
);

export const ShieldAlert = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 12 2.2 Z" />
    <path d="M 12 2.2 C 15.5 2.1, 19.8 3.1, 19.8 7.5 C 19.8 12.8, 16.2 18.2, 12 21.8 C 7.8 18.2, 4.2 12.8, 4.2 7.5 C 4.2 3.1, 8.5 2.1, 12 2.2 Z" />
    {/* Exclamation */}
    <path d="M 12 8 V 13" />
    <circle cx="12" cy="16.5" r="0.9" />
  </svg>
);

export const FileText = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Folded page outline */}
    <path d="M 14.5 2.5 H 4.8 C 3.8 2.5, 3.5 2.8, 3.5 3.8 V 20.2 C 3.5 21, 3.8 21.2, 4.8 21.2 H 19.2 C 20.2 21.2, 20.5 21, 20.5 20.2 V 8.5 L 14.5 2.5 Z" />
    <path d="M 14.5 2.5 V 8.5 H 20.5" />
    {/* Text lines represent data sheet */}
    <path d="M 7 11.5 H 17" />
    <path d="M 7 15 H 17" />
  </svg>
);

export const User = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M 4.2 21 C 4.2 17, 7.8 14.2, 12 14.2 C 16.2 14.2, 19.8 17, 19.8 21" />
  </svg>
);

export const Briefcase = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Executive leather case outline */}
    <path d="M 2.5 7.8 H 21.5 V 19.5 C 21.5 20.2, 20 20.8, 19.2 20.8 H 4.8 C 4 20.8, 2.5 20.2, 2.5 19.5 Z" />
    <path d="M 8.5 7.8 V 4.8 C 8.5 3.8, 10 3.2, 12 3.2 C 14 3.2, 15.5 3.8, 15.5 4.8 V 7.8" />
    {/* Straps/buckles */}
    <path d="M 7.5 12 V 15" />
    <path d="M 16.5 12 V 15" />
  </svg>
);

export const MessageSquare = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Interactive chat bubble */}
    <path d="M 20.5 3.5 H 3.5 C 2.5 3.5, 2.2 3.8, 2.2 4.8 V 15.5 C 2.2 16.5, 2.5 16.8, 3.5 16.8 H 17.5 L 21.8 21 V 4.8 C 21.8 3.8, 21.5 3.5, 20.5 3.5 Z" />
  </svg>
);

export const ExternalLink = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 18 13 V 19 C 18 20, 17.5 20.5, 16.5 20.5 H 5 C 4 20.5, 3.5 20, 3.5 19 V 7.5 C 3.5 6.5, 4 6, 5 6 H 11" />
    <path d="M 15 3.5 H 20.5 V 9" />
    <path d="M 13.5 10.5 L 20.2 3.8" />
  </svg>
);

// SOCIALS - beautifully hand-sketched vector silhouettes of brands!

export const Facebook = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 18 2.2 H 14.5 C 11.5 2.2, 9.8 3.8, 9.8 7.2 V 10.5 H 6.2 V 14.5 H 9.8 V 21.8 H 14.2 V 14.5 H 17.8 L 18.5 10.5 H 14.2 V 7.5 C 14.2 6.5, 14.8 5.8, 15.8 5.8 H 18 V 2.2 Z" />
  </svg>
);

export const Twitter = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Cute organic sketch of bird motif */}
    <path d="M 21.8 4.2 C 20.8 5.1, 19.8 5.5, 18.5 5.5 C 16.8 5.5, 15.2 7, 15.2 8.8 L 15.1 10 C 11 9.8, 6.2 7.8, 3.8 4.5 C 3.8 4.5, 1.8 9, 5.8 11.2 C 4.8 11.2, 3.8 11, 2.8 10.5 C 2.8 13.5, 5.5 15.5, 8 16.2 C 7 16.5, 5.8 16.5, 4.8 16.2 C 5.5 18.2, 7.8 19.5, 10.2 19.5 C 7.8 21.2, 4.8 21.8, 2.2 21.5 C 4.8 23.2, 8.5 23.8, 11.8 23" />
  </svg>
);

export const Linkedin = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 16 8 C 19 8, 20.5 9.5, 20.5 12.8 V 20.5 H 16.5 V 13.2 C 16.5 11.8, 15.8 11.2, 14.8 11.2 C 13.8 11.2, 13.2 11.8, 13.2 13.2 V 20.5 H 9.2 V 8.5 H 13.2 V 10.2 C 13.8 9, 15 8, 16 8 Z" />
    <path d="M 3.2 8.5 H 7.2 V 20.5 H 3.2 Z" />
    <circle cx="5.2" cy="4.2" r="2" />
  </svg>
);

export const Instagram = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 5.8 2.8 H 18.2 C 20.2 2.8, 21.2 3.8, 21.2 5.8 V 18.2 C 21.2 20.2, 20.2 21.2, 18.2 21.2 H 5.8 C 3.8 21.2, 2.8 20.2, 2.8 18.2 V 5.8 C 2.8 3.8, 3.8 2.8, 5.8 2.8 Z" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.2" cy="6.8" r="1" />
  </svg>
);

export const Youtube = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Slightly organic rectangle with play triangle */}
    <path d="M 2.2 12 C 2.2 7, 3 4.2, 12 4.2 C 21 4.2, 21.8 7, 21.8 12 C 21.8 17, 21 19.8, 12 19.8 C 3 19.8, 2.2 17, 2.2 12 Z" />
    <path d="M 10 9 L 15.5 12 L 10 15 Z" fill="currentColor" />
  </svg>
);

export const ClipboardCheck = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 16 4 H 19.2 C 19.8 4, 20.5 4.5, 20.5 5.5 V 20.2 C 20.5 21, 19.8 21.5, 19.2 21.5 H 4.8 C 4 21.5, 3.5 21, 3.5 20.2 V 5.5 C 3.5 4.5, 4 4, 4.8 4 H 8" />
    {/* Binder clip clamp */}
    <path d="M 8.5 6 H 15.5 V 3 H 8.5 V 6 Z" />
    {/* Success checkmark */}
    <path d="M 8.8 13.8 L 11.2 16.2 L 16.5 10.8" />
  </svg>
);

export const Clipboard = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 16 4 H 19.2 C 19.8 4, 20.5 4.5, 20.5 5.5 V 20.2 C 20.5 21, 19.8 21.5, 19.2 21.5 H 4.8 C 4 21.5, 3.5 21, 3.5 20.2 V 5.5 C 3.5 4.5, 4 4, 4.8 4 H 8" />
    <path d="M 8.5 6 H 15.5 V 3 H 8.5 V 6 Z" />
  </svg>
);

export const Hash = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 4 9 H 20" />
    <path d="M 4 15 H 20" />
    <path d="M 10 3 L 8 21" />
    <path d="M 16 3 L 14 21" />
  </svg>
);

export const FileCheck = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 14.5 2.5 H 4.8 C 3.8 2.5, 3.5 2.8, 3.5 3.8 V 20.2 C 3.5 21, 3.8 21.2, 4.8 21.2 H 19.2 C 20.2 21.2, 20.5 21, 20.5 20.2 V 8.5 L 14.5 2.5 Z" />
    <path d="M 14.5 2.5 V 8.5 H 20.5" />
    <path d="M 8.5 14.8 L 10.8 17 L 15.5 11.8" />
  </svg>
);

export const HeartHandshake = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Clasping hands overlay in lovely hand-sketch form on top of a heart backdrop */}
    <path d="M 12 5.5 C 11.2 4.5, 9.8 3.5, 7.8 3.5 C 4.5 3.5, 2.5 5.8, 2.5 9 C 2.5 14.5, 12 21, 12 21 Q 12 21, 21.5 9 C 21.5 5.8, 19.5 3.5, 16.2 3.5 Q 14 3.5, 12 5.5 Z" className="opacity-25" />
    {/* Sketched hugging palms */}
    <path d="M 5 15 C 6 12, 10 11, 12.5 12" />
    <path d="M 19 15 C 18 12, 14 11, 11.5 12" />
    <path d="M 9.5 11.5 H 14.5 V 13" />
  </svg>
);

export const Zap = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Double strike lightning bolt */}
    <path d="M 13.5 2 L 4.5 12.8 H 11.2 L 10.5 21.8 L 19.5 11.2 H 12.8 L 13.5 2 Z" />
  </svg>
);

export const Search = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <path d="M 10 2.8 C 14 2.8, 17.2 6, 17.2 10 \
             C 17.2 14, 14 17.2, 10 17.2 \
             C 6 17.2, 2.8 14, 2.8 10 \
             C 2.8 6, 6 2.8, 10 2.8 Z" />
    <path d="M 15 15 L 21.5 21.5" />
  </svg>
);

export const Filter = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    {/* Artisanal funnel filter */}
    <path d="M 3.2 4.8 H 20.8 L 14.2 11.8 V 18.5 L 9.8 20.8 V 11.8 L 3.2 4.8 Z" />
  </svg>
);

export const HelpCircle = ({ size = "24", strokeWidth = "1.5", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
    {...props}
  >
    <circle cx="12" cy="12" r="9.2" />
    <path d="M 9.5 8.5 C 9.5 6, 14.5 6, 14.5 8.5 C 14.5 10.5, 12 10.8, 12 12.8" />
    <circle cx="12" cy="16.5" r="0.9" />
  </svg>
);
