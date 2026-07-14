export function EnergyIcon() {
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="34" cy="34" r="34" fill="#D4AF37" fillOpacity="0.1" />
      <path
        d="M40 10 L19 40 H31.5 L28 58 L49 28 H36.5 Z"
        fill="#D4AF37"
      />
      <path
        d="M40 10 L21 38 H33"
        fill="#F0D060"
        fillOpacity="0.45"
      />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="34" cy="34" r="34" fill="#7B9FBD" fillOpacity="0.1" />
      <path
        d="M42 13 A22 22 0 1 0 55 41 A15 15 0 1 1 42 13 Z"
        fill="#7B9FBD"
      />
      <circle cx="49" cy="18" r="2.5" fill="#A8CCEA" fillOpacity="0.75" />
      <circle cx="53" cy="29" r="1.5" fill="#A8CCEA" fillOpacity="0.55" />
    </svg>
  );
}

export function CreamyIcon() {
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="34" cy="34" r="34" fill="#C4966E" fillOpacity="0.1" />
      <path
        d="M10 28 Q20 14 30 28 Q40 42 50 28 Q60 14 66 24"
        fill="none"
        stroke="#C4966E"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M10 42 Q20 28 30 42 Q40 56 50 42 Q60 28 66 38"
        fill="none"
        stroke="#C4966E"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
    </svg>
  );
}

export function ChocolateIcon() {
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chocGrad" x1="12" y1="20" x2="12" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A06030" />
          <stop offset="100%" stopColor="#5A2E0A" />
        </linearGradient>
      </defs>
      <circle cx="34" cy="34" r="34" fill="#8B5A3C" fillOpacity="0.1" />
      <rect x="12" y="20" width="44" height="30" rx="5" fill="url(#chocGrad)" />
      <line x1="12" y1="35" x2="56" y2="35" stroke="#3D1A06" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="27" y1="20" x2="27" y2="50" stroke="#3D1A06" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="42" y1="20" x2="42" y2="50" stroke="#3D1A06" strokeWidth="1.5" strokeOpacity="0.4" />
      <rect x="15" y="23" width="10" height="10" rx="2" fill="#C07840" fillOpacity="0.35" />
    </svg>
  );
}
