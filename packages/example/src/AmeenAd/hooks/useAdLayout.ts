import {useVideoConfig} from 'remotion';

/**
 * The ad is authored once in a 1080-wide stage and re-framed, not re-designed,
 * for the 1:1 feed cutdown. Horizontal positions are shared; vertical offsets
 * from centre are multiplied by `vScale` so the square version keeps the same
 * composition with less air above and below.
 */
export const useAdLayout = () => {
	const {width, height} = useVideoConfig();
	const isSquare = height / width < 1.3;

	return {
		width,
		height,
		cx: width / 2,
		cy: height / 2,
		/** Vertical offsets shrink in the square cutdown, but only so far. */
		vScale: Math.min(1, Math.max(0.62, height / 1920)),
		/** Cards and the mascot shrink with them so nothing collides. */
		cardScale: isSquare ? 0.72 : 1,
		isSquare,
	};
};

export type AdLayout = ReturnType<typeof useAdLayout>;

/** Turn an offset from the stage centre into an absolute stage position. */
export const place = (
	layout: AdLayout,
	offset: {x: number; y: number},
): {left: number; top: number} => {
	return {
		left: layout.cx + offset.x,
		top: layout.cy + offset.y * layout.vScale,
	};
};
