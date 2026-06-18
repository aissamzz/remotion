import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Rise} from '../components/Rise';
import {theme} from '../theme';
import {fontFamily} from '../fonts';

export const Brand: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const logo = spring({frame, fps, config: {damping: 13, mass: 0.7}});

	return (
		<div style={{textAlign: 'center', fontFamily}}>
			<div
				style={{
					fontSize: 200,
					fontWeight: 900,
					color: theme.terracotta,
					transform: `scale(${logo})`,
					lineHeight: 1,
				}}
			>
				صنعة
			</div>

			<Rise delay={12} style={{marginTop: 8}}>
				<div
					style={{
						fontSize: 52,
						fontWeight: 700,
						color: theme.muted,
						letterSpacing: 4,
						direction: 'ltr',
					}}
				>
					San3a&nbsp;Pages
				</div>
			</Rise>

			<Rise delay={24} style={{marginTop: 48}}>
				<div
					style={{
						fontSize: 60,
						fontWeight: 700,
						color: theme.ink,
						lineHeight: 1.4,
					}}
				>
					صفحتك الاحترافية
					<br />
					<span style={{color: theme.terracotta}}>برابط واحد</span>
				</div>
			</Rise>
		</div>
	);
};
