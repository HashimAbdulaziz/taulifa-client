# Tawlifa — Hero Background Layer (CORRECTION: Restore the Phrases)

**Supersedes:** the previous background-type spec that said "Direction A — drop the phrases."
**Why:** dropping the three phrases was the wrong call. The owner values them — they're brand
voice. The original goal was to **distribute** the background text well, not remove it. Restore
all three phrases and solve distribution properly.

**Keep:** the agent's swap of Aref Ruqaa **Ink** → plain **Aref Ruqaa** for the background layer.
Ink is a color (COLR) font that renders red and ignores CSS `color`, which conflicts with the
one-tone / no-red rule. The monochrome Aref Ruqaa is correct. Do not revert this.

---

## 0. The Model — TWO intentional background layers

The mistake before was treating the background as a single layer. It's two, with distinct roles:

| Layer                                           | Role       | Content                                    | Read as             |
| ----------------------------------------------- | ---------- | ------------------------------------------ | ------------------- |
| **L1 — Texture** (deepest)                      | atmosphere | Giant calligraphic letterforms (`ت و ة ي`) | _felt_, not read    |
| **L2 — Editorial** (above L1, below foreground) | voice      | The three phrases                          | _read once_, softly |

Two layers = two opacity/tone roles. This is **intentional layering**, not the "mixed opacity =
mistake" anti-pattern (that rule was about mixing _within a single role_). L1 stays very faint
texture; L2 is more legible editorial lines.

---

## 1. Layer 1 — Letterform Texture (KEEP as built)

The agent's current implementation stays:

- Letters `ت` (top-left bleed), `و` (bottom-left bleed), `ة` (center-low behind dallah),
  `ي` (right-edge bleed) — fills all four gutters.
- Tone `#D2C4A6`, opacity `0.12`, monochrome Aref Ruqaa, `pointer-events:none`, `aria-hidden`, `z-0`.

No change needed here. This layer is correct.

---

## 2. Layer 2 — Restore the Three Phrases (distributed full-bleed)

Bring back all three phrases. Distribute them across **three vertical bands** (top / middle /
bottom) and lean them **left** (the right third holds the red wordmark + CTA — keep that clear).
This spreads the voice across the whole width instead of a center column.

| Phrase                        | Band   | Anchor     | Bleed                            | Notes                                      |
| ----------------------------- | ------ | ---------- | -------------------------------- | ------------------------------------------ |
| `في كل رشفة حكاية`            | top    | upper-left | may bleed off the **left** edge  | sits above the dallah, spans toward center |
| `ولّف مزاجك`                  | middle | far-left   | flush to / off the **left** edge | fills the left gutter beside the dallah    |
| `العب بمكوناتك، واشرب إبداعك` | bottom | lower-left | may bleed off the **left** edge  | spans the bottom band                      |

Distribution rules:

- **Three bands, leaning left.** Top / middle / bottom, each anchored left or bleeding off the
  left edge. This fills the side that isn't occupied by the wordmark and avoids the center stack.
- **Keep the right third clear.** The phrases must not crowd the red `توليفة` + tagline + CTA.
  At most a phrase's tail may approach center; none should sit behind the wordmark mass.
- **Vary alignment, not randomness.** Top phrase can run slightly into center; middle hugs the
  left; bottom spans wide. Deliberate, not scattered.

---

## 3. Layer 2 Style (legible-but-soft editorial)

Use these tokens:

```css
--bg-phrase-tint: #a8916b; /* warm muted taupe — more presence than L1, still background */
--bg-phrase-op: 0.38; /* readable but clearly background (tune 0.32–0.45) */
```

- Font: monochrome **Aref Ruqaa** (matches the brand calligraphy and the L1 texture).
  _Alternative if you want cleaner contrast against the calligraphic texture:_ IBM Plex Sans
  Arabic 300, tracked `0.04em`. Default to Aref Ruqaa for cohesion.
- Single tone (`--bg-phrase-tint`) and single opacity (`--bg-phrase-op`) across all three phrases
  — uniform within the role.
- `pointer-events:none`. These are decorative-but-meaningful: keep them readable by screen
  readers is optional; if they add no nav value, `aria-hidden` is fine. (They're atmosphere, not
  content.)
- `z-index`: above L1 (texture), below the dallah / steam / red wordmark / CTA.

---

## 4. Layer Stacking (z-order, back to front)

```
cream background (#ECE2CE)
  └─ L1: letterform texture        (#D2C4A6, op 0.12)   z-0
      └─ L2: three phrases         (#A8916B, op 0.38)   z-1
          └─ dallah illustration + steam                z-10
              └─ red wordmark / tagline / CTA / badge   z-20
```

Both background layers parallax slower than the foreground on scroll. Give L1 and L2 slightly
different rates for depth (e.g. L1 `-14px`, L2 `-22px`, foreground wordmark `-40px` over
`[0, 0.4]`).

---

## 5. Restraint Note

The light zone now carries: L1 texture + L2 phrases + steam + dallah + wordmark + CTA. That's
full. Keep it readable by holding the hierarchy strictly:

- L1 must stay barely-there texture (don't raise its opacity).
- L2 phrases are soft — readable on a pause, never competing with the headline at a glance.
- If at the running build the hero feels busy, the lever is **L2 opacity** (lower it), not removing
  phrases again.

---

## 6. Acceptance Criteria

- [ ] All three phrases are **restored** and visible.
- [ ] Phrases distributed across top / middle / bottom bands, leaning left; no center-column stack.
- [ ] Far-left gutter filled by phrases + the `و` letterform; far-right filled by the `ي` letterform.
- [ ] Right third (red wordmark + CTA) is clear of phrase text.
- [ ] L1 texture unchanged (`#D2C4A6`, op 0.12, monochrome Aref Ruqaa).
- [ ] L2 phrases uniform tone (`#A8916B`) and opacity (~0.38), monochrome Aref Ruqaa.
- [ ] Correct z-stacking: cream → L1 → L2 → dallah/steam → wordmark/CTA.
- [ ] Both layers parallax slower than the foreground, at slightly different rates.
- [ ] Aref Ruqaa **Ink** is NOT used for any background layer (color-font conflict) — monochrome Aref Ruqaa only.
- [ ] Verified in the running build (`npm run dev`).

---

## 7. Anti-Patterns

- ❌ Removing the phrases (that was the prior mistake — they stay).
- ❌ Stacking the phrases in a center column.
- ❌ Crowding the red wordmark with background text.
- ❌ Mixed opacity _within_ L1, or _within_ L2 (uniform per layer; the two layers differ by design).
- ❌ Aref Ruqaa Ink (color font) in any background layer.
- ❌ Raising L1 or L2 opacity to the point they compete with the headline.

---

_Correction spec for the Tawlifa hero background. Restore the voice (the three phrases), distribute
it full-bleed and leaning left, and layer it cleanly above the letterform texture — two deliberate
background layers, neither shouting._
