import {FeatureLayout} from '../components/FeatureLayout';
import {InvoiceMockup} from '../components/InvoiceMockup';

export const FeatureInvoice: React.FC = () => {
	return (
		<FeatureLayout
			step="في لوحة التحكم"
			visual={<InvoiceMockup />}
			title={
				<>
					فواتير PDF
					<br />
					احترافية
				</>
			}
			subtitle="ولّد فاتورة لزبونك في ثانية"
		/>
	);
};
