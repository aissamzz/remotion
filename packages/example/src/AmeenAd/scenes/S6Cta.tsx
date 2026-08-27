import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Ameen} from '../components/Ameen';
import {CTACard, Wordmark} from '../components/CTACard';
import {useAdLayout} from '../hooks/useAdLayout';
import {POP_SPRING_CONFIG} from '../hooks/usePop';
import {COLORS} from '../theme';
import {PROOF_AMEEN_OFFSET_Y} from './S5Proof';

const WORDMARK_IN = 10;
const CTA_IN = 20;

/**
 * S6 / 0:25–0:30 / CTA
 * VO: أمين. البياع لي ما يرقدش.
 * The end card holds 2s past the VO so the freeze frame carries the CTA.
 */
export const S6Cta: React.FC<{
	whatsappHandle: string;
	price: string | null;
}> = ({whatsappHandle, price}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const layout = useAdLayout();

	/**
	 * He moves left — but on the pop spring, not a linear slide, so he still
	 * reads as alive rather than as a graphic being repositioned. He starts
	 * exactly where S5 parked him, so the shot change is a move, not a jump.
	 */
	const settle = spring({frame, fps, config: POP_SPRING_CONFIG});
	const ameenX = interpolate(settle, [0, 1], [0, -layout.width * 0.24]);

	/**
	 * The mascot and the CTA both hang off centre, which leaves the end card
	 * riding high in frame. Drop the whole arrangement so the freeze frame is
	 * optically centred in both the 9:16 and the 1:1 cut.
	 */
	const endCardDrop = layout.height * 0.07;

	const ameenY = interpolate(
		settle,
		[0, 1],
		[PROOF_AMEEN_OFFSET_Y * layout.vScale, -layout.height * 0.17 + endCardDrop],
	);

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.nightInk}}>
			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					transform: `translate(${ameenX}px, ${ameenY}px)`,
				}}
			>
				<Ameen
					hands="thumbsUp"
					expression="answering"
					glow={0.95}
					scale={0.62 * layout.cardScale}
				/>
			</AbsoluteFill>

			<Sequence from={WORDMARK_IN}>
				<AbsoluteFill
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						transform: `translate(${layout.width * 0.2}px, ${-layout.height * 0.14 + endCardDrop}px)`,
					}}
				>
					<Wordmark scale={layout.cardScale} />
				</AbsoluteFill>
			</Sequence>

			<Sequence from={CTA_IN}>
				<AbsoluteFill
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						transform: `translateY(${layout.height * 0.14 + endCardDrop}px)`,
					}}
				>
					<CTACard
						whatsappHandle={whatsappHandle}
						price={price}
						scale={layout.cardScale}
					/>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};
