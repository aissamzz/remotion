import {Rise} from './Rise';
import {theme} from '../theme';
import {fontFamily} from '../fonts';

// Shared layout for feature scenes: a visual on top, then title + subtitle.
export const FeatureLayout: React.FC<{
	step: string;
	visual: React.ReactNode;
	title: React.ReactNode;
	subtitle: React.ReactNode;
}> = ({step, visual, title, subtitle}) => {
	return (
		<div
			style={{
				fontFamily,
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 56,
			}}
		>
			<Rise delay={4} distance={40}>
				<div style={{position: 'relative', display: 'grid', placeItems: 'center'}}>
					{/* soft glow behind the visual for extra pop */}
					<div
						style={{
							position: 'absolute',
							width: 460,
							height: 460,
							borderRadius: '50%',
							background: `radial-gradient(circle, ${theme.terracotta}26 0%, transparent 68%)`,
							filter: 'blur(8px)',
						}}
					/>
					<div style={{position: 'relative'}}>{visual}</div>
				</div>
			</Rise>

			<div>
				<Rise delay={14}>
					<div
						style={{
							color: theme.terracotta,
							fontSize: 36,
							fontWeight: 900,
							marginBottom: 18,
						}}
					>
						{step}
					</div>
				</Rise>
				<Rise delay={20}>
					<div
						style={{
							fontSize: 76,
							fontWeight: 900,
							color: theme.ink,
							lineHeight: 1.25,
						}}
					>
						{title}
					</div>
				</Rise>
				<Rise delay={28}>
					<div
						style={{
							fontSize: 46,
							fontWeight: 600,
							color: theme.muted,
							lineHeight: 1.4,
							marginTop: 22,
						}}
					>
						{subtitle}
					</div>
				</Rise>
			</div>
		</div>
	);
};
