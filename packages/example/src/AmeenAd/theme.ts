/**
 * Ameen Bot — 30s Facebook / Instagram ad.
 * Concept: البياع لي ما يرقدش (the seller who doesn't sleep).
 *
 * Single source of truth for palette, shot boundaries and the beat grid.
 * Everything that animates reads its timing from here so a music swap is a
 * one-file change.
 */

export const COLORS = {
	/** Base — Ameen's body. */
	deepTeal: '#0F4C4A',
	/** Ameen's active state, the reply glow, the CTA button. */
	signalGreen: '#1FD07A',
	/** Background in the day scenes. */
	warmSand: '#F5E6C8',
	/** Background in the 2am scenes. */
	nightInk: '#0A0E14',
	/** Used exactly once, on the lost customer. */
	alertRed: '#E5484D',
	/** Support tones derived from the five above, never a sixth hue. */
	nightSurface: '#151B24',
	nightStroke: '#232C38',
	sandSurface: '#FFFFFF',
	sandStroke: '#E2D2B4',
	greyedOut: '#3B434E',
	inkText: '#0A0E14',
	sandText: '#F5E6C8',
} as const;

export const FPS = 30;
export const DURATION_IN_FRAMES = 900;

export type ShotName = 'hook' | 'cost' | 'enter' | 'montage' | 'proof' | 'cta';

export const SHOTS: Record<ShotName, {from: number; durationInFrames: number}> =
	{
		/** S1 / 0:00–0:03 / HOOK */
		hook: {from: 0, durationInFrames: 90},
		/** S2 / 0:03–0:08 / THE COST */
		cost: {from: 90, durationInFrames: 150},
		/** S3 / 0:08–0:11 / ENTER AMEEN */
		enter: {from: 240, durationInFrames: 90},
		/** S4 / 0:11–0:21 / THE POPUP MONTAGE */
		montage: {from: 330, durationInFrames: 300},
		/** S5 / 0:21–0:25 / PROOF */
		proof: {from: 630, durationInFrames: 120},
		/** S6 / 0:25–0:30 / CTA */
		cta: {from: 750, durationInFrames: 150},
	};

/**
 * Music enters on the cut to daylight, never under S1 — the silence after the
 * buzz is the scroll-stopper.
 */
export const MUSIC_IN_FRAME = 150;

/**
 * Beat grid of the temp track: 120 BPM, first downbeat on MUSIC_IN_FRAME.
 * Replace this array wholesale with the real beat frames of the licensed track
 * — every card entry is driven off it, and cards landing off-beat is the single
 * thing that will make this look amateur.
 */
export const BEATS = [
	150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360,
	375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585,
	600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810,
	825, 840, 855, 870, 885,
];

/** The six popups of S4 land on every third beat. */
export const CARD_BEATS = [12, 15, 18, 21, 24, 27].map((i) => BEATS[i]);

/** The 2am timestamp. Set in S1, paid off in S4 — that callback is the ad. */
export const CALLBACK_TIMESTAMP = '02:14';
