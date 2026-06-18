import {theme} from '../theme';
import {fontFamily} from '../fonts';

// A stylized PDF invoice "paper" for the invoice-generation feature scene.
const items: [string, string][] = [
	['مطبخ خشب على المقاس', '120.000'],
	['باب خشب داخلي', '22.000'],
];

const Row: React.FC<{label: string; value: string; bold?: boolean}> = ({
	label,
	value,
	bold,
}) => (
	<div
		style={{
			display: 'flex',
			justifyContent: 'space-between',
			fontSize: bold ? 26 : 22,
			fontWeight: bold ? 900 : 600,
			color: bold ? theme.ink : theme.muted,
			padding: '12px 0',
			borderTop: bold ? `2px solid ${theme.ink}` : `1px solid ${theme.border}`,
		}}
	>
		<span>{label}</span>
		<span style={{color: bold ? theme.terracotta : theme.ink}}>{value} دج</span>
	</div>
);

export const InvoiceMockup: React.FC = () => {
	return (
		<div
			style={{
				width: 380,
				background: theme.white,
				borderRadius: 22,
				padding: '30px 32px 34px',
				fontFamily,
				direction: 'rtl',
				boxShadow: '0 36px 80px rgba(58,46,37,0.28)',
				transform: 'rotate(-3deg)',
				position: 'relative',
			}}
		>
			{/* PDF badge */}
			<div
				style={{
					position: 'absolute',
					top: -16,
					left: -16,
					background: '#c0392b',
					color: theme.white,
					fontWeight: 900,
					fontSize: 22,
					padding: '8px 16px',
					borderRadius: 12,
					boxShadow: '0 8px 20px rgba(192,57,43,0.4)',
					direction: 'ltr',
				}}
			>
				PDF
			</div>

			{/* header */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					marginBottom: 22,
				}}
			>
				<div>
					<div style={{fontSize: 30, fontWeight: 900, color: theme.ink}}>
						فاتورة
					</div>
					<div style={{fontSize: 18, color: theme.muted, marginTop: 4}}>
						رقم 0042 · 18 جوان
					</div>
				</div>
				<div
					style={{
						width: 54,
						height: 54,
						borderRadius: 14,
						background: theme.amber,
						display: 'grid',
						placeItems: 'center',
						fontSize: 30,
					}}
				>
					🪚
				</div>
			</div>

			<div
				style={{
					fontSize: 20,
					fontWeight: 700,
					color: theme.ink,
					marginBottom: 14,
				}}
			>
				ورشة الإتقان
			</div>

			{items.map(([label, value]) => (
				<Row key={label} label={label} value={value} />
			))}
			<Row label="المجموع" value="142.000" bold />

			<div
				style={{
					marginTop: 22,
					background: theme.terracotta,
					color: theme.white,
					textAlign: 'center',
					borderRadius: 14,
					padding: '14px 0',
					fontSize: 22,
					fontWeight: 800,
				}}
			>
				⬇︎ تحميل PDF
			</div>
		</div>
	);
};
