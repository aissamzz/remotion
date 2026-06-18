import {Rise} from '../components/Rise';
import {theme} from '../theme';
import {fontFamily} from '../fonts';

export const Pricing: React.FC = () => {
	return (
		<div style={{textAlign: 'center', fontFamily, width: '100%'}}>
			<Rise delay={0}>
				<div style={{fontSize: 50, fontWeight: 700, color: theme.ink}}>
					كل هذا بـ
				</div>
			</Rise>

			<Rise delay={8} style={{marginTop: 20}}>
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'baseline',
						gap: 18,
						background: theme.card,
						border: `4px solid ${theme.terracotta}`,
						borderRadius: 44,
						padding: '46px 70px',
						boxShadow: '0 30px 70px rgba(58,46,37,0.18)',
					}}
				>
					<span
						style={{fontSize: 170, fontWeight: 900, color: theme.terracotta}}
					>
						4500
					</span>
					<span style={{fontSize: 56, fontWeight: 800, color: theme.ink}}>
						دج
					</span>
				</div>
			</Rise>

			<Rise delay={16} style={{marginTop: 26}}>
				<div style={{fontSize: 52, fontWeight: 700, color: theme.muted}}>
					في السنة فقط
				</div>
			</Rise>

			<Rise delay={26} style={{marginTop: 44}}>
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 16,
						background: theme.amber,
						color: theme.terracottaDeep,
						fontSize: 42,
						fontWeight: 800,
						padding: '22px 44px',
						borderRadius: 999,
					}}
				>
					🔑 مفتاح تفعيل تشريه كاش
				</div>
			</Rise>
		</div>
	);
};
