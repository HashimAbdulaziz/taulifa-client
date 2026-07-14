"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { useLandingScrollAnimation } from "@/lib/animations/scrollVariants";
import KankaImage from "@/assets/svgs/Kanka.png";

/** Rising coffee wave with a lighter caramel crema crest so it reads as liquid. */
function CoffeeWave() {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="block w-full h-[100px] shrink-0"
    >
      <defs>
        <linearGradient
          id="crema"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#C9974D"
          />
          <stop
            offset="45%"
            stopColor="#8B5A2B"
          />
          <stop
            offset="100%"
            stopColor="#1A0F08"
          />
        </linearGradient>
      </defs>
      {/* back wave — depth */}
      <path
        d="M0,55 C260,110 560,18 860,66 C1080,102 1280,40 1440,62 L1440,120 L0,120 Z"
        fill="#2C1A0E"
      />
      {/* front wave — page-dark fill */}
      <path
        d="M0,72 C220,38 440,104 700,66 C980,24 1200,92 1440,58 L1440,120 L0,120 Z"
        fill="#1A0F08"
      />
      {/* crema band along the front wave crest */}
      <path
        d="M0,72 C220,38 440,104 700,66 C980,24 1200,92 1440,58"
        fill="none"
        stroke="url(#crema)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* bright highlight on the very top edge — catches light against the cream */}
      <path
        d="M0,70 C220,36 440,102 700,64 C980,22 1200,90 1440,56"
        fill="none"
        stroke="#E8C97A"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

/** Faint zellige star-tile texture — gives the cream parchment material. */
function ZelligeBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="zellige"
          x="0"
          y="0"
          width="34"
          height="34"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="17,2 32,17 17,32 2,17"
            fill="none"
            stroke="#8B6A30"
            strokeWidth="0.5"
          />
          <polygon
            points="17,8 26,17 17,26 8,17"
            fill="none"
            stroke="#8B6A30"
            strokeWidth="0.3"
          />
          <circle
            cx="0"
            cy="0"
            r="1"
            fill="#8B6A30"
          />
          <circle
            cx="34"
            cy="0"
            r="1"
            fill="#8B6A30"
          />
          <circle
            cx="0"
            cy="34"
            r="1"
            fill="#8B6A30"
          />
          <circle
            cx="34"
            cy="34"
            r="1"
            fill="#8B6A30"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#zellige)"
      />
    </svg>
  );
}

/** Clean ornamental stamp — no box, just star flourishes around the text. */
function OrnamentalBadge() {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <svg
        width="9"
        height="9"
        viewBox="0 0 8 8"
        aria-hidden="true"
      >
        <polygon
          points="4,0 5,3 8,3 5.5,5 6.5,8 4,6 1.5,8 2.5,5 0,3 3,3"
          fill="#8B6A30"
        />
      </svg>
      <span className="font-sans font-light text-[13px] tracking-[0.22em] text-cream-ink-soft">
        لأول مرة.. قهوتك من تصميمك، مش
        بس اختيارك
      </span>
      <svg
        width="9"
        height="9"
        viewBox="0 0 8 8"
        aria-hidden="true"
      >
        <polygon
          points="4,0 5,3 8,3 5.5,5 6.5,8 4,6 1.5,8 2.5,5 0,3 3,3"
          fill="#8B6A30"
        />
      </svg>
    </div>
  );
}

/** A single rising vapor wisp. Warm near-white so it reads as steam on cream. */
function SteamWisp({
  x,
  delay,
  size,
}: {
  x: number;
  delay: number;
  size: number;
}) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full blur-[7px]"
      style={{
        left: x,
        width: size,
        height: size * 1.9,
        background:
          "rgba(255,254,250,0.95)",
      }}
      animate={
        reducedMotionSafe()
          ? undefined
          : {
              y: [0, -85, -175],
              opacity: [0, 0.85, 0],
              x: [
                0,
                x > 0 ? 16 : -16,
                4,
              ],
              scale: [0.7, 1.2, 1.5],
            }
      }
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

// Steam animation is decorative; honour reduced-motion without a hook here.
function reducedMotionSafe() {
  if (typeof window === "undefined")
    return false;
  return window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
}

/** Full-bleed calligraphic letterform field — the wordmark's own letters as
    abstract typographic texture (Direction A: no readable phrases). Distributed
    so visual weight is even across the full width, with large shapes bleeding off
    the left/bottom-left edges to fill the gutters; the right third stays clear of
    dense type for the red wordmark + CTA.

    NOTE: uses MONOCHROME Aref Ruqaa (font-display), not Aref Ruqaa Ink. Ink is a
    color font that renders red and would violate the single-tone / no-red rule —
    the same letterforms in the monochrome family keep the wordmark's DNA while
    honouring the one #D2C4A6 tone. */
const BG_LETTERS = [
  // ت — primary anchor, bleeds off the top-left edge
  { ch: 'ت', cls: 'top-[-13%] left-[-6%] text-[clamp(280px,38vw,560px)]' },
  // و — secondary anchor, bleeds off the bottom-left edge
  { ch: 'و', cls: 'bottom-[-15%] left-[-4%] text-[clamp(220px,30vw,440px)]' },
  // ة — tertiary, center-low behind the dallah, no bleed
  { ch: 'ة', cls: 'top-[42%] left-[21%] text-[clamp(160px,20vw,300px)]' },
  // ي — a faint tail filling the far-right gutter, bleeds off the bottom-right
  { ch: 'ي', cls: 'bottom-[-12%] right-[-7%] text-[clamp(180px,22vw,340px)]' },
] as const;

function BackgroundType() {
  return (
    <>
      {BG_LETTERS.map((l) => (
        <span
          key={l.ch}
          className={`absolute font-display text-bg-type leading-none opacity-[0.12] ${l.cls}`}
        >
          {l.ch}
        </span>
      ))}
    </>
  );
}

/** Layer 2 — the editorial phrases (brand voice). Distributed across three bands
    (top / middle / bottom) and leaning LEFT so the right third stays clear for the
    red wordmark + CTA. One tone (text-bg-phrase #A8916B) + one opacity (0.38) —
    legible-but-soft, read once on a pause, never competing with the headline. */
const PHRASES = [
  // top band — runs from upper-left toward center
  { text: 'في كل رشفة حكاية', cls: 'top-[13%] left-[3%] rotate-[-2deg] text-[clamp(1.7rem,3.6vw,3rem)]' },
  // middle band — hugs the far-left edge beside the dallah
  { text: 'ولّف مزاجك', cls: 'top-[45%] left-[-1%] rotate-[2deg] text-[clamp(1.8rem,3.8vw,3.2rem)]' },
  // bottom band — spans wide along the lower-left
  { text: 'العب بمكوناتك، واشرب إبداعك', cls: 'bottom-[12%] left-[3%] rotate-[-2deg] text-[clamp(1.5rem,3.2vw,2.7rem)]' },
] as const;

function PhraseLayer() {
  return (
    <>
      {PHRASES.map((p) => (
        <span
          key={p.text}
          className={`absolute whitespace-nowrap font-display text-bg-phrase leading-none opacity-[0.38] ${p.cls}`}
        >
          {p.text}
        </span>
      ))}
    </>
  );
}

export function LandingHero() {
  const scrollRef =
    useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();

  const { scrollYProgress } = useScroll(
    {
      target: scrollRef,
      offset: [
        "start start",
        "end start",
      ],
    },
  );

  const v = useLandingScrollAnimation(
    scrollYProgress,
    reduced,
  );

  return (
    <div
      ref={scrollRef}
      className="h-[180vh]"
    >
      {/* backgroundColor is a MotionValue (cream → dark) — must remain in style */}
      <motion.section
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          backgroundColor: v.bgColor,
        }}
      >
        {/* Parchment texture */}
        <ZelligeBg />

        {/* L1 — full-bleed letterform texture (felt, not read). y is a MotionValue. */}
        <motion.div
          style={{ y: v.watermarkY }}
          className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <BackgroundType />
        </motion.div>

        {/* L2 — editorial phrases (brand voice), above the texture, below the dallah.
            Parallaxes slightly faster than L1 for depth. y is a MotionValue. */}
        <motion.div
          style={{ y: v.phraseY }}
          className="absolute inset-0 z-1 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <PhraseLayer />
        </motion.div>

        {/* Split hero layout — architectural right-left tension (RTL) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-8 h-full flex items-center gap-10 pt-20">
          {/* RIGHT — title + CTA (first in RTL). items-start = the right spine in RTL.
              Each block nests: OUTER = scroll parallax (style MotionValue),
              INNER = entrance animation. They must be separate elements — binding a
              MotionValue to style.opacity AND animating opacity on the same node
              conflicts and pins it at the initial 0 (invisible). */}
          <div className="flex-[1.1] flex flex-col items-start text-right max-w-150">
            {/* Ornamental stamp */}
            <motion.div
              style={{
                opacity: v.badgeOpacity,
              }}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: -12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                }}
              >
                <OrnamentalBadge />
              </motion.div>
            </motion.div>

            {/* Brand title — scratchy red-ink wordmark. font-display-ink renders
                its own red ink; the big leading + mb keeps the ink flourishes
                from overlapping the tagline below. */}
            <motion.div
              style={{
                opacity: v.titleOpacity,
                y: v.titleY,
              }}
            >
              <motion.h1
                initial={{
                  opacity: 0,
                  x: 28,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 1.2,
                  ease: [
                    0.22, 1, 0.36, 1,
                  ],
                  delay: 0.15,
                }}
                className="font-display-ink text-red-brand brightness-90 leading-[1.15] tracking-[-0.01em] mb-6 text-[clamp(7rem,14vw,12rem)]"
              >
                توليفة
              </motion.h1>
            </motion.div>

            {/* Tagline — mid parallax */}
            <motion.div
              style={{
                opacity: v.subOpacity,
                y: v.subY,
              }}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  x: 22,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 1,
                  ease: [
                    0.22, 1, 0.36, 1,
                  ],
                  delay: 0.3,
                }}
              >
                <p className="font-sans font-light text-cream-ink-soft leading-snug mb-2.5 text-[clamp(1.25rem,2.4vw,1.75rem)]">
                  اصنع توليفتك الخاصة
                </p>
                <p className="font-sans font-light text-cream-ink-soft/70 mb-10 text-[1.05rem]">
                  قهوة مميّزة بلمستك أنت
                </p>
              </motion.div>
            </motion.div>

            {/* CTA — shallowest parallax */}
            <motion.div
              style={{
                opacity: v.ctaOpacity,
                y: v.ctaY,
              }}
              className="flex flex-col items-start gap-4"
            >
              <motion.div
                initial={{
                  opacity: 0,
                  x: 18,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.9,
                  ease: [
                    0.22, 1, 0.36, 1,
                  ],
                  delay: 0.42,
                }}
                className="flex flex-col items-start gap-4"
              >
                <motion.button
                  whileHover={{
                    backgroundColor:
                      "#E8C97A",
                    boxShadow:
                      "0 0 22px rgba(212,168,83,0.25)",
                  }}
                  whileTap={{
                    y: 1,
                    filter:
                      "brightness(0.96)",
                  }}
                  className="font-display text-[1.3rem] rounded-xl py-4.5 px-12 bg-gold text-page"
                >
                  اصنع توليفتك الأن
                </motion.button>

                <p className="font-sans font-light text-cream-ink-soft/60 tracking-[0.06em] text-[0.8rem]">
                  +٢٬٠٠٠ توليفة مُصنّعة
                  هذا الشهر
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* LEFT — dallah (second in RTL), with breathing room */}
          <div className="flex-1 flex justify-center items-center relative min-h-115">
            {/* Ambient warm glow behind the pot */}
            <div
              aria-hidden="true"
              className="absolute w-110 h-110 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(212,168,83,0.12)_0%,transparent_68%)]"
            />

            {/* Dallah — rotate + y (sinks) are MotionValues */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1.4,
                ease: [
                  0.22, 1, 0.36, 1,
                ],
                delay: 0.25,
              }}
              style={{
                rotate: v.dallahRotate,
                y: v.dallahY,
                transformOrigin:
                  "50% 80%",
              }}
            >
              <Image
                src={KankaImage}
                alt="دلة قهوة عربية"
                width={360}
                height={491}
                priority
                className="object-contain max-h-[78vh] w-auto drop-shadow-[0_28px_55px_rgba(44,26,18,0.28)]"
              />
            </motion.div>

            {/* Rising steam from the pot's mouth — opacity is a MotionValue */}
            <motion.div
              className="absolute top-[8%] left-[35%] w-24 h-32 pointer-events-none"
              style={{
                opacity: v.steamOpacity,
              }}
              aria-hidden="true"
            >
              <div className="relative h-full">
                <SteamWisp
                  x={0}
                  delay={0}
                  size={24}
                />
                <SteamWisp
                  x={26}
                  delay={1.2}
                  size={19}
                />
                <SteamWisp
                  x={-20}
                  delay={2.3}
                  size={28}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator — thin pulsing gold line + "استكشف". opacity is a MotionValue */}
        <motion.div
          style={{
            opacity: v.hintOpacity,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5"
        >
          <div className="relative w-px h-10 overflow-hidden bg-[rgba(139,106,48,0.3)]">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gold h-[40%]"
              animate={
                reduced
                  ? undefined
                  : {
                      y: [
                        "-100%",
                        "300%",
                      ],
                    }
              }
              transition={{
                duration: 1.7,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.2,
              }}
            />
          </div>
          <span className="font-sans font-light text-[10px] tracking-[0.16em] text-cream-ink-soft">
            استكشف
          </span>
        </motion.div>

        {/* Coffee wave — z-20 so it rises OVER the dallah. y is a MotionValue.
            Skipped under reduced motion (the bg crossfade carries cream→dark alone). */}
        {!reduced && (
          <motion.div
            className="absolute inset-0 z-20 flex flex-col pointer-events-none"
            style={{ y: v.waveY }}
            aria-hidden="true"
          >
            <CoffeeWave />
            <div className="flex-1 bg-page" />
          </motion.div>
        )}
      </motion.section>
    </div>
  );
}
