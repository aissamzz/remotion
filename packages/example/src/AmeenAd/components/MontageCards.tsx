import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {RTL} from '../hooks/useArabicFont';
import {COLORS, CALLBACK_TIMESTAMP} from '../theme';
import {ChatBubble} from './ChatBubble';

const Card: React.FC<{
	width?: number;
	children: React.ReactNode;
	title?: string;
}> = ({width = 340, children, title}) => {
	return (
		<div
			style={{
				...RTL,
				width,
				backgroundColor: COLORS.sandSurface,
				borderRadius: 34,
				border: `3px solid ${COLORS.sandStroke}`,
				padding: 26,
				boxShadow: '0 24px 0 rgba(15, 76, 74, 0.12)',
			}}
		>
			{title ? (
				<div
					style={{
						color: COLORS.deepTeal,
						fontSize: 26,
						fontWeight: 700,
						opacity: 0.7,
						marginBottom: 14,
					}}
				>
					{title}
				</div>
			) : null}
			{children}
		</div>
	);
};

/**
 * Popup 1 — the callback. Same `02:14` as the hook, except this time somebody
 * answers. This card is the whole ad; give it the longest hold.
 */
export const WhatsappReplyCard: React.FC = () => {
	const frame = useCurrentFrame();
	const showTyping = frame > 8 && frame < 22;
	const showReply = frame >= 22;

	return (
		<Card width={420} title="WhatsApp">
			<div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
				<ChatBubble
					side="incoming"
					night={false}
					width={360}
					fontSize={28}
					text="بشحال هاد الموديل؟"
					timestamp={CALLBACK_TIMESTAMP}
				/>
				{showTyping ? (
					<ChatBubble side="outgoing" night={false} width={360} typing />
				) : null}
				{showReply ? (
					<div
						style={{
							opacity: interpolate(frame, [22, 27], [0, 1], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}),
						}}
					>
						<ChatBubble
							side="outgoing"
							night={false}
							width={360}
							fontSize={28}
							state="replied"
							text="4.500 دج، متوفر. نحجزلك؟"
							timestamp={CALLBACK_TIMESTAMP}
						/>
					</div>
				) : null}
			</div>
		</Card>
	);
};

export const ChannelCard: React.FC<{
	glyph: React.ReactNode;
	name: string;
	line: string;
}> = ({glyph, name, line}) => {
	return (
		<Card width={340}>
			<div style={{display: 'flex', alignItems: 'center', gap: 20}}>
				{glyph}
				<div>
					<div
						style={{
							direction: 'ltr',
							textAlign: 'right',
							color: COLORS.deepTeal,
							fontSize: 34,
							fontWeight: 900,
						}}
					>
						{name}
					</div>
					<div
						style={{
							color: COLORS.deepTeal,
							fontSize: 27,
							fontWeight: 600,
							opacity: 0.72,
							marginTop: 4,
						}}
					>
						{line}
					</div>
				</div>
			</div>
		</Card>
	);
};

/** Popup 4 — he knows your stock and your prices. */
export const ProductCard: React.FC<{
	productName: string;
	price: string;
}> = ({productName, price}) => {
	return (
		<Card width={340}>
			<div
				style={{
					height: 168,
					borderRadius: 24,
					backgroundColor: COLORS.deepTeal,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: 18,
				}}
			>
				<svg viewBox="0 0 64 64" width={72} height={72}>
					<rect
						x={10}
						y={14}
						width={44}
						height={36}
						rx={6}
						fill="none"
						stroke={COLORS.warmSand}
						strokeWidth={4}
					/>
					<path
						d="M14 44l12-13 9 9 6-6 9 10"
						fill="none"
						stroke={COLORS.signalGreen}
						strokeWidth={4}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<circle cx={24} cy={25} r={4} fill={COLORS.warmSand} />
				</svg>
			</div>
			<div
				style={{
					color: COLORS.deepTeal,
					fontSize: 30,
					fontWeight: 700,
					marginBottom: 10,
				}}
			>
				{productName}
			</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<div
					style={{
						backgroundColor: COLORS.signalGreen,
						color: COLORS.inkText,
						fontSize: 26,
						fontWeight: 700,
						padding: '6px 18px',
						borderRadius: 999,
					}}
				>
					متوفر
				</div>
				<div
					style={{
						color: COLORS.deepTeal,
						fontSize: 38,
						fontWeight: 900,
					}}
				>
					{price}
				</div>
			</div>
		</Card>
	);
};

/** Popup 5 — he books the appointment. */
export const CalendarCard: React.FC = () => {
	return (
		<Card width={340} title="موعد">
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					backgroundColor: COLORS.warmSand,
					borderRadius: 24,
					padding: '20px 24px',
				}}
			>
				<div
					style={{
						color: COLORS.signalGreen,
						fontSize: 44,
						fontWeight: 900,
					}}
				>
					✓
				</div>
				<div
					style={{
						color: COLORS.deepTeal,
						fontSize: 38,
						fontWeight: 900,
					}}
				>
					غدوة 14:00
				</div>
			</div>
		</Card>
	);
};

/** Popup 6 — the order lands. */
export const OrderConfirmedCard: React.FC = () => {
	return (
		<Card width={340}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 16,
					backgroundColor: COLORS.signalGreen,
					borderRadius: 24,
					padding: '24px 20px',
				}}
			>
				<div style={{color: COLORS.inkText, fontSize: 40, fontWeight: 900}}>
					✓
				</div>
				<div style={{color: COLORS.inkText, fontSize: 36, fontWeight: 900}}>
					الطلبية مؤكدة
				</div>
			</div>
		</Card>
	);
};
