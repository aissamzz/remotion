import {
	AbsoluteFill,
	Easing,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {PhoneFrame} from '../components/PhoneFrame';
import {DemoPage, PAGE_WIDTH, SECTION_Y} from '../components/DemoPage';
import {Rise} from '../components/Rise';
import {theme} from '../theme';
import {fontFamily} from '../fonts';

const VIEWPORT_H = 760;
const SEC_LEN = 78; // frames per section
export const SHOWCASE_DURATION = SEC_LEN * 4;

const sections = [
	{y: SECTION_Y.profile, label: 'الملف', title: 'صفحة احترافية\nبكل تفاصيلك', sub: 'صورة، وصف، وأزرار تواصل مباشرة'},
	{y: SECTION_Y.services, label: 'الخدمات', title: 'خدماتك وأسعارك\nواضحة للزبون', sub: 'كل خدمة بسعرها'},
	{y: SECTION_Y.gallery, label: 'المعرض', title: 'معرض أعمالك\nيتكلّم عليك', sub: 'صور مشاريعك الحقيقية'},
	{y: SECTION_Y.appointment, label: 'الموعد', title: 'حجز المواعيد\nعبر واتساب', sub: 'الزبون يختار اليوم ويحجز'},
];

const Dots: React.FC<{active: number}> = ({active}) => (
	<div style={{display: 'flex', gap: 12, justifyContent: 'flex-start', marginBottom: 28}}>
		{sections.map((_, i) => (
			<div
				key={i}
				style={{
					width: i === active ? 46 : 16,
					height: 16,
					borderRadius: 999,
					background: i === active ? theme.terracotta : theme.border,
					transition: 'none',
				}}
			/>
		))}
	</div>
);

export const ScrollShowcase: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const i = Math.min(sections.length - 1, Math.max(0, Math.floor(frame / SEC_LEN)));
	const within = frame - i * SEC_LEN;
	const prevY = i === 0 ? sections[0].y : sections[i - 1].y;
	const p = interpolate(within, [0, 26], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.cubic),
	});
	const scrollY = prevY + (sections[i].y - prevY) * p;

	// phone entrance + gentle float
	const enter = spring({frame, fps, config: {damping: 16, mass: 0.8}});
	const float = Math.sin(frame / 24) * 6;

	// overall progress bar
	const progress = interpolate(frame, [0, SHOWCASE_DURATION], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const sec = sections[i];

	return (
		<AbsoluteFill style={{fontFamily, direction: 'rtl'}}>
			{/* Phone on the left */}
			<div
				style={{
					position: 'absolute',
					left: 64,
					top: '50%',
					transform: `translateY(-50%) translateY(${float}px) scale(${0.8 * enter}) rotate(${(1 - enter) * -6}deg)`,
					opacity: enter,
				}}
			>
				<PhoneFrame screenWidth={PAGE_WIDTH} screenHeight={VIEWPORT_H}>
					<div style={{transform: `translateY(${-scrollY}px)`}}>
						<DemoPage />
					</div>
					{/* fake scroll indicator */}
					<div
						style={{
							position: 'absolute',
							right: 6,
							top: 12,
							bottom: 12,
							width: 6,
							borderRadius: 3,
							background: '#00000010',
						}}
					>
						<div
							style={{
								position: 'absolute',
								right: 0,
								width: 6,
								height: 90,
								borderRadius: 3,
								background: theme.terracotta,
								top: `${interpolate(scrollY, [sections[0].y, sections[3].y], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}%`,
								transform: 'translateY(-50%)',
							}}
						/>
					</div>
				</PhoneFrame>
			</div>

			{/* Text on the right */}
			<div
				style={{
					position: 'absolute',
					right: 70,
					top: '50%',
					transform: 'translateY(-50%)',
					width: 470,
					textAlign: 'right',
				}}
			>
				<Dots active={i} />
				{/* re-mount on section change so each beat re-animates */}
				<div key={i}>
					<Rise delay={0} distance={50}>
						<div
							style={{
								display: 'inline-block',
								background: theme.terracotta,
								color: theme.white,
								fontSize: 28,
								fontWeight: 800,
								padding: '8px 24px',
								borderRadius: 999,
								marginBottom: 22,
							}}
						>
							{sec.label}
						</div>
					</Rise>
					<Rise delay={5} distance={50}>
						<div
							style={{
								fontSize: 72,
								fontWeight: 900,
								color: theme.ink,
								lineHeight: 1.22,
								whiteSpace: 'pre-line',
							}}
						>
							{sec.title}
						</div>
					</Rise>
					<Rise delay={11} distance={40}>
						<div
							style={{
								fontSize: 36,
								fontWeight: 600,
								color: theme.muted,
								marginTop: 18,
							}}
						>
							{sec.sub}
						</div>
					</Rise>
				</div>
			</div>

			{/* bottom progress bar */}
			<div
				style={{
					position: 'absolute',
					left: 70,
					right: 70,
					bottom: 54,
					height: 8,
					borderRadius: 999,
					background: theme.border,
				}}
			>
				<div
					style={{
						width: `${progress * 100}%`,
						height: '100%',
						borderRadius: 999,
						background: theme.terracotta,
					}}
				/>
			</div>
		</AbsoluteFill>
	);
};
