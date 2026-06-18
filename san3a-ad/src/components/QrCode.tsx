import qrcode from 'qrcode-generator';
import {theme} from '../theme';

// A real, scannable QR code pointing at the demo page.
const URL = 'https://san3apages.com/it9an-demo';
const qr = qrcode(0, 'M');
qr.addData(URL);
qr.make();
const COUNT = qr.getModuleCount();

export const QrCode: React.FC<{size?: number}> = ({size = 300}) => {
	const quiet = 4; // quiet-zone cells on each side
	const total = COUNT + quiet * 2;
	const cell = size / total;

	const rects: React.ReactNode[] = [];
	for (let r = 0; r < COUNT; r++) {
		for (let c = 0; c < COUNT; c++) {
			if (qr.isDark(r, c)) {
				rects.push(
					<rect
						key={`${r}-${c}`}
						x={(c + quiet) * cell}
						y={(r + quiet) * cell}
						width={cell + 0.5}
						height={cell + 0.5}
						fill={theme.ink}
						rx={cell * 0.18}
					/>,
				);
			}
		}
	}

	return (
		<div
			style={{
				width: size,
				height: size,
				background: theme.white,
				borderRadius: 28,
				boxShadow: '0 24px 60px rgba(58,46,37,0.18)',
				display: 'grid',
				placeItems: 'center',
			}}
		>
			<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
				{rects}
			</svg>
		</div>
	);
};
