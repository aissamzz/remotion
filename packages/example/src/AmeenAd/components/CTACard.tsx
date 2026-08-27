import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {RTL} from '../hooks/useArabicFont';
import {getPop} from '../hooks/usePop';
import {COLORS} from '../theme';

/** The wordmark that sits opposite Ameen on the end card. */
export const Wordmark: React.FC<{scale?: number}> = ({scale = 1}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<div
			style={{
				...RTL,
				transform: `scale(${getPop({frame, fps}) * scale})`,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					color: COLORS.sandText,
					fontSize: 96,
					fontWeight: 900,
					lineHeight: 1.25,
				}}
			>
				أمين
			</div>
			<div
				style={{
					color: COLORS.signalGreen,
					fontSize: 34,
					fontWeight: 700,
					opacity: 0.92,
				}}
			>
				البياع لي ما يرقدش
			</div>
		</div>
	);
};

/**
 * The CTA button on a pulse loop, with the handle the prospect actually
 * messages underneath. The price is a variant, not the default: at 30 seconds
 * you are buying a click, not a decision — the first automated WhatsApp reply
 * is where the price belongs, and quoting it there demonstrates the product.
 */
export const CTACard: React.FC<{
	whatsappHandle: string;
	price: string | null;
	scale?: number;
}> = ({whatsappHandle, price, scale = 1}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	/** One ring leaves the button per second, forever. */
	const pulse = (frame % fps) / fps;
	const buttonScale =
		getPop({frame, fps}) * (1 + Math.sin(pulse * Math.PI * 2) * 0.012);

	return (
		<div
			style={{
				...RTL,
				transform: `scale(${scale})`,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 30,
			}}
		>
			<div style={{position: 'relative', transform: `scale(${buttonScale})`}}>
				<div
					style={{
						position: 'absolute',
						inset: -6,
						borderRadius: 999,
						border: `4px solid ${COLORS.signalGreen}`,
						opacity: interpolate(pulse, [0, 1], [0.55, 0]),
						transform: `scale(${interpolate(pulse, [0, 1], [1, 1.22])})`,
					}}
				/>
				<div
					style={{
						backgroundColor: COLORS.signalGreen,
						color: COLORS.inkText,
						fontSize: 52,
						fontWeight: 900,
						padding: '22px 70px',
						borderRadius: 999,
						lineHeight: 1.5,
					}}
				>
					جرّب أمين
				</div>
			</div>

			<div
				style={{
					opacity: interpolate(frame, [14, 26], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					}),
					textAlign: 'center',
				}}
			>
				<div
					style={{
						direction: 'ltr',
						color: COLORS.sandText,
						fontSize: 38,
						fontWeight: 700,
						opacity: 0.92,
					}}
				>
					{whatsappHandle}
				</div>
				{price ? (
					<div
						style={{
							color: COLORS.sandText,
							fontSize: 30,
							fontWeight: 600,
							opacity: 0.6,
							marginTop: 10,
						}}
					>
						{price}
					</div>
				) : null}
			</div>
		</div>
	);
};
