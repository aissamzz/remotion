import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {theme} from '../theme';

// Warm cream backdrop with two slowly drifting terracotta glows —
// gives the ad gentle, hand-crafted movement without distracting from the copy.
export const Background: React.FC = () => {
	const frame = useCurrentFrame();

	const blobA = {
		top: `${10 + Math.sin(frame / 80) * 4}%`,
		left: `${-10 + Math.cos(frame / 90) * 5}%`,
	};
	const blobB = {
		bottom: `${5 + Math.cos(frame / 70) * 5}%`,
		right: `${-15 + Math.sin(frame / 100) * 6}%`,
	};

	return (
		<AbsoluteFill style={{backgroundColor: theme.cream, overflow: 'hidden'}}>
			<div
				style={{
					position: 'absolute',
					width: 900,
					height: 900,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${theme.terracotta}33 0%, transparent 70%)`,
					filter: 'blur(40px)',
					...blobA,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					width: 800,
					height: 800,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${theme.amber} 0%, transparent 70%)`,
					filter: 'blur(30px)',
					...blobB,
				}}
			/>
			{/* subtle paper grain via repeating dots */}
			<AbsoluteFill
				style={{
					backgroundImage: `radial-gradient(${theme.terracotta}11 1px, transparent 1px)`,
					backgroundSize: '34px 34px',
					opacity: 0.5,
				}}
			/>
		</AbsoluteFill>
	);
};
