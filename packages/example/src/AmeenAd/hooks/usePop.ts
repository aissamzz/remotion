import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

/**
 * One spring curve for every pop in the ad.
 *
 * Tuned so the overshoot peaks at +20%: mapped from [0.8 → 1] that is exactly
 * the 0.8 → 1.04 → 1.0 the character spec asks for.
 * ζ = damping / (2·√(stiffness·mass)) = 9.1 / (2·√100) ≈ 0.455
 * peak = e^(-ζπ/√(1-ζ²)) ≈ 0.20
 */
export const POP_SPRING_CONFIG = {
	damping: 9.1,
	mass: 0.5,
	stiffness: 200,
} as const;

export const getPop = ({
	frame,
	fps,
	delay = 0,
	from = 0.8,
	to = 1,
}: {
	frame: number;
	fps: number;
	delay?: number;
	from?: number;
	to?: number;
}) => {
	const progress = spring({
		frame,
		fps,
		delay,
		config: POP_SPRING_CONFIG,
	});

	return from + progress * (to - from);
};

/**
 * Ameen never slides, he pops. Cards slide. That contrast is what makes him
 * read as alive.
 */
export const usePop = (options?: {
	delay?: number;
	from?: number;
	to?: number;
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return getPop({frame, fps, ...options});
};
