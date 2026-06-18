import {theme} from '../theme';

// Device chrome with a masked screen area. Children fill the screen; for the
// scrolling showcase the caller passes a tall page wrapped in a translateY.
export const PhoneFrame: React.FC<{
	screenWidth: number;
	screenHeight: number;
	children: React.ReactNode;
	style?: React.CSSProperties;
}> = ({screenWidth, screenHeight, children, style}) => {
	const bezel = 16;
	return (
		<div
			style={{
				width: screenWidth + bezel * 2,
				height: screenHeight + bezel * 2,
				borderRadius: 60,
				background: theme.ink,
				padding: bezel,
				boxShadow: '0 50px 110px rgba(58,46,37,0.4), inset 0 0 0 2px #00000022',
				position: 'relative',
				...style,
			}}
		>
			{/* notch */}
			<div
				style={{
					position: 'absolute',
					top: bezel + 10,
					left: '50%',
					transform: 'translateX(-50%)',
					width: 120,
					height: 30,
					borderRadius: 999,
					background: theme.ink,
					zIndex: 5,
				}}
			/>
			<div
				style={{
					width: screenWidth,
					height: screenHeight,
					borderRadius: 46,
					overflow: 'hidden',
					position: 'relative',
					background: theme.cream,
				}}
			>
				{children}
			</div>
		</div>
	);
};
