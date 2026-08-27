import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {Ameen} from '../components/Ameen';
import {
	CalendarGlyph,
	CheckGlyph,
	InstagramGlyph,
	MessengerGlyph,
	TagGlyph,
	WhatsappGlyph,
} from '../components/Glyphs';
import {
	CalendarCard,
	ChannelCard,
	OrderConfirmedCard,
	ProductCard,
	WhatsappReplyCard,
} from '../components/MontageCards';
import {DEFAULT_HOLD, PopCard} from '../components/PopCard';
import {useAdLayout} from '../hooks/useAdLayout';
import {CARD_BEATS, COLORS, SHOTS} from '../theme';

/**
 * Where each card plays and where its icon ends up. Orbit slots deliberately
 * clear Ameen's head; park slots line the two vertical edges so they fill up in
 * a readable order.
 */
export const PARK_SLOTS = [
	{x: -430, y: -430},
	{x: -430, y: -160},
	{x: -430, y: 110},
	{x: 430, y: -430},
	{x: 430, y: -160},
	{x: 430, y: 110},
];

const ORBIT_SLOTS = [
	{x: 0, y: -520},
	{x: -310, y: -190},
	{x: 310, y: -230},
	{x: -310, y: 130},
	{x: 310, y: 150},
	{x: 0, y: 470},
];

/** Beats are relative to the composition; the montage sequence starts later. */
const beatWithin = (beat: number) => beat - SHOTS.montage.from;

/**
 * S4 / 0:11–0:21 / THE POPUP MONTAGE
 * VO: يجاوب في واتساب، انستغرام، و ماسنجر. بالدارجة، في ثانية.
 *     يعرف سلعتك، يعرف الأثمنة، و يحجزلك الموعد.
 * SFX: one clean snap per card, landing on the beat.
 */
export const S4Montage: React.FC<{
	productName: string;
	price: string;
}> = ({productName, price}) => {
	const frame = useCurrentFrame();
	const layout = useAdLayout();

	/** He answers as the cards land, so the mouth curve tracks the montage. */
	const answering = CARD_BEATS.some((beat) => {
		const local = frame - beatWithin(beat);

		return local >= 0 && local < DEFAULT_HOLD;
	});

	const cards = [
		{
			name: 'WhatsApp reply · the 02:14 callback',
			orbit: ORBIT_SLOTS[0],
			hold: 48,
			icon: <WhatsappGlyph />,
			content: <WhatsappReplyCard />,
		},
		{
			name: 'Instagram DM',
			orbit: ORBIT_SLOTS[1],
			hold: DEFAULT_HOLD,
			icon: <InstagramGlyph />,
			content: (
				<ChannelCard
					glyph={<InstagramGlyph />}
					name="Instagram"
					line="يجاوب في الرسائل"
				/>
			),
		},
		{
			name: 'Messenger',
			orbit: ORBIT_SLOTS[2],
			hold: DEFAULT_HOLD,
			icon: <MessengerGlyph />,
			content: (
				<ChannelCard
					glyph={<MessengerGlyph />}
					name="Messenger"
					line="بالدارجة، في ثانية"
				/>
			),
		},
		{
			name: 'Product card',
			orbit: ORBIT_SLOTS[3],
			hold: DEFAULT_HOLD,
			icon: <TagGlyph />,
			content: <ProductCard productName={productName} price={price} />,
		},
		{
			name: 'Calendar slot',
			orbit: ORBIT_SLOTS[4],
			hold: DEFAULT_HOLD,
			icon: <CalendarGlyph />,
			content: <CalendarCard />,
		},
		{
			name: 'Order confirmed',
			orbit: ORBIT_SLOTS[5],
			hold: DEFAULT_HOLD,
			icon: <CheckGlyph />,
			content: <OrderConfirmedCard />,
		},
	];

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.warmSand}}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<Ameen
					hands={answering ? 'point' : 'idle'}
					expression={answering ? 'answering' : 'neutral'}
					glow={interpolate(frame, [0, 12], [1, 0.8], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					scale={0.72 * layout.cardScale}
				/>
			</AbsoluteFill>

			{cards.map((card, i) => (
				<Sequence
					key={card.name}
					name={card.name}
					from={beatWithin(CARD_BEATS[i])}
					layout="none"
				>
					<PopCard
						layout={layout}
						holdInFrames={card.hold}
						orbit={card.orbit}
						park={PARK_SLOTS[i]}
						icon={card.icon}
					>
						{card.content}
					</PopCard>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
