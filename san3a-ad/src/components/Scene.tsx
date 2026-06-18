import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

// Wraps a scene's content and cross-fades it in at the start and out at the end,
// so consecutive Sequences blend smoothly.
export const Scene: React.FC<{
	durationInFrames: number;
	children: React.ReactNode;
}> = ({durationInFrames, children}) => {
	const frame = useCurrentFrame();
	const fade = 12;

	const opacity = interpolate(
		frame,
		[0, fade, durationInFrames - fade, durationInFrames],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<AbsoluteFill
			style={{
				opacity,
				justifyContent: 'center',
				alignItems: 'center',
				direction: 'rtl',
				padding: 90,
			}}
		>
			{children}
		</AbsoluteFill>
	);
};
