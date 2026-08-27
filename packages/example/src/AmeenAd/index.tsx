import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {z} from 'zod';
import {S1Hook} from './scenes/S1Hook';
import {S1HookChaos} from './scenes/S1HookChaos';
import {S1HookMoney} from './scenes/S1HookMoney';
import {S2Cost} from './scenes/S2Cost';
import {S3EnterAmeen} from './scenes/S3EnterAmeen';
import {S4Montage} from './scenes/S4Montage';
import {S5Proof} from './scenes/S5Proof';
import {S6Cta} from './scenes/S6Cta';
import {DURATION_IN_FRAMES, FPS, MUSIC_IN_FRAME, SHOTS} from './theme';

export const AMEEN_AD_FPS = FPS;
export const AMEEN_AD_DURATION_IN_FRAMES = DURATION_IN_FRAMES;

/**
 * Everything a render needs to be personalised. Point this at a prospect's
 * product name, price and handle and you have a 30s ad with *their* stock in
 * it — a closing tool, not a marketing asset.
 */
export const ameenAdSchema = z.object({
	productName: z.string(),
	/** Shown on the product card in S4. */
	price: z.string(),
	whatsappHandle: z.string(),
	/**
	 * Same body, swap only the hook. Run all three, kill the losers after 48h.
	 * `guilt` is the 2am unanswered message, `money` the ticking counter,
	 * `chaos` the three phones at once.
	 */
	hookVariant: z.enum(['guilt', 'money', 'chaos']),
	/**
	 * Hold the monthly price out of the 30s cut by default — the first
	 * automated WhatsApp reply is a better place for it, and quoting it there
	 * proves the product. Flip this on for the price-transparency A/B.
	 */
	endCardPrice: z.string().nullable(),
	/**
	 * Six separate Hadra renders, one per shot, so you can retime without
	 * regenerating. Paths are resolved with `staticFile`; leave any of them
	 * null to preview the cut silently.
	 */
	voiceover: z.object({
		hook: z.string().nullable(),
		cost: z.string().nullable(),
		enter: z.string().nullable(),
		montage: z.string().nullable(),
		proof: z.string().nullable(),
		cta: z.string().nullable(),
	}),
	/** Music enters on the cut to daylight, never under the hook. */
	music: z.string().nullable(),
});

export type AmeenAdProps = z.infer<typeof ameenAdSchema>;

export const ameenAdDefaultProps: AmeenAdProps = {
	productName: 'قميص رجالي',
	price: '4.500 دج',
	whatsappHandle: '+213 555 00 00 00',
	hookVariant: 'guilt',
	endCardPrice: null,
	voiceover: {
		hook: null,
		cost: null,
		enter: null,
		montage: null,
		proof: null,
		cta: null,
	},
	music: null,
};

/**
 * Renders an `<Audio>` only when a file was supplied, so the composition
 * previews and renders cleanly before the VO exists.
 */
const OptionalAudio: React.FC<{src: string | null; volume?: number}> = ({
	src,
	volume = 1,
}) => {
	if (src === null) {
		return null;
	}

	return <Audio src={staticFile(src)} volume={volume} />;
};

const Hook: React.FC<{variant: AmeenAdProps['hookVariant']}> = ({variant}) => {
	if (variant === 'money') {
		return <S1HookMoney />;
	}

	if (variant === 'chaos') {
		return <S1HookChaos />;
	}

	return <S1Hook />;
};

/**
 * أمين — البياع لي ما يرقدش
 * 30s Facebook / Instagram ad, six shots, 9:16 with a 1:1 feed cutdown.
 */
export const AmeenAd: React.FC<AmeenAdProps> = ({
	productName,
	price,
	whatsappHandle,
	hookVariant,
	endCardPrice,
	voiceover,
	music,
}) => {
	return (
		<AbsoluteFill>
			<Sequence name="S1 · hook" {...SHOTS.hook}>
				<Hook variant={hookVariant} />
				<OptionalAudio src={voiceover.hook} />
			</Sequence>

			<Sequence name="S2 · cost" {...SHOTS.cost}>
				<S2Cost />
				<OptionalAudio src={voiceover.cost} />
			</Sequence>

			<Sequence name="S3 · enter Ameen" {...SHOTS.enter}>
				<S3EnterAmeen />
				<OptionalAudio src={voiceover.enter} />
			</Sequence>

			<Sequence name="S4 · popup montage" {...SHOTS.montage}>
				<S4Montage productName={productName} price={price} />
				<OptionalAudio src={voiceover.montage} />
			</Sequence>

			<Sequence name="S5 · proof" {...SHOTS.proof}>
				<S5Proof />
				<OptionalAudio src={voiceover.proof} />
			</Sequence>

			<Sequence name="S6 · CTA" {...SHOTS.cta}>
				<S6Cta whatsappHandle={whatsappHandle} price={endCardPrice} />
				<OptionalAudio src={voiceover.cta} />
			</Sequence>

			<Sequence name="music" from={MUSIC_IN_FRAME}>
				<OptionalAudio src={music} volume={0.35} />
			</Sequence>
		</AbsoluteFill>
	);
};
