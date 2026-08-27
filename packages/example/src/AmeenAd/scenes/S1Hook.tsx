import React from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	Sequence,
	useCurrentFrame,
} from 'remotion';
import {ChatBubble} from '../components/ChatBubble';
import {Phone} from '../components/Phone';
import {RTL} from '../hooks/useArabicFont';
import {CALLBACK_TIMESTAMP, COLORS} from '../theme';

/** The three questions that never got an answer. */
export const HOOK_MESSAGES = [
	'السلام، بشحال هاد الموديل؟',
	'كاين بلون آخر؟',
	'وليت؟',
];

const BUBBLE_IN_FRAMES = [6, 26, 46];

const SlidingBubble: React.FC<{text: string; index: number}> = ({
	text,
	index,
}) => {
	const frame = useCurrentFrame();
	const enter = BUBBLE_IN_FRAMES[index];

	const progress = interpolate(frame, [enter, enter + 12], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	return (
		<div
			style={{
				opacity: progress,
				transform: `translateY(${interpolate(progress, [0, 1], [70, 0])}px)`,
			}}
		>
			<ChatBubble
				side="incoming"
				text={text}
				timestamp={CALLBACK_TIMESTAMP}
				width={620}
				night
			/>
		</div>
	);
};

/**
 * S1 / 0:00–0:03 / HOOK
 * VO: راك راقد. و الكليان راه يسقسي.
 * SFX: two buzzes, then hard silence. No music under this shot.
 */
export const S1Hook: React.FC = () => {
	const frame = useCurrentFrame();

	/** Screen dims once the third message goes unanswered. */
	const dim = interpolate(frame, [70, 88], [0, 0.72], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	/** Two phone buzzes, one per message, then nothing. */
	const buzz = BUBBLE_IN_FRAMES.slice(0, 2).reduce((offset, at) => {
		const shake = interpolate(frame, [at, at + 3, at + 7], [0, 1, 0], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});

		return offset + Math.sin(frame * 3.4) * 7 * shake;
	}, 0);

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.nightInk}}>
			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					transform: `translateX(${buzz}px)`,
				}}
			>
				<Phone night dim={dim}>
					<div
						style={{
							position: 'absolute',
							inset: 0,
							padding: '90px 60px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-end',
							gap: 20,
						}}
					>
						{HOOK_MESSAGES.map((text, i) => (
							<SlidingBubble key={text} text={text} index={i} />
						))}
					</div>
				</Phone>
			</AbsoluteFill>

			<AbsoluteFill style={{...RTL, padding: 80}}>
				<div
					style={{
						direction: 'ltr',
						color: COLORS.sandText,
						fontSize: 190,
						fontWeight: 900,
						opacity: 0.14,
						lineHeight: 1,
					}}
				>
					{CALLBACK_TIMESTAMP}
				</div>
			</AbsoluteFill>

			{/* The read receipt that never turns green. */}
			<Sequence from={60}>
				<AbsoluteFill
					style={{
						...RTL,
						alignItems: 'center',
						justifyContent: 'flex-end',
						paddingBottom: 120,
					}}
				>
					<div
						style={{
							color: COLORS.sandText,
							fontSize: 40,
							fontWeight: 600,
							opacity: 0.35,
						}}
					>
						ما كان حتى جواب
					</div>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};
