import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {RTL} from '../hooks/useArabicFont';
import {getPop} from '../hooks/usePop';
import {COLORS} from '../theme';

/** A number that counts up, and the Darija line that explains it. */
export const StatBlock: React.FC<{
	delay: number;
	value: number;
	/** Rendered after the number, in the same weight — e.g. `/7`. */
	suffix?: string;
	label: string;
}> = ({delay, value, suffix = '', label}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = frame - delay;

	const counted = Math.round(
		interpolate(local, [0, 20], [0, value], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.out(Easing.cubic),
		}),
	);

	return (
		<div
			style={{
				...RTL,
				transform: `scale(${getPop({frame: local, fps})})`,
				opacity: interpolate(local, [0, 6], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				}),
				backgroundColor: COLORS.nightSurface,
				border: `2px solid ${COLORS.nightStroke}`,
				borderRadius: 32,
				padding: '26px 20px',
				width: 300,
				textAlign: 'center',
			}}
		>
			<div
				style={{
					direction: 'ltr',
					color: COLORS.signalGreen,
					fontSize: 84,
					fontWeight: 900,
					lineHeight: 1.1,
				}}
			>
				{counted}
				{suffix}
			</div>
			<div
				style={{
					color: COLORS.sandText,
					fontSize: 30,
					fontWeight: 600,
					opacity: 0.85,
					marginTop: 8,
					lineHeight: 1.35,
				}}
			>
				{label}
			</div>
		</div>
	);
};
