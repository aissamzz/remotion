import React from 'react';
import {COLORS} from '../theme';

/**
 * The phone is seen slightly from above and lying flat, so it gets a real
 * perspective tilt rather than a drawn one — that way the same component works
 * for the night shot and the daylight shot.
 */
export const Phone: React.FC<{
	night: boolean;
	/** 0 = screen fully lit, 1 = screen dimmed to sleep. */
	dim?: number;
	tilt?: number;
	width?: number;
	height?: number;
	children?: React.ReactNode;
}> = ({night, dim = 0, tilt = 26, width = 760, height = 1180, children}) => {
	return (
		<div
			style={{
				perspective: 2200,
			}}
		>
			<div
				style={{
					width,
					height,
					transform: `rotateX(${tilt}deg)`,
					transformOrigin: 'center 60%',
					borderRadius: 68,
					backgroundColor: night ? '#05070B' : COLORS.deepTeal,
					padding: 18,
					boxShadow: night
						? `0 0 140px rgba(31, 208, 122, ${0.18 * (1 - dim)})`
						: '0 40px 0 rgba(15, 76, 74, 0.14)',
				}}
			>
				<div
					style={{
						position: 'relative',
						width: '100%',
						height: '100%',
						borderRadius: 52,
						backgroundColor: night ? COLORS.nightInk : COLORS.warmSand,
						overflow: 'hidden',
					}}
				>
					{children}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							backgroundColor: '#000000',
							opacity: dim * 0.82,
						}}
					/>
				</div>
			</div>
		</div>
	);
};
