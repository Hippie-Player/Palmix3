import React from "react";

export function CocktailGlass({ color = "#EF4444", className = "h-12 w-12" }) {
  return (
    <svg viewBox="0 0 100 120" className={className} stroke={color} strokeWidth="2" fill="none">
      <path d="M20,10 L80,10 L50,60 Z" />
      <path d="M50,60 L50,100" />
      <ellipse cx="50" cy="105" rx="15" ry="5" />
    </svg>
  );
}

export function CoffeeCup({ color = "#F59E0B", className = "h-12 w-12" }) {
  return (
    <svg viewBox="0 0 100 120" className={className} stroke={color} strokeWidth="2" fill="none">
      <rect x="25" y="40" width="50" height="40" rx="10" fill="none" />
      <path d="M75,55 Q90,60 75,75" />
      <rect x="35" y="80" width="30" height="8" rx="4" />
    </svg>
  );
}

export function TeaCup({ color = "#10B981", className = "h-12 w-12" }) {
  return (
    <svg viewBox="0 0 100 120" className={className} stroke={color} strokeWidth="2" fill="none">
      <ellipse cx="50" cy="60" rx="25" ry="15" />
      <path d="M25,60 Q20,80 50,80 Q80,80 75,60" />
      <path d="M75,60 Q90,65 75,80" />
      <rect x="40" y="80" width="20" height="8" rx="4" />
    </svg>
  );
}

export function MocktailGlass({ color = "#8B5CF6", className = "h-12 w-12" }) {
  return (
    <svg viewBox="0 0 100 120" className={className} stroke={color} strokeWidth="2" fill="none">
      <rect x="35" y="20" width="30" height="60" rx="15" />
      <ellipse cx="50" cy="90" rx="15" ry="5" />
      <path d="M50,80 L50,100" />
    </svg>
  );
}

export function FusionBeaker({ color = "#EC4899", className = "h-12 w-12" }) {
  return (
    <svg viewBox="0 0 100 120" className={className} stroke={color} strokeWidth="2" fill="none">
      <rect x="30" y="20" width="40" height="60" rx="10" />
      <ellipse cx="50" cy="80" rx="20" ry="8" />
      <path d="M50,80 L50,100" />
    </svg>
  );
}

export function SeasonalGlass({ color = "#06B6D4", className = "h-12 w-12" }) {
  return (
    <svg viewBox="0 0 100 120" className={className} stroke={color} strokeWidth="2" fill="none">
      <ellipse cx="50" cy="30" rx="20" ry="10" />
      <rect x="30" y="30" width="40" height="50" rx="10" />
      <ellipse cx="50" cy="80" rx="20" ry="8" />
    </svg>
  );
}

export function BeerMugIcon({ color = "#FBBF24", className = "h-12 w-12" }) {
  return (
    <svg viewBox="0 0 100 120" className={className} stroke={color} strokeWidth="2" fill="none">
      <rect x="30" y="30" width="40" height="60" rx="10" fill="#FDE68A" stroke={color} />
      <rect x="70" y="45" width="10" height="30" rx="5" stroke={color} />
      <ellipse cx="50" cy="30" rx="20" ry="10" fill="#FEF3C7" stroke={color} />
      <ellipse cx="50" cy="90" rx="20" ry="8" fill="#FDE68A" stroke={color} />
      <line x1="40" y1="40" x2="40" y2="80" stroke={color} />
      <line x1="50" y1="40" x2="50" y2="80" stroke={color} />
      <line x1="60" y1="40" x2="60" y2="80" stroke={color} />
    </svg>
  );
} 