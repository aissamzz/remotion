import {loadFont} from '@remotion/google-fonts/Cairo';
import type {CSSProperties} from 'react';

const {fontFamily} = loadFont('normal', {
	weights: ['400', '600', '700', '900'],
	subsets: ['arabic', 'latin'],
});

/**
 * Cairo carries the Arabic and the Latin numerals in one family, so Darija copy
 * and prices like `4.500 دج` never mix typefaces mid-line.
 */
export const ARABIC_FONT_FAMILY = fontFamily;

/** Every Darija string in the ad renders right-to-left. */
export const RTL: CSSProperties = {
	direction: 'rtl',
	fontFamily: ARABIC_FONT_FAMILY,
};
