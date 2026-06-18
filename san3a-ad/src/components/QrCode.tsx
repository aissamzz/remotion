import {theme} from '../theme';

// A decorative QR-style grid (not a scannable code) for the QR feature scene.
const GRID = 11;
const pattern = Array.from({length: GRID * GRID}, (_, i) => {
	const x = i % GRID;
	const y = Math.floor(i / GRID);
	// finder squares in three corners
	const corner =
		(x < 3 && y < 3) || (x > GRID - 4 && y < 3) || (x < 3 && y > GRID - 4);
	const ring =
		(x === 0 || x === 2 || y === 0 || y === 2) && x < 3 && y < 3;
	if (corner) return ring || (x === 1 && y === 1) ? 1 : 0;
	// deterministic pseudo-random fill
	return (x * 7 + y * 13 + x * y) % 3 === 0 ? 1 : 0;
});

export const QrCode: React.FC<{size?: number}> = ({size = 320}) => {
	const cell = size / GRID;
	return (
		<div
			style={{
				width: size,
				height: size,
				background: theme.white,
				borderRadius: 28,
				padding: cell,
				boxSizing: 'content-box',
				display: 'grid',
				gridTemplateColumns: `repeat(${GRID}, ${cell}px)`,
				boxShadow: '0 24px 60px rgba(58,46,37,0.18)',
			}}
		>
			{pattern.map((on, i) => (
				<div
					key={i}
					style={{
						width: cell,
						height: cell,
						background: on ? theme.ink : 'transparent',
						borderRadius: 2,
					}}
				/>
			))}
		</div>
	);
};
