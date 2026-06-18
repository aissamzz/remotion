import {QrCode} from '../components/QrCode';
import {FeatureLayout} from '../components/FeatureLayout';

export const FeatureQr: React.FC = () => {
	return (
		<FeatureLayout
			step="④ المشاركة"
			visual={<QrCode size={300} />}
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
