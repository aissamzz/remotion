import {Composition} from 'remotion';
import {SanaAd, TOTAL_DURATION} from './SanaAd';
import {FPS} from './theme';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			{/* Square 1:1 — feed posts (Instagram/Facebook), side-by-side phone + text */}
			<Composition
				id="SanaAd"
				component={SanaAd}
				durationInFrames={TOTAL_DURATION}
				fps={FPS}
				width={1080}
				height={1080}
			/>
		</>
	);
};
