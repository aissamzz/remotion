import React from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Ameen} from '../components/Ameen';
import {useAdLayout} from '../hooks/useAdLayout';
import {RTL} from '../hooks/useArabicFont';
import {usePop} from '../hooks/usePop';
import {COLORS} from '../theme';

const WIPE_IN = 14;
const WIPE_OUT = 30;
const AMEEN_IN = 24;

const AmeenEntrance: React.FC = () => {
	const frame = useCurrentFrame();
	const layout = useAdLayout();
	const scale = usePop();

	return (
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
			<div style={{transform: `scale(${scale})`}}>
				<Ameen
					hands="wave"
					expression="neutral"
					glow={interpolate(frame, [0, 20], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					chipOpacity={interpolate(frame, [18, 34], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					scale={0.9 * layout.cardScale}
				/>
			</div>
		</AbsoluteFill>
	);
};

const Tagline: React.FC<{bottom: number}> = ({bottom}) => {
	const scale = usePop();

	return (
		<AbsoluteFill
			style={{
				...RTL,
				alignItems: 'center',
				justifyContent: 'flex-end',
				paddingBottom: bottom,
			}}
		>
			<div
				style={{
					color: COLORS.deepTeal,
					fontSize: 62,
					fontWeight: 900,
					transform: `scale(${scale})`,
				}}
			>
				أمين ما يرقدش
			</div>
		</AbsoluteFill>
	);
};

/**
 * S3 / 0:08–0:11 / ENTER AMEEN
 * VO: أمين ما يرقدش.
 * SFX: soft rising chime. This is the audio signature — reuse it on every
 * Ameen asset forever.
 */
export const S3EnterAmeen: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	/** The wipe sweeps in from the right, then carries the competitor off left. */
	const wipeX =
		frame < WIPE_IN
			? interpolate(frame, [0, WIPE_IN], [width, 0], {
					extrapolateLeft: 'clamp',
					easing: Easing.bezier(0.3, 0, 0.2, 1),
				})
			: interpolate(frame, [WIPE_IN, WIPE_OUT], [0, -width], {
					extrapolateRight: 'clamp',
					easing: Easing.bezier(0.6, 0, 0.2, 1),
				});

	const competitorX = interpolate(frame, [0, WIPE_IN], [0, -width], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.3, 0, 0.2, 1),
	});

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.warmSand}}>
			{/* The competitor storefront that ended S2, now being shoved out. */}
			{frame < WIPE_IN ? (
				<AbsoluteFill
					style={{
						...RTL,
						transform: `translateX(${competitorX}px)`,
						backgroundColor: COLORS.deepTeal,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							color: COLORS.sandText,
							fontSize: 56,
							fontWeight: 900,
						}}
					>
						شرا من عند واحد آخر
					</div>
				</AbsoluteFill>
			) : null}

			<Sequence from={AMEEN_IN}>
				<AmeenEntrance />
			</Sequence>

			<Sequence from={WIPE_OUT + 6}>
				<Tagline bottom={height * 0.12} />
			</Sequence>

			<AbsoluteFill
				style={{
					transform: `translateX(${wipeX}px)`,
					backgroundColor: COLORS.signalGreen,
				}}
			/>
		</AbsoluteFill>
	);
};
