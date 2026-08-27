import React from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {ChatBubble} from '../components/ChatBubble';
import {Phone} from '../components/Phone';
import {RTL} from '../hooks/useArabicFont';
import {getPop} from '../hooks/usePop';
import {CALLBACK_TIMESTAMP, COLORS} from '../theme';
import {HOOK_MESSAGES} from './S1Hook';

/** Frame (within S2) of the hard cut from night to daylight. */
const DAYLIGHT_CUT = 54;
const FALL_FRAMES = [8, 18, 28];

const FallingBubble: React.FC<{
	text: string;
	index: number;
	height: number;
}> = ({text, index, height}) => {
	const frame = useCurrentFrame();
	const fallAt = FALL_FRAMES[index];
	const local = Math.max(0, frame - fallAt);

	/** Gravity, not an ease — the messages have to land with weight. */
	const fall = interpolate(local, [0, 26], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.quad),
	});

	/** They desaturate before they drop. */
	const grey = interpolate(frame, [0, 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				transform: `translateY(${fall * height}px) rotate(${fall * (index % 2 === 0 ? 5 : -6)}deg)`,
				opacity: 1 - grey * 0.35,
			}}
		>
			<ChatBubble
				side="incoming"
				text={text}
				timestamp={CALLBACK_TIMESTAMP}
				width={620}
				state={grey > 0.5 ? 'grey' : 'sent'}
				night
			/>
		</div>
	);
};

const LostCustomerBadge: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<div
			style={{
				...RTL,
				transform: `scale(${getPop({frame, fps})})`,
				display: 'flex',
				alignItems: 'center',
				gap: 16,
				backgroundColor: COLORS.alertRed,
				color: COLORS.sandText,
				fontSize: 64,
				fontWeight: 900,
				padding: '14px 44px',
				borderRadius: 999,
			}}
		>
			<span style={{direction: 'ltr'}}>-1</span>
			<span style={{fontSize: 36, opacity: 0.9}}>كليان</span>
		</div>
	);
};

/** The shop that was awake at 2am. */
const CompetitorCard: React.FC<{width: number}> = ({width}) => {
	const frame = useCurrentFrame();

	const slide = interpolate(frame, [0, 26], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.22, 1, 0.36, 1),
	});

	return (
		<AbsoluteFill
			style={{
				...RTL,
				transform: `translateX(${slide * width}px)`,
				backgroundColor: COLORS.deepTeal,
				alignItems: 'center',
				justifyContent: 'center',
				gap: 34,
				padding: 80,
			}}
		>
			<div
				style={{
					width: 300,
					height: 300,
					borderRadius: 60,
					backgroundColor: COLORS.warmSand,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<svg viewBox="0 0 64 64" width={170} height={170}>
					<path d="M12 26h40l-4-12H16l-4 12Z" fill={COLORS.deepTeal} />
					<rect
						x={14}
						y={26}
						width={36}
						height={26}
						rx={4}
						fill="none"
						stroke={COLORS.deepTeal}
						strokeWidth={5}
					/>
					<rect x={26} y={36} width={12} height={16} fill={COLORS.deepTeal} />
				</svg>
			</div>
			<div
				style={{
					color: COLORS.sandText,
					fontSize: 56,
					fontWeight: 900,
					textAlign: 'center',
					lineHeight: 1.35,
				}}
			>
				شرا من عند واحد آخر
			</div>
			<div
				style={{
					color: COLORS.signalGreen,
					fontSize: 34,
					fontWeight: 700,
					opacity: 0.9,
				}}
			>
				واحد جاوبو
			</div>
		</AbsoluteFill>
	);
};

/**
 * S2 / 0:03–0:08 / THE COST
 * VO: الصباح، راح يشري من عند واحد آخر.
 * SFX: a muffled thud per falling bubble. Music enters on the cut to daylight.
 */
export const S2Cost: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	const isNight = frame < DAYLIGHT_CUT;

	/**
	 * S1 handed us a screen dimmed to sleep. Bring it part-way back so the
	 * messages are readable as they go grey and drop — that beat is the cost.
	 */
	const dim = interpolate(frame, [0, 8], [0.72, 0.18], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: isNight ? COLORS.nightInk : COLORS.warmSand,
			}}
		>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<Phone night={isNight} dim={isNight ? dim : 0}>
					{isNight ? (
						<div
							style={{
								position: 'absolute',
								inset: 0,
								padding: '90px 60px',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'flex-end',
								gap: 20,
								overflow: 'hidden',
							}}
						>
							{HOOK_MESSAGES.map((text, i) => (
								<FallingBubble
									key={text}
									text={text}
									index={i}
									height={height}
								/>
							))}
						</div>
					) : (
						<div
							style={{
								...RTL,
								position: 'absolute',
								inset: 0,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 24,
								color: COLORS.deepTeal,
							}}
						>
							<div style={{fontSize: 44, fontWeight: 700, opacity: 0.55}}>
								الصباح
							</div>
							<div style={{fontSize: 64, fontWeight: 900}}>0 جواب</div>
						</div>
					)}
				</Phone>
			</AbsoluteFill>

			{/* Alert red appears exactly once in the whole ad. Here. */}
			<Sequence from={DAYLIGHT_CUT + 12}>
				<AbsoluteFill
					style={{
						alignItems: 'center',
						justifyContent: 'flex-start',
						paddingTop: height * 0.16,
					}}
				>
					<LostCustomerBadge />
				</AbsoluteFill>
			</Sequence>

			<Sequence from={DAYLIGHT_CUT + 50}>
				<CompetitorCard width={width} />
			</Sequence>
		</AbsoluteFill>
	);
};
