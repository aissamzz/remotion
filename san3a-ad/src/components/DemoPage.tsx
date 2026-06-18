import {theme} from '../theme';
import {fontFamily} from '../fonts';

// Faithful recreation of the real public page https://san3apages.com/it9an-demo
// (ورشة الإتقان — نجار, قسنطينة). Built at a fixed 430px width so scroll offsets
// are deterministic. Swap for an <Img> of the real screenshot if you prefer.
export const PAGE_WIDTH = 430;
export const PAGE_HEIGHT = 1860;

// Scroll targets (translateY) that frame each real section in a ~760px viewport.
export const SECTION_Y = {
	profile: 120,
	services: 560,
	gallery: 940,
	appointment: 1100,
} as const;

const Btn: React.FC<{
	children: React.ReactNode;
	bg: string;
	color: string;
	outline?: boolean;
}> = ({children, bg, color, outline}) => (
	<div
		style={{
			background: outline ? theme.card : bg,
			color,
			border: outline ? `1.5px solid ${theme.border}` : 'none',
			borderRadius: 14,
			padding: '13px 18px',
			fontSize: 21,
			fontWeight: 800,
			display: 'flex',
			alignItems: 'center',
			gap: 8,
			whiteSpace: 'nowrap',
		}}
	>
		{children}
	</div>
);

const Heading: React.FC<{children: React.ReactNode}> = ({children}) => (
	<div
		style={{
			fontSize: 30,
			fontWeight: 800,
			color: theme.ink,
			textAlign: 'right',
			marginBottom: 18,
		}}
	>
		{children}
	</div>
);

const services: [string, string][] = [
	['مطبخ خشب على المقاس', 'من 120.000 دج'],
	['خزانة ملابس مدمجة', 'من 65.000 دج'],
	['باب خشب داخلي', 'من 22.000 دج'],
	['مكتبة أو رفوف حائط', 'من 18.000 دج'],
];

const gallery = ['🍽️', '🗄️', '🪵', '🛋️'];

const days: [string, string][] = [
	['السبت', '20'],
	['الأحد', '21'],
	['الإثنين', '22'],
	['الثلاثاء', '23'],
	['الأربعاء', '24'],
];

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
			{/* Cover photo */}
			<div
				style={{
					height: 220,
					background: `linear-gradient(120deg, #d8c3a5, #b79169 55%, #8a6a45)`,
					position: 'relative',
				}}
			>
				<div
					style={{
						position: 'absolute',
						bottom: 26,
						left: '50%',
						transform: 'translateX(-50%)',
						fontSize: 70,
						opacity: 0.85,
					}}
				>
					🪑
				</div>
			</div>

			{/* Logo card */}
			<div
				style={{
					width: 104,
					height: 104,
					borderRadius: 26,
					background: theme.white,
					border: `4px solid ${theme.cream}`,
					margin: '-52px auto 0',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: 52,
					boxShadow: '0 10px 24px rgba(58,46,37,0.18)',
				}}
			>
				🪚
			</div>

			{/* Name + tag */}
			<div style={{textAlign: 'center', marginTop: 12}}>
				<div style={{fontSize: 36, fontWeight: 900, color: theme.ink}}>
					ورشة الإتقان
				</div>
				<div
					style={{
						display: 'inline-flex',
						gap: 8,
						alignItems: 'center',
						marginTop: 10,
						fontSize: 20,
						color: theme.muted,
					}}
				>
					<span
						style={{
							background: theme.amber,
							color: theme.terracottaDeep,
							fontWeight: 800,
							padding: '4px 14px',
							borderRadius: 999,
						}}
					>
						نجار
					</span>
					<span>📍 قسنطينة</span>
				</div>
			</div>

			{/* Description */}
			<div
				style={{
					padding: '16px 30px 0',
					textAlign: 'center',
					fontSize: 21,
					lineHeight: 1.6,
					color: theme.ink,
					opacity: 0.85,
				}}
			>
				نجارة عصرية وكلاسيكية على المقاس: مطابخ، خزائن، أبواب وديكورات خشبية.
				خبرة تتجاوز خمسة عشر عاماً في خدمة عائلات قسنطينة.
			</div>

			{/* Action buttons */}
			<div
				style={{
					display: 'flex',
					gap: 10,
					justifyContent: 'center',
					padding: '20px 24px 0',
				}}
			>
				<Btn bg={theme.terracotta} color={theme.white}>
					📅 احجز موعد
				</Btn>
				<Btn bg={theme.whatsapp} color={theme.white}>
					واتساب
				</Btn>
				<Btn bg={theme.card} color={theme.ink} outline>
					📞 اتصل الآن
				</Btn>
			</div>

			{/* Services & prices */}
			<div style={{padding: '34px 22px 0'}}>
				<div
					style={{
						background: theme.card,
						border: `1px solid ${theme.border}`,
						borderRadius: 22,
						padding: 22,
					}}
				>
					<Heading>الخدمات والأسعار</Heading>
					{services.map(([name, price]) => (
						<div
							key={name}
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '14px 0',
								borderBottom: `1px solid ${theme.border}`,
							}}
						>
							<span style={{fontSize: 23, fontWeight: 700, color: theme.ink}}>
								{name}
							</span>
							<span
								style={{
									fontSize: 19,
									fontWeight: 800,
									color: theme.terracotta,
								}}
							>
								{price}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Gallery */}
			<div style={{padding: '30px 22px 0'}}>
				<Heading>معرض الأعمال</Heading>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: 12,
					}}
				>
					{gallery.map((e, idx) => (
						<div
							key={e}
							style={{
								aspectRatio: '1.3',
								borderRadius: 16,
								background: `linear-gradient(135deg, ${idx % 2 ? '#cdb491' : '#d8c3a5'}, #a9855c)`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 50,
							}}
						>
							{e}
						</div>
					))}
				</div>
			</div>

			{/* Appointment */}
			<div style={{padding: '30px 22px 0'}}>
				<div
					style={{
						background: theme.card,
						border: `1px solid ${theme.border}`,
						borderRadius: 22,
						padding: 22,
					}}
				>
					<Heading>📅 احجز موعدك</Heading>
					<div
						style={{
							fontSize: 19,
							color: theme.muted,
							marginBottom: 12,
							textAlign: 'right',
						}}
					>
						اختر اليوم
					</div>
					<div style={{display: 'flex', gap: 7, justifyContent: 'space-between'}}>
						{days.map(([d, n]) => (
							<div
								key={n}
								style={{
									flex: 1,
									background: theme.cream,
									border: `1px solid ${theme.border}`,
									borderRadius: 12,
									padding: '12px 0',
									textAlign: 'center',
								}}
							>
								<div style={{fontSize: 15, color: theme.muted}}>{d}</div>
								<div style={{fontSize: 26, fontWeight: 900, color: theme.ink}}>
									{n}
								</div>
								<div style={{fontSize: 13, color: theme.muted}}>جوان</div>
							</div>
						))}
					</div>
					<div
						style={{
							background: theme.whatsapp,
							color: theme.white,
							borderRadius: 14,
							padding: '16px 0',
							fontSize: 24,
							fontWeight: 800,
							textAlign: 'center',
							marginTop: 16,
						}}
					>
						احجز عبر واتساب
					</div>
				</div>
			</div>

			{/* Footer */}
			<div
				style={{
					textAlign: 'center',
					padding: '26px 0',
					fontSize: 18,
					color: theme.muted,
				}}
			>
				صُنع بواسطة <span style={{fontWeight: 800}}>san3apages</span>
			</div>
		</div>
	);
};
