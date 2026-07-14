import { useTransform, type MotionValue } from 'framer-motion';

/** Zone colors for the cream → coffee-sea background crossfade. */
export const ZONE: Record<'cream' | 'dark', string> = {
  cream: '#ECE2CE',
  dark:  '#1A0F08',
};

export type LandingScrollValues = {
  dallahRotate: MotionValue<number>;
  dallahY:      MotionValue<string>;
  waveY:        MotionValue<string>;
  bgColor:      MotionValue<string>;
  titleOpacity: MotionValue<number>;
  titleY:       MotionValue<string>;
  subOpacity:   MotionValue<number>;
  subY:         MotionValue<string>;
  ctaOpacity:   MotionValue<number>;
  ctaY:         MotionValue<string>;
  badgeOpacity: MotionValue<number>;
  hintOpacity:  MotionValue<number>;
  watermarkY:   MotionValue<string>;
  phraseY:      MotionValue<string>;
  steamOpacity: MotionValue<number>;
};

/**
 * Drives the hero's cream→dark scroll story.
 *
 * Ranges OVERLAP deliberately so that at every scroll position something is
 * entering or leaving — there is no frame where the viewport is empty:
 *   - title/sub/cta fade out across 0.08–0.34
 *   - the coffee wave rises 0.15–0.42 (begins before the text has finished leaving)
 *   - background only flips color 0.28–0.46, while the wave apex crosses mid-screen
 * Everything completes within the hero's pinned window (~0.44), so it flows
 * straight into the dark products section with no dead zone.
 *
 * When `reduced` is set, positional transforms collapse to constants and the
 * caller drops the wave — leaving only the cream→dark crossfade + opacity fades.
 */
export function useLandingScrollAnimation(
  p: MotionValue<number>,
  reduced = false
): LandingScrollValues {
  const dallahRotate = useTransform(p, [0,    0.30], reduced ? [0, 0]          : [0, -78]);
  const dallahY      = useTransform(p, [0.10, 0.40], reduced ? ['0%', '0%']    : ['0%', '55%']);
  const waveY        = useTransform(p, [0.15, 0.42], ['100%', '0%']);
  const bgColor      = useTransform(p, [0.28, 0.46], [ZONE.cream, ZONE.dark]);

  const titleOpacity = useTransform(p, [0.12, 0.34], [1, 0]);
  const titleY       = useTransform(p, [0,    0.34], reduced ? ['0px', '0px']  : ['0px', '-40px']);
  const subOpacity   = useTransform(p, [0.10, 0.28], [1, 0]);
  const subY         = useTransform(p, [0,    0.30], reduced ? ['0px', '0px']  : ['0px', '-28px']);
  const ctaOpacity   = useTransform(p, [0.08, 0.24], [1, 0]);
  const ctaY         = useTransform(p, [0,    0.26], reduced ? ['0px', '0px']  : ['0px', '-18px']);
  const badgeOpacity = useTransform(p, [0.04, 0.18], [1, 0]);
  const hintOpacity  = useTransform(p, [0,    0.10], [1, 0]);

  // Both background layers drift SLOWER than the foreground wordmark (-40px) for
  // parallax depth, at slightly different rates: L1 texture (-14px) is deepest,
  // L2 phrases (-22px) sit a touch closer.
  const watermarkY   = useTransform(p, [0, 0.40], reduced ? ['0px', '0px'] : ['0px', '-14px']);
  const phraseY      = useTransform(p, [0, 0.40], reduced ? ['0px', '0px'] : ['0px', '-22px']);

  // Steam fades out early as the pot starts to tip/sink.
  const steamOpacity = useTransform(p, [0, 0.16], [1, 0]);

  return {
    dallahRotate, dallahY, waveY, bgColor,
    titleOpacity, titleY, subOpacity, subY,
    ctaOpacity, ctaY, badgeOpacity, hintOpacity, watermarkY, phraseY, steamOpacity,
  };
}
