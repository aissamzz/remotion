import {FeatureLayout} from '../components/FeatureLayout';
import {PhoneMockup} from '../components/PhoneMockup';
import {theme} from '../theme';

export const FeatureLink: React.FC = () => {
	return (
		<FeatureLayout
			step="① صفحتك"
			visual={<PhoneMockup scale={0.74} />}
			title={
				<>
					رابط واحد
					<br />
					يجمع كل أعمالك
				</>
			}
			subtitle={
				<span style={{direction: 'ltr', color: theme.terracotta, fontWeight: 800}}>
					san3apages.com/اسمك
				</span>
			}
		/>
	);
};
