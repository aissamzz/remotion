import {IconBadge} from '../components/IconBadge';
import {FeatureLayout} from '../components/FeatureLayout';
import {theme} from '../theme';

export const FeatureWhatsApp: React.FC = () => {
	return (
		<FeatureLayout
			step="② المواعيد"
			visual={
				<IconBadge bg={theme.whatsapp} size={230}>
					💬
				</IconBadge>
			}
			title={
				<>
					حجز المواعيد
					<br />
					عبر واتساب
				</>
			}
			subtitle="زبائنك يحجزو موعدهم مباشرة بضغطة وحدة"
		/>
	);
};
