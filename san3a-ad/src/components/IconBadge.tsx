import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';

// Round terracotta badge that pops in and holds an emoji/glyph.
export const IconBadge: React.FC<{
	children: React.ReactNode;
	delay?: number;
	bg?: string;
	size?: number;
}> = ({children, delay = 0, bg = theme.terracotta, size = 200}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const p = spring({
		frame: frame - delay,
		fps,
		config: {damping: 12, mass: 0.6, stiffness: 120},
	});

	return (
		<div
			style={{
				width: size,
				height: size,
				borderRadius: '50%',
				background: `linear-gradient(135deg, ${bg}, ${theme.terracottaDeep})`,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: size * 0.46,
				transform: `scale(${p})`,
				boxShadow: `0 24px 50px ${bg}55`,
			}}
		>
			{children}
		</div>
	);
};
