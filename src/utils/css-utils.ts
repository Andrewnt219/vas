import { css } from 'twin.macro';

export const lqipBackground = (lqip: string) => css`
	background-image: url(${lqip});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
`;

// https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4#gistcomment-3036936
export function percentageToHex(percentage: number): string {
	const intValue = Math.round((percentage / 100) * 255); // map percent to nearest integer (0 - 255)
	const hexValue = intValue.toString(16); // get hexadecimal representation
	return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
}
