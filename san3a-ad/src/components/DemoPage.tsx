import {theme} from '../theme';
import {fontFamily} from '../fonts';

// Recreation of the San3a public artisan page (the part the phone scrolls through).
// Built at a fixed 430px width so scroll offsets are deterministic. When the real
// full-page screenshot arrives, swap this whole component for an <Img>.
export const PAGE_WIDTH = 430;
export const PAGE_HEIGHT = 1980;

// Scroll targets (translateY) that frame each section in a ~760px viewport.
export const SECTION_Y = {
	profile: 110,
	services: 560,
	gallery: 980,
	appointment: 1220,
} as const;

const Line: React.FC<{w: number | string; c?: string}> = ({w, c}) => (
	<div
		style={{
			width: w,
			height: 14,
			borderRadius: 7,
			background: c ?? theme.border,
			margin: '12px auto',
		}}
	/>
);

const Heading: React.FC<{children: React.ReactNode}> = ({children}) => (
	<div
		style={{
			fontSize: 30,
			fontWeight: 800,
			color: theme.ink,
			textAlign: 'right',
			padding: '0 22px',
			marginBottom: 16,
		}}
	>
		{children}
	</div>
);

export const DemoPage: React.FC = () => {
	return (
		<div
			style={{
				width: PAGE_WIDTH,
				height: PAGE_HEIGHT,
				background: theme.cream,
				fontFamily,
				direction: 'rtl',
			}}
		>
			{/* Cover */}
			<div
				style={{
					height: 230,
					background: `linear-gradient(125deg, ${theme.terracotta}, ${theme.terracottaDeep})`,
					position: 'relative',
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundImage: `radial-gradient(#ffffff22 2px, transparent 2px)`,
						backgroundSize: '26px 26px',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: 18,
						right: 20,
						color: theme.white,
						fontWeight: 900,
						fontSize: 26,
						opacity: 0.9,
					}}
				>
					صنعة
				</div>
			</div>

			{/* Avatar */}
			<div
				style={{
					width: 132,
					height: 132,
					borderRadius: '50%',
					background: theme.amber,
					border: `7px solid ${theme.cream}`,
					margin: '-66px auto 0',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: 64,
				}}
			>
				🪚
			</div>

			{/* Name + meta */}
			<div style={{textAlign: 'center', marginTop: 10}}>
				<div style={{fontSize: 34, fontWeight: 900, color: theme.ink}}>
					كريم للنجارة
				</div>
				<div style={{fontSize: 22, color: theme.muted, marginTop: 4}}>
					نجارة وأثاث على الطلب · الجزائر العاصمة
				</div>
				<div style={{fontSize: 22, marginTop: 8}}>⭐️⭐️⭐️⭐️⭐️</div>
			</div>

			{/* Description */}
			<div style={{padding: '18px 28px'}}>
				<Line w="86%" />
				<Line w="100%" />
				<Line w="70%" />
			</div>

			{/* Services */}
			<div style={{paddingTop: 18}}>
				<Heading>الخدمات</Heading>
				{[
					['تفصيل خزانة', 'من 15000 دج'],
					['باب خشبي', 'من 9000 دج'],
					['طاولة طعام', 'من 22000 دج'],
				].map(([name, price]) => (
					<div
						key={name}
						style={{
							margin: '0 22px 12px',
							background: theme.card,
							border: `1px solid ${theme.border}`,
							borderRadius: 16,
							padding: '16px 18px',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<span style={{fontSize: 24, fontWeight: 700, color: theme.ink}}>
							{name}
						</span>
						<span
							style={{
								fontSize: 20,
								fontWeight: 700,
								color: theme.terracotta,
								background: theme.amber,
								padding: '6px 14px',
								borderRadius: 999,
							}}
						>
							{price}
						</span>
					</div>
				))}
			</div>

			{/* Gallery */}
			<div style={{paddingTop: 26}}>
				<Heading>معرض الأعمال</Heading>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr',
						gap: 10,
						padding: '0 22px',
					}}
				>
					{['🪑', '🚪', '🛏️', '🪟', '🗄️', '🪜'].map((e) => (
						<div
							key={e}
							style={{
								aspectRatio: '1',
								borderRadius: 14,
								background: theme.sand,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 44,
							}}
						>
							{e}
						</div>
					))}
				</div>
			</div>

			{/* Appointment */}
			<div style={{paddingTop: 30}}>
				<Heading>احجز موعد</Heading>
				<div style={{padding: '0 22px'}}>
					<div
						style={{
							background: theme.whatsapp,
							color: theme.white,
							borderRadius: 16,
							padding: '18px 0',
							fontSize: 26,
							fontWeight: 800,
							textAlign: 'center',
						}}
					>
						احجز عبر واتساب
					</div>
					<div
						style={{
							display: 'flex',
							gap: 10,
							marginTop: 14,
							justifyContent: 'center',
						}}
					>
						{['اليوم', 'غدا 10:00', 'غدا 14:00'].map((t) => (
							<span
								key={t}
								style={{
									fontSize: 20,
									fontWeight: 700,
									color: theme.ink,
									background: theme.card,
									border: `1px solid ${theme.border}`,
									padding: '12px 16px',
									borderRadius: 12,
								}}
							>
								{t}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
