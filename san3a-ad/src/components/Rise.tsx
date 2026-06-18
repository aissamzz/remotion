import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

// Springs a child up from below with a fade — the core entrance used everywhere.
export const Rise: React.FC<{
	delay?: number;
	distance?: number;
	children: React.ReactNode;
	style?: React.CSSProperties;
}> = ({delay = 0, distance = 60, children, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const p = spring({
		frame: frame - delay,
		fps,
		config: {damping: 200, mass: 0.7},
	});

	return (
		<div
			style={{
				opacity: p,
				transform: `translateY(${(1 - p) * distance}px)`,
				...style,
			}}
		>
			{children}
		</div>
	);
};
