import {loadFont} from '@remotion/google-fonts/Cairo';

// Cairo ships an Arabic subset — the brand font used across san3apages.com.
const cairo = loadFont('normal', {
	weights: ['400', '600', '700', '900'],
	subsets: ['arabic', 'latin'],
});

export const fontFamily = cairo.fontFamily;
