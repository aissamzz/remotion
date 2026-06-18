import {IconBadge} from '../components/IconBadge';
import {FeatureLayout} from '../components/FeatureLayout';

export const FeatureInvoice: React.FC = () => {
	return (
		<FeatureLayout
			step="③ الفوترة"
			visual={<IconBadge size={230}>🧾</IconBadge>}
			title={
				<>
					فواتير PDF
					<br />
					احترافية
				</>
			}
			subtitle="ولّد فاتورة منسقة لزبونك في ثانية"
		/>
	);
};
