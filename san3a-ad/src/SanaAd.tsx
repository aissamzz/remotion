import {AbsoluteFill, Sequence} from 'remotion';
import {Background} from './components/Background';
import {Scene} from './components/Scene';
import {Hook} from './scenes/Hook';
import {Brand} from './scenes/Brand';
import {FeatureLink} from './scenes/FeatureLink';
import {FeatureWhatsApp} from './scenes/FeatureWhatsApp';
import {FeatureInvoice} from './scenes/FeatureInvoice';
import {FeatureQr} from './scenes/FeatureQr';
import {Pricing} from './scenes/Pricing';
import {Cta} from './scenes/Cta';

// Scene durations in frames (30fps). Scenes overlap slightly via cross-fade.
const OVERLAP = 8;
const scenes = [
	{Comp: Hook, d: 100},
	{Comp: Brand, d: 110},
	{Comp: FeatureLink, d: 130},
	{Comp: FeatureWhatsApp, d: 115},
	{Comp: FeatureInvoice, d: 115},
	{Comp: FeatureQr, d: 115},
	{Comp: Pricing, d: 120},
	{Comp: Cta, d: 130},
];

// Lay scenes back to back, pulling each one earlier by OVERLAP so fades blend.
let cursor = 0;
const timeline = scenes.map(({Comp, d}, i) => {
	const from = i === 0 ? 0 : cursor - OVERLAP;
	cursor = from + d;
	return {Comp, from, d};
});

export const TOTAL_DURATION = cursor;

export const SanaAd: React.FC = () => {
	return (
		<AbsoluteFill>
			<Background />
			{timeline.map(({Comp, from, d}, i) => (
				<Sequence key={i} from={from} durationInFrames={d}>
					<Scene durationInFrames={d}>
						<Comp />
					</Scene>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
