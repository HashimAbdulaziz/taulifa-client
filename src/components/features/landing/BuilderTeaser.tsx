'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion';

/* ────────────────────────────────────────────────────────────────────────────
   BuilderTeaser — the dark "coffee sea" band between the hero and products.
   Center: heading + CTA. Around it: hand-drawn ingredient illustrations
   (public/ingredients/*.webp — pre-stripped, trimmed, ~350KB total) floating
   on organic, out-of-sync loops behind the text (z-0 vs z-10).
   ──────────────────────────────────────────────────────────────────────── */

type FloatSpec = {
  /** absolute-position + responsive-size classes for the wrapper */
  position: string;
  /** ambient loop — each ingredient gets its own physics so nothing syncs */
  y: number[];
  rotate: number[];
  duration: number;
  delay: number;
  /** resting pose so items don't all sit axis-aligned */
  initialRotate: number;
  /** depth treatment (opacity/blur) */
  depth?: string;
};

function FloatingIngredient({
  src, width, height, spec, reduced,
}: {
  src: string; width: number; height: number; spec: FloatSpec; reduced: boolean;
}) {
  const loop: TargetAndTransition | undefined = reduced
    ? undefined
    : { y: spec.y, rotate: spec.rotate.map((r) => r + spec.initialRotate) };

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute z-0 pointer-events-none select-none ${spec.position} ${spec.depth ?? ''}`}
      initial={{ rotate: spec.initialRotate }}
      animate={loop}
      transition={{
        duration: spec.duration,
        delay: spec.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt=""
        draggable={false}
        className="w-full h-auto drop-shadow-[0_22px_28px_rgba(0,0,0,0.4)]"
      />
    </motion.div>
  );
}

/* Named per-ingredient components — swap the src (or the whole Image) freely. */

/** Heavy hero piece — big, slow, barely rotates. */
function FloatingCoffeeSack({ reduced }: { reduced: boolean }) {
  return (
    <FloatingIngredient
      src="/ingredients/coffee-sack.webp" width={897} height={509} reduced={reduced}
      spec={{
        position: 'bottom-[5%] left-[2%] w-[34vw] max-w-90',
        y: [0, -10, 0], rotate: [0, 1.5, -1.5, 0],
        duration: 11, delay: 0, initialRotate: -2,
      }}
    />
  );
}

function FloatingCardamom({ reduced }: { reduced: boolean }) {
  return (
    <FloatingIngredient
      src="/ingredients/cardamom.webp" width={560} height={546} reduced={reduced}
      spec={{
        position: 'top-[10%] right-[6%] w-[15vw] max-w-48',
        y: [0, -15, 0], rotate: [0, 5, -5, 0],
        duration: 7, delay: 0.6, initialRotate: -8,
        depth: 'opacity-90',
      }}
    />
  );
}

function FloatingStarAnise({ reduced }: { reduced: boolean }) {
  return (
    <FloatingIngredient
      src="/ingredients/star-anise.webp" width={427} height={423} reduced={reduced}
      spec={{
        position: 'top-[12%] left-[9%] w-[11vw] max-w-36 hidden md:block',
        y: [0, -16, 0], rotate: [0, 7, -7, 0],
        duration: 6.2, delay: 1.8, initialRotate: 12,
        depth: 'opacity-85',
      }}
    />
  );
}

function FloatingCinnamon({ reduced }: { reduced: boolean }) {
  return (
    <FloatingIngredient
      src="/ingredients/cinnamon.webp" width={720} height={485} reduced={reduced}
      spec={{
        position: 'bottom-[9%] right-[5%] w-[19vw] max-w-60',
        y: [0, -14, 0], rotate: [0, -4, 4, 0],
        duration: 8.5, delay: 1.2, initialRotate: 7,
        depth: 'opacity-90',
      }}
    />
  );
}

/** Smallest + fastest, slightly blurred — reads as the nearest depth plane. */
function FloatingClove({ reduced }: { reduced: boolean }) {
  return (
    <FloatingIngredient
      src="/ingredients/clove.webp" width={420} height={328} reduced={reduced}
      spec={{
        position: 'top-[44%] left-[13%] w-[9vw] max-w-28 hidden md:block',
        y: [0, -18, 0], rotate: [0, -8, 8, 0],
        duration: 5.2, delay: 0.3, initialRotate: -14,
        depth: 'opacity-75 blur-[1.5px]',
      }}
    />
  );
}

export function BuilderTeaser() {
  const reduced = !!useReducedMotion();

  return (
    <section className="relative bg-page overflow-hidden py-24 md:py-28">
      {/* hand-drawn spice pattern — tiled, dissolved on all sides by .spice-veil
          so it melts into the dark instead of reading as a placed rectangle */}
      <div
        aria-hidden="true"
        className="spice-veil absolute inset-0 pointer-events-none opacity-[0.07] bg-[url('/ingredients/spices-pattern.webp')] bg-repeat bg-size-[420px]"
      />

      {/* warm radial glow anchoring the center */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-105 pointer-events-none bg-[radial-gradient(ellipse,rgba(212,168,83,0.07)_0%,transparent_65%)]"
      />

      {/* ── floating ingredient field (z-0, behind the text) ── */}
      <FloatingCoffeeSack reduced={reduced} />
      <FloatingCardamom reduced={reduced} />
      <FloatingStarAnise reduced={reduced} />
      <FloatingCinnamon reduced={reduced} />
      <FloatingClove reduced={reduced} />

      {/* ── the core (z-10) ── */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-sans font-light text-[10px] tracking-[0.5em] uppercase mb-4 text-gold-deep">
            مكوّنات التوليفة
          </p>
          <h2 className="font-display text-heading leading-tight text-[clamp(2.1rem,5.5vw,3.5rem)]">
            أنت من يُمسك الميزان
          </h2>
          <p className="font-sans font-light mt-5 leading-relaxed text-body text-[0.95rem]">
            بنّ عربي محمّص بعناية، هيل فوّاح، قرفة، وقرنفل دافئ — ضعها على
            الميزان، وازِنها على ذوقك، واخرج بتوليفةٍ لا تشبه سواك.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: '#E8C97A',
              boxShadow: '0 0 34px rgba(212,168,83,0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            className="font-display text-[1.25rem] rounded-xl py-4.5 px-14 bg-gold text-page shadow-[0_0_22px_rgba(212,168,83,0.18)]"
          >
            جرّب وولّف قهوتك
          </motion.button>
          <p className="font-sans font-light text-muted text-[0.75rem] tracking-[0.06em] mt-4">
            لعبة التوليف تنتظرك — ثلاث دقائق تكفي
          </p>
        </motion.div>
      </div>
    </section>
  );
}
