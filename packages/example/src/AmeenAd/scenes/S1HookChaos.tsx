import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
	InstagramGlyph,
	MessengerGlyph,
	WhatsappGlyph,
} from '../components/Glyphs';
import {Phone} from '../components/Phone';
import {RTL} from '../hooks/useArabicFont';
import {COLORS} from '../theme';

const PHONES = [
	{x: -300, rotate: -9, buzzAt: 6, glyph: <WhatsappGlyph />},
	{x: 0, rotate: 3, buzzAt: 16, glyph: <InstagramGlyph />},
	{x: 300, rotate: 11, buzzAt: 26, glyph: <MessengerGlyph />},
];

const BuzzingPhone: React.FC<{
	x: number;
	rotate: number;
	buzzAt: number;
	glyph: React.ReactNode;
}> = ({x, rotate, buzzAt, glyph}) => {
	const frame = useCurrentFrame();

	/** Once it starts buzzing it never stops — that is the point of the shot. */
	const buzzing = frame >= buzzAt;
	const shake = buzzing ? Math.sin(frame * 3.1 + x) * 6 : 0;

	return (
		<div
			style={{
				position: 'absolute',
				left: `calc(50% + ${x + shake}px)`,
				top: '50%',
				transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(0.42)`,
			}}
		>
			<Phone night dim={buzzing ? 0 : 0.6} tilt={0}>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transform: 'scale(2.4)',
						opacity: interpolate(frame, [buzzAt, buzzAt + 8], [0, 1], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					{glyph}
				</div>
			</Phone>
		</div>
	);
};

/**
 * Hook variant C / RELATABLE CHAOS.
 * Three phones buzzing at once, one pair of hands, cannot keep up.
 * VO: واتساب، انستغرام، ماسنجر... و انت وحدك.
 */
export const S1HookChaos: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.nightInk}}>
			{PHONES.map((phone) => (
				<BuzzingPhone key={phone.x} {...phone} />
			))}

			<AbsoluteFill
				style={{
					...RTL,
					alignItems: 'center',
					justifyContent: 'flex-end',
					paddingBottom: '14%',
				}}
			>
				<div
					style={{
						color: COLORS.sandText,
						fontSize: 56,
						fontWeight: 900,
						textAlign: 'center',
						opacity: interpolate(frame, [34, 46], [0, 1], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					واتساب، انستغرام، ماسنجر...
					<br />و انت وحدك
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
