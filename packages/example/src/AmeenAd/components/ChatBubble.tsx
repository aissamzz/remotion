import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {RTL} from '../hooks/useArabicFont';
import {COLORS} from '../theme';

export type BubbleSide = 'incoming' | 'outgoing';
export type BubbleState = 'sent' | 'grey' | 'replied';

const TypingDots: React.FC<{color: string}> = ({color}) => {
	const frame = useCurrentFrame();

	return (
		<div style={{display: 'flex', gap: 10, padding: '10px 4px'}}>
			{[0, 1, 2].map((i) => {
				const lift = Math.sin((frame / 6) * Math.PI - i * 0.7);

				return (
					<div
						key={i}
						style={{
							width: 14,
							height: 14,
							borderRadius: 999,
							backgroundColor: color,
							opacity: interpolate(lift, [-1, 1], [0.35, 1]),
							transform: `translateY(${interpolate(lift, [-1, 1], [3, -3])}px)`,
						}}
					/>
				);
			})}
		</div>
	);
};

export const ChatBubble: React.FC<{
	text?: string;
	side: BubbleSide;
	timestamp?: string;
	state?: BubbleState;
	typing?: boolean;
	width?: number;
	fontSize?: number;
	/** Night scenes get the dark surface, day scenes the white one. */
	night?: boolean;
}> = ({
	text,
	side,
	timestamp,
	state = 'sent',
	typing = false,
	width = 560,
	fontSize = 34,
	night = true,
}) => {
	const isGrey = state === 'grey';
	const isReply = state === 'replied' || side === 'outgoing';

	const background = isGrey
		? COLORS.greyedOut
		: isReply
			? COLORS.signalGreen
			: night
				? COLORS.nightSurface
				: COLORS.sandSurface;

	const color = isGrey
		? 'rgba(245, 230, 200, 0.45)'
		: isReply || !night
			? COLORS.inkText
			: COLORS.sandText;

	return (
		<div
			style={{
				...RTL,
				width,
				display: 'flex',
				justifyContent: side === 'incoming' ? 'flex-start' : 'flex-end',
				filter: isGrey ? 'saturate(0)' : 'none',
			}}
		>
			<div
				style={{
					maxWidth: width * 0.86,
					backgroundColor: background,
					color,
					borderRadius: 26,
					borderTopRightRadius: side === 'incoming' ? 10 : 26,
					borderTopLeftRadius: side === 'outgoing' ? 10 : 26,
					padding: '18px 24px 12px',
					fontSize,
					fontWeight: 600,
					lineHeight: 1.45,
					border:
						night && !isReply && !isGrey
							? `2px solid ${COLORS.nightStroke}`
							: 'none',
				}}
			>
				{typing ? <TypingDots color={color} /> : text}
				{timestamp ? (
					<div
						style={{
							direction: 'ltr',
							textAlign: side === 'incoming' ? 'right' : 'left',
							fontSize: fontSize * 0.52,
							fontWeight: 400,
							opacity: 0.55,
							marginTop: 6,
						}}
					>
						{timestamp}
					</div>
				) : null}
			</div>
		</div>
	);
};
