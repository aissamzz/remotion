import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Rise} from '../components/Rise';
import {theme} from '../theme';
import {fontFamily} from '../fonts';

export const Cta: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const logo = spring({frame, fps, config: {damping: 13, mass: 0.7}});

	// gentle pulse on the URL pill
	const pulse = 1 + Math.sin(frame / 9) * 0.02 * interpolate(frame, [20, 35], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<div style={{textAlign: 'center', fontFamily}}>
			<div
				style={{
					fontSize: 150,
					fontWeight: 900,
					color: theme.terracotta,
					transform: `scale(${logo})`,
					lineHeight: 1,
				}}
			>
				صنعة
			</div>

			<Rise delay={12} style={{marginTop: 30}}>
				<div style={{fontSize: 72, fontWeight: 900, color: theme.ink}}>
					ابدأ اليوم
				</div>
			</Rise>

			<Rise delay={20} style={{marginTop: 44}}>
				<div
					style={{
						transform: `scale(${pulse})`,
						display: 'inline-block',
						background: `linear-gradient(135deg, ${theme.terracotta}, ${theme.terracottaDeep})`,
						color: theme.white,
						fontSize: 56,
						fontWeight: 800,
						padding: '30px 64px',
						borderRadius: 999,
						direction: 'ltr',
						boxShadow: `0 26px 60px ${theme.terracotta}66`,
					}}
				>
					san3apages.com
				</div>
			</Rise>
		</div>
	);
};
