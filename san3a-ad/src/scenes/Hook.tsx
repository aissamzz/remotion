import {Rise} from '../components/Rise';
import {theme} from '../theme';
import {fontFamily} from '../fonts';

export const Hook: React.FC = () => {
	return (
		<div style={{textAlign: 'center', fontFamily}}>
			<Rise delay={0}>
				<div
					style={{
						display: 'inline-block',
						background: theme.amber,
						color: theme.terracottaDeep,
						fontSize: 34,
						fontWeight: 700,
						padding: '14px 32px',
						borderRadius: 999,
						marginBottom: 44,
					}}
				>
					للحرفيين والصنايعية الجزائريين
				</div>
			</Rise>

			<Rise delay={8}>
				<div
					style={{
						fontSize: 104,
						fontWeight: 900,
						color: theme.ink,
						lineHeight: 1.18,
					}}
				>
					عندك <span style={{color: theme.terracotta}}>صنعة</span>؟
				</div>
			</Rise>

			<Rise delay={18}>
				<div
					style={{
						fontSize: 72,
						fontWeight: 700,
						color: theme.ink,
						lineHeight: 1.3,
						marginTop: 10,
					}}
				>
					أعطيها حضور رقمي
					<br />
					في دقائق
				</div>
			</Rise>
		</div>
	);
};
