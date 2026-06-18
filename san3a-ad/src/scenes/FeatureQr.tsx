import {FeatureLayout} from '../components/FeatureLayout';
import {QrCode} from '../components/QrCode';
import {theme} from '../theme';

export const FeatureQr: React.FC = () => {
	return (
		<FeatureLayout
			step="شارك صفحتك"
			visual={
				<div style={{display: 'grid', placeItems: 'center', gap: 20}}>
					<QrCode size={300} />
					<span
						style={{
							direction: 'ltr',
							fontSize: 28,
							fontWeight: 800,
							color: theme.terracotta,
						}}
					>
						san3apages.com/it9an-demo
					</span>
				</div>
			}
			title={
				<>
					رمز QR
					<br />
					لمشاركة سهلة
				</>
			}
			subtitle="علّقه في محلك وخلي الزبائن يمسحوه"
		/>
	);
};
