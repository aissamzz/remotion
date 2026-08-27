# أمين — البياع لي ما يرقدش

30s Facebook / Instagram ad for Ameen Bot. Six shots, 900 frames @ 30fps,
9:16 primary with a 1:1 feed cutdown.

## Compositions

| id                    | size      | notes                                      |
| --------------------- | --------- | ------------------------------------------ |
| `ameen-ad-vertical`   | 1080×1920 | Primary cut.                               |
| `ameen-ad-square`     | 1080×1080 | Feed cutdown — same components, re-framed. |
| `ameen-ad-hook-money` | 1080×1920 | Hook variant B: the money counter.         |
| `ameen-ad-hook-chaos` | 1080×1920 | Hook variant C: three phones at once.      |

```bash
cd packages/example
bun run dev                                    # preview in the Studio
bunx remotion render ameen-ad-vertical ../../out/ameen-9x16.mp4
```

## Structure

```
AmeenAd/
  index.tsx            parent — chains the six Sequences, owns the props schema
  theme.ts             palette, shot boundaries, beat grid
  components/          Ameen, ChatBubble, PopCard, StatBlock, CTACard, Phone, glyphs
  hooks/               usePop (one spring curve), useAdLayout (9:16 vs 1:1), useArabicFont
  scenes/              S1–S6, plus the two alternate hooks
```

## The three seams you will actually touch

**Beat sync.** `BEATS` in `theme.ts` is a hardcoded 120 BPM grid anchored on the
frame the music enters. Replace it wholesale with the real beat frames of the
licensed track; every `PopCard` entry in S4 is driven off `CARD_BEATS`, which
indexes into it. Cards landing off-beat is the single thing that will make this
look amateur.

**Voiceover.** Six separate Hadra renders, one per shot, so you can retime
without regenerating. Drop them in `packages/example/public/` and pass the
filenames through the `voiceover` prop — `hook`, `cost`, `enter`, `montage`,
`proof`, `cta`. Any left `null` simply renders silent. Leave ~200ms of silence
at the head and tail of each render for trim room. Direction, per shot: S1
almost a whisper; S2 flat and matter of fact; S3 the lift; S4 brisk and
listing; S5 warm; S6 slow and spaced.

Music is wired the same way and enters at `MUSIC_IN_FRAME` — never under S1.
The silence after the buzz is the scroll-stopper.

**Personalisation.** `productName`, `price`, `whatsappHandle` and
`endCardPrice` are props. Render a personalised cut per prospect with their own
product on the S4 card and you are showing a wholesaler an ad with _their_
stock in it.

`endCardPrice` is `null` by default: at 30 seconds you are buying a click, not
a decision, so the monthly price belongs in the first automated WhatsApp reply
— they message the ad, Ameen answers instantly with the price, and the ad
demonstrates itself. Set it to run the price-transparency A/B against the
default.

## House rules the components enforce

- **Ameen never slides, he pops.** Every entrance goes through `usePop`, one
  spring tuned so its overshoot peaks at exactly the 0.8 → 1.04 → 1.0 in the
  character spec. Cards slide. That contrast is what makes him read as alive.
- **Flat 2D vector, no gradients** except the one soft glow on Ameen
  (`ameen-glow`).
- **Alert red appears exactly once** in the whole ad, on the lost customer in
  S2.
- **`02:14` is set in S1 and paid off in S4.** That callback is the ad; if you
  cut anything from the montage, do not cut the first card.
