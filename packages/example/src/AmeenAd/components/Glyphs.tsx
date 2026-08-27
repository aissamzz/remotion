import React from 'react';
import {COLORS} from '../theme';

/**
 * Flat 2D vector channel marks, drawn rather than imported so the whole ad is
 * one palette and one stroke weight. Deliberately generic silhouettes.
 */
const Badge: React.FC<{children: React.ReactNode; background?: string}> = ({
	children,
	background = COLORS.signalGreen,
}) => {
	return (
		<div
			style={{
				width: 116,
				height: 116,
				borderRadius: 34,
				backgroundColor: background,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{children}
		</div>
	);
};

export const WhatsappGlyph: React.FC = () => {
	return (
		<Badge>
			<svg viewBox="0 0 64 64" width={68} height={68}>
				<path
					d="M32 10c-12 0-22 9.4-22 21 0 3.9 1.2 7.6 3.2 10.7L10 54l12.9-3.2c2.8 1.4 6 2.2 9.1 2.2 12 0 22-9.4 22-21S44 10 32 10Z"
					fill={COLORS.nightInk}
				/>
				<path
					d="M24 24c1-2 2-2 3-2 1.4 0 1.7.6 2.3 2 .5 1.2 1 2.6.4 3.3-.6.8-1.4 1.2-.8 2.3 1.4 2.6 3.6 4.6 6.4 5.8 1.1.5 1.6-.3 2.4-.9.8-.6 2.1 0 3.3.6 1.4.7 2 1 2 2.4 0 1.2-.8 2.5-2.6 3.1-3.2 1-8.4-1.4-12-5-3.6-3.6-5.9-8.8-4.4-11.6Z"
					fill={COLORS.signalGreen}
				/>
			</svg>
		</Badge>
	);
};

export const InstagramGlyph: React.FC = () => {
	return (
		<Badge background={COLORS.deepTeal}>
			<svg viewBox="0 0 64 64" width={64} height={64}>
				<rect
					x={12}
					y={12}
					width={40}
					height={40}
					rx={13}
					fill="none"
					stroke={COLORS.warmSand}
					strokeWidth={5}
				/>
				<circle
					cx={32}
					cy={32}
					r={10}
					fill="none"
					stroke={COLORS.warmSand}
					strokeWidth={5}
				/>
				<circle cx={44} cy={20} r={3.5} fill={COLORS.signalGreen} />
			</svg>
		</Badge>
	);
};

export const MessengerGlyph: React.FC = () => {
	return (
		<Badge background={COLORS.deepTeal}>
			<svg viewBox="0 0 64 64" width={64} height={64}>
				<path
					d="M32 10c-12.2 0-22 9-22 20.2 0 6.4 3.2 12.1 8.2 15.8V56l7.5-4.1c2 .6 4.1.9 6.3.9 12.2 0 22-9 22-20.2S44.2 10 32 10Z"
					fill={COLORS.warmSand}
				/>
				<path
					d="M19 38.5 30 27l6 6.2L45 26l-11 11.6-6-6.2-9 7.1Z"
					fill={COLORS.deepTeal}
				/>
			</svg>
		</Badge>
	);
};

export const TagGlyph: React.FC = () => {
	return (
		<Badge background={COLORS.deepTeal}>
			<svg viewBox="0 0 64 64" width={62} height={62}>
				<path
					d="M32 12H14a2 2 0 0 0-2 2v18l20 20 20-20-20-20Z"
					fill="none"
					stroke={COLORS.warmSand}
					strokeWidth={5}
					strokeLinejoin="round"
				/>
				<circle cx={22} cy={22} r={4} fill={COLORS.signalGreen} />
			</svg>
		</Badge>
	);
};

export const CalendarGlyph: React.FC = () => {
	return (
		<Badge background={COLORS.deepTeal}>
			<svg viewBox="0 0 64 64" width={62} height={62}>
				<rect
					x={11}
					y={16}
					width={42}
					height={36}
					rx={8}
					fill="none"
					stroke={COLORS.warmSand}
					strokeWidth={5}
				/>
				<path
					d="M11 28h42"
					stroke={COLORS.warmSand}
					strokeWidth={5}
					strokeLinecap="round"
				/>
				<path
					d="M22 38l6 6 12-12"
					fill="none"
					stroke={COLORS.signalGreen}
					strokeWidth={5}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</Badge>
	);
};

export const CheckGlyph: React.FC = () => {
	return (
		<Badge>
			<svg viewBox="0 0 64 64" width={64} height={64}>
				<path
					d="M16 33l11 11 21-23"
					fill="none"
					stroke={COLORS.nightInk}
					strokeWidth={7}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</Badge>
	);
};
