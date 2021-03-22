import tw, { css } from 'twin.macro';

export const scaleImageCss = css`
	img {
		${tw`transition-transform`}
	}
	:hover img {
		${tw`transform scale-110`};
	}
`;
