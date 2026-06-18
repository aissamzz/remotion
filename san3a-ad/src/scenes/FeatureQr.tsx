import {QrCode} from '../components/QrCode';
import {FeatureLayout} from '../components/FeatureLayout';

export const FeatureQr: React.FC = () => {
	return (
		<FeatureLayout
			step="في لوحة التحكم"
			visual={<QrCode size={290} />}
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
