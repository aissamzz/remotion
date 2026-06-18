import {AbsoluteFill, Sequence} from 'remotion';
import {Background} from './components/Background';
import {Scene} from './components/Scene';
import {Hook} from './scenes/Hook';
import {ScrollShowcase, SHOWCASE_DURATION} from './scenes/ScrollShowcase';
import {Pricing} from './scenes/Pricing';
import {Cta} from './scenes/Cta';

const OVERLAP = 8;

// `fill` scenes are full-bleed (no centered padding) — used for the showcase.
const scenes: {Comp: React.FC; d: number; fill?: boolean}[] = [
	{Comp: Hook, d: 85},
	{Comp: ScrollShowcase, d: SHOWCASE_DURATION + 16, fill: true},
	{Comp: Pricing, d: 115},
	{Comp: Cta, d: 125},
];

let cursor = 0;
const timeline = scenes.map(({Comp, d, fill}, i) => {
	const from = i === 0 ? 0 : cursor - OVERLAP;
	cursor = from + d;
	return {Comp, from, d, fill};
});

export const TOTAL_DURATION = cursor;

export const SanaAd: React.FC = () => {
	return (
		<AbsoluteFill>
			<Background />
			{timeline.map(({Comp, from, d, fill}, i) => (
				<Sequence key={i} from={from} durationInFrames={d}>
					<Scene durationInFrames={d} fill={fill}>
						<Comp />
					</Scene>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
