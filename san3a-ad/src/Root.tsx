import {Composition} from 'remotion';
import {SanaAd, TOTAL_DURATION} from './SanaAd';
import {FPS} from './theme';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			{/* Vertical 9:16 — built for Instagram/TikTok Reels & WhatsApp Status */}
			<Composition
				id="SanaAd"
				component={SanaAd}
				durationInFrames={TOTAL_DURATION}
				fps={FPS}
				width={1080}
				height={1920}
			/>
		</>
	);
};
