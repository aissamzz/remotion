import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AdLayout, place} from '../hooks/useAdLayout';
import {getPop} from '../hooks/usePop';

export const PARK_TRANSITION = 12;
export const DEFAULT_HOLD = 36;

/**
 * Generic wrapper for the S4 montage: a card snaps in on the beat, holds, then
 * shrinks back into a small icon that parks at the frame edge — so by the end
 * of the shot the edges are lined with everything Ameen can do.
 *
 * Wrap it in a `<Sequence layout="none">` that starts on the beat: frame 0 here
 * is the snap, which also gives the card's own contents a local timeline.
 */
export const PopCard: React.FC<{
	layout: AdLayout;
	holdInFrames?: number;
	/** Where the card plays, as an offset from the stage centre. */
	orbit: {x: number; y: number};
	/** Where its icon comes to rest, as an offset from the stage centre. */
	park: {x: number; y: number};
	parkScale?: number;
	icon: React.ReactNode;
	children: React.ReactNode;
}> = ({
	layout,
	holdInFrames = DEFAULT_HOLD,
	orbit,
	park,
	parkScale = 0.3,
	icon,
	children,
}) => {
	const local = useCurrentFrame();
	const {fps} = useVideoConfig();

	const parkProgress = interpolate(
		local,
		[holdInFrames, holdInFrames + PARK_TRANSITION],
		[0, 1],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.bezier(0.4, 0, 0.2, 1),
		},
	);

	const pop = getPop({frame: local, fps});
	const scale =
		pop * layout.cardScale * interpolate(parkProgress, [0, 1], [1, parkScale]);

	const position = place(layout, {
		x: interpolate(parkProgress, [0, 1], [orbit.x, park.x]),
		y: interpolate(parkProgress, [0, 1], [orbit.y, park.y]),
	});

	return (
		<div
			style={{
				position: 'absolute',
				left: position.left,
				top: position.top,
				transform: `translate(-50%, -50%) scale(${scale})`,
			}}
		>
			<div style={{opacity: 1 - parkProgress}}>{children}</div>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					opacity: parkProgress,
					transform: `scale(${1 / parkScale})`,
				}}
			>
				{icon}
			</div>
		</div>
	);
};
