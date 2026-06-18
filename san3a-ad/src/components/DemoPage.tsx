import {Img, staticFile} from 'remotion';

// The real public page screenshot (san3apages.com/it9an-demo), captured at a
// 430px mobile width. Natural size 430×1662; the device viewport is 430×932.
export const PAGE_WIDTH = 430;
export const PAGE_HEIGHT = 1662;
export const VIEWPORT_H = 932; // exact device screen height the user captured at

// Scroll targets (translateY) framing each real section in the 932px viewport.
// Max scroll = PAGE_HEIGHT - VIEWPORT_H = 730.
export const SECTION_Y = {
	profile: 0, // cover + logo + name + description + buttons
	services: 360, // الخدمات والأسعار
	gallery: 560, // معرض الأعمال
	appointment: 730, // احجز موعدك (date picker) + footer
} as const;

export const DemoPage: React.FC = () => {
	return (
		<Img
			src={staticFile('demo.png')}
			style={{width: PAGE_WIDTH, display: 'block'}}
		/>
	);
};
