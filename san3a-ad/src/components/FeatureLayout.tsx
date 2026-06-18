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
				{visual}
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
