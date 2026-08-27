import React, {useMemo} from 'react';
import {interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {RTL} from '../hooks/useArabicFont';
import {COLORS} from '../theme';

export type AmeenExpression = 'neutral' | 'answering' | 'eyebrow';
export type AmeenHands = 'idle' | 'wave' | 'point' | 'thumbsUp';

const VIEWBOX_WIDTH = 400;
const VIEWBOX_HEIGHT = 520;

/**
 * The viewBox is drawn at a comfortable size for editing; on a 1080-wide stage
 * he has to be a hero, so `scale={1}` means 640px across, not 400.
 */
const BASE_SCALE = 1.6;

const EYE_RADIUS = 13;
const BLINK_DURATION = 5;

/**
 * Blink every 3 to 4s, randomised — but deterministically, so a render on
 * Lambda and a render on the laptop produce the same frames.
 */
const getBlinkFrames = (fps: number, durationInFrames: number) => {
	const frames: number[] = [];
	let at = fps * 1.4;
	let i = 0;

	while (at < durationInFrames) {
		frames.push(Math.round(at));
		at += (3 + random(`ameen-blink-${i}`)) * fps;
		i++;
	}

	return frames;
};

const useEyeOpenness = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const blinkFrames = useMemo(
		() => getBlinkFrames(fps, durationInFrames),
		[fps, durationInFrames],
	);

	return blinkFrames.reduce((openness, blinkFrame) => {
		const closed = interpolate(
			frame,
			[
				blinkFrame,
				blinkFrame + BLINK_DURATION / 2,
				blinkFrame + BLINK_DURATION,
			],
			[1, 0.06, 1],
			{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
		);

		return Math.min(openness, closed);
	}, 1);
};

const HAND_POSITIONS: Record<
	AmeenHands,
	{
		left: {x: number; y: number; rotate: number};
		right: {x: number; y: number; rotate: number};
	}
> = {
	idle: {left: {x: 108, y: 336, rotate: 0}, right: {x: 292, y: 336, rotate: 0}},
	wave: {
		left: {x: 104, y: 344, rotate: 0},
		right: {x: 312, y: 236, rotate: 24},
	},
	point: {
		left: {x: 108, y: 344, rotate: 0},
		right: {x: 320, y: 300, rotate: -18},
	},
	thumbsUp: {
		left: {x: 104, y: 348, rotate: 0},
		right: {x: 330, y: 302, rotate: -10},
	},
};

const Hand: React.FC<{
	x: number;
	y: number;
	rotate: number;
	thumb: boolean;
}> = ({x, y, rotate, thumb}) => {
	return (
		<g transform={`translate(${x} ${y}) rotate(${rotate})`}>
			<rect
				x={-30}
				y={-20}
				width={58}
				height={46}
				rx={20}
				fill={COLORS.warmSand}
			/>
			{/* The thumb runs well clear of the fist and leans outward, so the
			    silhouette reads as a thumbs up at feed size. */}
			{thumb ? (
				<>
					<rect
						x={2}
						y={-58}
						width={24}
						height={46}
						rx={12}
						fill={COLORS.warmSand}
						transform="rotate(14 14 -35)"
					/>
					<path
						d="M-16 0 H4 M-16 14 H2"
						stroke={COLORS.deepTeal}
						strokeWidth={4}
						strokeLinecap="round"
						opacity={0.3}
					/>
				</>
			) : null}
		</g>
	);
};

export const Ameen: React.FC<{
	expression?: AmeenExpression;
	hands?: AmeenHands;
	/** 0 to 1 — the one soft gradient in the whole ad. */
	glow?: number;
	/** Set to false when another component owns the vertical motion. */
	bob?: boolean;
	scale?: number;
	showChip?: boolean;
	chipOpacity?: number;
}> = ({
	expression = 'neutral',
	hands = 'idle',
	glow = 0.55,
	bob = true,
	scale = 1,
	showChip = true,
	chipOpacity = 1,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const eyeOpenness = useEyeOpenness();
	const size = scale * BASE_SCALE;

	/** 2px idle bob. He floats — he has no legs. */
	const bobOffset = bob ? Math.sin((frame / fps) * Math.PI * 1.1) * 2 : 0;

	const waveAngle =
		hands === 'wave' ? Math.sin((frame / fps) * Math.PI * 5) * 18 : 0;

	const handPositions = HAND_POSITIONS[hands];

	const eyebrowLift = expression === 'eyebrow' ? 1 : 0;
	const mouth =
		expression === 'answering'
			? 'M162 168 Q200 198 238 168'
			: 'M164 174 L236 174';

	return (
		<div
			style={{
				position: 'relative',
				width: VIEWBOX_WIDTH * size,
				height: VIEWBOX_HEIGHT * size,
				transform: `translateY(${bobOffset}px)`,
			}}
		>
			<svg
				viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
				width={VIEWBOX_WIDTH * size}
				height={VIEWBOX_HEIGHT * size}
				style={{display: 'block', overflow: 'visible'}}
			>
				<defs>
					<radialGradient id="ameen-glow">
						<stop
							offset="0%"
							stopColor={COLORS.signalGreen}
							stopOpacity={0.55 * glow}
						/>
						<stop
							offset="55%"
							stopColor={COLORS.signalGreen}
							stopOpacity={0.16 * glow}
						/>
						<stop
							offset="100%"
							stopColor={COLORS.signalGreen}
							stopOpacity={0}
						/>
					</radialGradient>
				</defs>

				{glow > 0 ? (
					<circle cx={200} cy={190} r={260} fill="url(#ameen-glow)" />
				) : null}

				{/* Torso. Collar suggested with two strokes, no legs. */}
				<rect
					x={126}
					y={272}
					width={148}
					height={128}
					rx={40}
					fill={COLORS.deepTeal}
				/>
				<path
					d="M166 272 L200 306 L234 272"
					fill="none"
					stroke={COLORS.warmSand}
					strokeWidth={7}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>

				{/* Head: a rounded square that reads as a chat bubble and a face at
				    the same time. Radius is 30% of its width. */}
				<path d="M118 252 L96 292 L160 250 Z" fill={COLORS.deepTeal} />
				<rect
					x={100}
					y={44}
					width={200}
					height={212}
					rx={60}
					fill={COLORS.deepTeal}
				/>

				{/* One eyebrow raise is his only expression beat. */}
				<path
					d={`M218 ${100 - eyebrowLift * 14} L254 ${96 - eyebrowLift * 20}`}
					fill="none"
					stroke={COLORS.warmSand}
					strokeWidth={7}
					strokeLinecap="round"
					opacity={eyebrowLift}
				/>

				<ellipse
					cx={164}
					cy={132}
					rx={EYE_RADIUS}
					ry={EYE_RADIUS * eyeOpenness}
					fill={COLORS.warmSand}
				/>
				<ellipse
					cx={236}
					cy={132}
					rx={EYE_RADIUS}
					ry={EYE_RADIUS * eyeOpenness}
					fill={COLORS.warmSand}
				/>

				{/* Mouth: a single stroke. Neutral line at rest, small upward curve
				    when he answers. */}
				<path
					d={mouth}
					fill="none"
					stroke={COLORS.signalGreen}
					strokeWidth={8}
					strokeLinecap="round"
				/>

				{/* Detached hands are far cheaper to animate than arms. */}
				<Hand
					x={handPositions.left.x}
					y={handPositions.left.y}
					rotate={handPositions.left.rotate}
					thumb={false}
				/>
				<g
					transform={`rotate(${waveAngle} ${handPositions.right.x} ${handPositions.right.y + 30})`}
				>
					<Hand
						x={handPositions.right.x}
						y={handPositions.right.y}
						rotate={handPositions.right.rotate}
						thumb={hands === 'thumbsUp'}
					/>
				</g>
			</svg>

			{/* The branding anchor. Always visible. */}
			{showChip ? (
				<div
					style={{
						...RTL,
						position: 'absolute',
						left: 0,
						width: VIEWBOX_WIDTH * size,
						top: (VIEWBOX_HEIGHT - 96) * size,
						display: 'flex',
						justifyContent: 'center',
						opacity: chipOpacity,
					}}
				>
					<div
						style={{
							backgroundColor: COLORS.signalGreen,
							color: COLORS.inkText,
							fontSize: 44 * size,
							fontWeight: 900,
							padding: `${6 * size}px ${34 * size}px`,
							borderRadius: 999,
							lineHeight: 1.5,
						}}
					>
						أمين
					</div>
				</div>
			) : null}
		</div>
	);
};
