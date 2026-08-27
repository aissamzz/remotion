import React from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {RTL} from '../hooks/useArabicFont';
import {getPop} from '../hooks/usePop';
import {COLORS} from '../theme';

/** The counter ticks up all night, then snaps to nothing. */
const STEPS = [
	{at: 4, value: 12000},
	{at: 26, value: 27000},
	{at: 48, value: 54000},
];
const SNAP_TO_ZERO = 66;

const formatDinar = (value: number) =>
	`${value.toLocaleString('en-US').replace(/,/g, '.')} دج`;

/**
 * Hook variant B / MONEY.
 * A counter ticking up, then snapping to 0.
 * VO: شحال رحت عليك و انت راقد؟
 */
export const S1HookMoney: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const snapped = frame >= SNAP_TO_ZERO;
	const current = snapped
		? 0
		: STEPS.reduce((value, step) => (frame >= step.at ? step.value : value), 0);

	const lastStep = STEPS.filter((step) => frame >= step.at).pop();
	const stepPop = lastStep
		? getPop({frame: frame - lastStep.at, fps, from: 0.86})
		: 1;
	const snapPop = snapped
		? getPop({frame: frame - SNAP_TO_ZERO, fps, from: 1.5})
		: 1;

	return (
		<AbsoluteFill
			style={{
				...RTL,
				backgroundColor: COLORS.nightInk,
				alignItems: 'center',
				justifyContent: 'center',
				gap: 40,
			}}
		>
			<div
				style={{
					color: COLORS.sandText,
					fontSize: 48,
					fontWeight: 700,
					opacity: 0.5,
				}}
			>
				و انت راقد
			</div>
			<div
				style={{
					direction: 'ltr',
					color: snapped ? COLORS.alertRed : COLORS.signalGreen,
					fontSize: 130,
					fontWeight: 900,
					transform: `scale(${(snapped ? snapPop : stepPop).toFixed(4)})`,
					lineHeight: 1.2,
				}}
			>
				{formatDinar(current)}
			</div>
			<div
				style={{
					color: COLORS.sandText,
					fontSize: 52,
					fontWeight: 900,
					opacity: interpolate(
						frame,
						[SNAP_TO_ZERO, SNAP_TO_ZERO + 10],
						[0, 1],
						{
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
							easing: Easing.out(Easing.cubic),
						},
					),
					textAlign: 'center',
				}}
			>
				شحال رحت عليك و انت راقد؟
			</div>
		</AbsoluteFill>
	);
};
