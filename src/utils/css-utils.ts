import { css } from 'twin.macro';

export const lqipBackground = (lqip: string) => css`
	background-image: url(${lqip});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
`;
