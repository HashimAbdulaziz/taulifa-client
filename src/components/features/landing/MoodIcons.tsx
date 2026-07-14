/** Mood-card icons — the same engraved gold line-art system as the ingredient
    illustrations (stroke #D4A853, hairline fills), so cards and the ingredients
    band read as one crafted set. Decorative: parents mark them aria-hidden. */

const GOLD = '#D4A853';

type IconProps = { size?: number };

/** طاقة — lightning bolt. */
export function EnergyIcon({ size = 44 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M27,5 L13,27 h8.5 L19,43 L35,19 h-9 Z"
        stroke={GOLD} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"
        fill="rgba(212,168,83,0.08)"
      />
      <path d="M9,12 l-3.5,-2" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
      <path d="M40,36 l3.5,2" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

/** سهر — crescent moon with stars. */
export function MoonIcon({ size = 44 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M29,7 A16.5,16.5 0 1,0 29,41 A13,13 0 1,1 29,7 Z"
        stroke={GOLD} strokeWidth="1.6" strokeLinejoin="round"
        fill="rgba(212,168,83,0.08)"
      />
      <path
        d="M37,11 l1.2,3.1 3.1,1.2 -3.1,1.2 -1.2,3.1 -1.2,-3.1 -3.1,-1.2 3.1,-1.2 Z"
        fill={GOLD} opacity="0.75"
      />
      <circle cx="36" cy="28" r="1.2" fill={GOLD} opacity="0.5" />
    </svg>
  );
}

/** كريمي — cup with a cream dollop and a steam curl. */
export function CreamyIcon({ size = 44 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* cup */}
      <path
        d="M13,22 H33 L31.8,32 Q30.8,38.5 23,38.5 Q15.2,38.5 14.2,32 Z"
        stroke={GOLD} strokeWidth="1.6" strokeLinejoin="round"
        fill="rgba(212,168,83,0.08)"
      />
      {/* handle */}
      <path d="M33,24 Q39,25 37.5,29.5 Q36.5,32.5 31.5,31.5" stroke={GOLD} strokeWidth="1.4" fill="none" />
      {/* saucer */}
      <path d="M11,42 H35" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      {/* cream dollop cresting the rim */}
      <path
        d="M16.5,22 Q17,16.5 21,15.5 Q25.5,14.5 27.5,17.5 Q29.5,20 28.5,22"
        stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" fill="rgba(212,168,83,0.1)"
      />
      {/* steam curl */}
      <path d="M23,11 Q25.5,8.5 23.5,5.5" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** شوكولاتة — chocolate tablet with a snapped-off square. */
export function ChocolateIcon({ size = 44 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect
        x="10" y="12" width="23" height="23" rx="2.5"
        stroke={GOLD} strokeWidth="1.6"
        fill="rgba(212,168,83,0.08)"
      />
      <path d="M21.5,12 V35" stroke={GOLD} strokeWidth="1" opacity="0.5" />
      <path d="M10,23.5 H33" stroke={GOLD} strokeWidth="1" opacity="0.5" />
      {/* the snapped-off piece */}
      <rect
        x="35" y="27" width="8.5" height="8.5" rx="1.5"
        transform="rotate(14 39 31)"
        stroke={GOLD} strokeWidth="1.4"
        fill="rgba(212,168,83,0.06)"
      />
      <circle cx="16" cy="18" r="1" fill={GOLD} opacity="0.4" />
    </svg>
  );
}
