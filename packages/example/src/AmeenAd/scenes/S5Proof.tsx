import React from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	Sequence,
	useCurrentFrame,
} from 'remotion';
import {Ameen} from '../components/Ameen';
import {
	CalendarGlyph,
	CheckGlyph,
	InstagramGlyph,
	MessengerGlyph,
	TagGlyph,
	WhatsappGlyph,
} from '../components/Glyphs';
import {StatBlock} from '../components/StatBlock';
import {place, useAdLayout} from '../hooks/useAdLayout';
import {COLORS} from '../theme';
import {PARK_SLOTS} from './S4Montage';

const COLLAPSE_FRAMES = 26;
const EYEBROW_FRAME = 34;
/** Where he ends up once the icons have collapsed — S6 springs on from here. */
export const PROOF_AMEEN_OFFSET_Y = -300;

const STATS_IN = 40;
/** Relative to STATS_IN — the three numbers stagger up. */
const STAT_DELAYS = [0, 12, 24];

const ICONS = [
	<WhatsappGlyph key="wa" />,
	<InstagramGlyph key="ig" />,
	<MessengerGlyph key="ms" />,
	<TagGlyph key="tag" />,
	<CalendarGlyph key="cal" />,
	<CheckGlyph key="ok" />,
];

/**
 * The icons that lined the edges through S4 pull back in and collapse into
 * Ameen — everything he does, in one place.
 */
const CollapsingIcons: React.FC = () => {
	const frame = useCurrentFrame();
	const layout = useAdLayout();

	if (frame > COLLAPSE_FRAMES) {
		return null;
	}

	return (
		<>
			{PARK_SLOTS.map((slot, i) => {
				const progress = interpolate(frame, [i * 2, COLLAPSE_FRAMES], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
					easing: Easing.in(Easing.cubic),
				});

				const position = place(layout, {
					x: slot.x * (1 - progress),
					y: slot.y * (1 - progress),
				});

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: position.left,
							top: position.top,
							transform: `translate(-50%, -50%) scale(${layout.cardScale * (1 - progress * 0.8)})`,
							opacity: 1 - progress * progress,
						}}
					>
						{ICONS[i]}
					</div>
				);
			})}
		</>
	);
};

/**
 * S5 / 0:21–0:25 / PROOF
 * VO: ما يغفلش على حتى كليان.
 */
export const S5Proof: React.FC = () => {
	const frame = useCurrentFrame();
	const layout = useAdLayout();

	/** Cross-fade out of daylight so the green numbers and the CTA can land. */
	const night = interpolate(frame, [0, 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	/** Everything collapsing into him reads as a small absorption pulse. */
	const absorb = interpolate(
		frame,
		[COLLAPSE_FRAMES - 6, COLLAPSE_FRAMES, COLLAPSE_FRAMES + 8],
		[1, 1.06, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	/**
	 * He holds exactly where S4 left him until the icons have landed, then
	 * rises to make room for the numbers. No cut-jump at the shot boundary.
	 */
	const rise = interpolate(
		frame,
		[COLLAPSE_FRAMES, COLLAPSE_FRAMES + 18],
		[0, 1],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.inOut(Easing.cubic),
		},
	);

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.warmSand}}>
			<AbsoluteFill
				style={{backgroundColor: COLORS.nightInk, opacity: night}}
			/>

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					transform: `translateY(${PROOF_AMEEN_OFFSET_Y * rise * layout.vScale}px)`,
				}}
			>
				<div style={{transform: `scale(${absorb})`}}>
					<Ameen
						expression={frame >= EYEBROW_FRAME ? 'eyebrow' : 'neutral'}
						hands="idle"
						glow={0.7 + night * 0.3}
						scale={interpolate(rise, [0, 1], [0.72, 0.62]) * layout.cardScale}
					/>
				</div>
			</AbsoluteFill>

			<CollapsingIcons />

			<Sequence from={STATS_IN}>
				<AbsoluteFill
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						transform: `translateY(${320 * layout.vScale}px)`,
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: layout.isSquare ? 'row' : 'column',
							gap: 20,
							transform: layout.isSquare ? 'scale(0.7)' : 'none',
						}}
					>
						<StatBlock
							delay={STAT_DELAYS[0]}
							value={24}
							suffix="/7"
							label="يخدم بلا توقف"
						/>
						<StatBlock
							delay={STAT_DELAYS[1]}
							value={1}
							suffix="s"
							label="ثانية وحدة وقت الرد"
						/>
						<StatBlock
							delay={STAT_DELAYS[2]}
							value={0}
							label="حتى كليان ما يروح"
						/>
					</div>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};
