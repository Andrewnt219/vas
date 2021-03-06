import tw, { css } from 'twin.macro';

export const bodyFontFace = css`
	/* dm-sans-regular - latin */
	@font-face {
		font-family: 'DM Sans';
		font-display: 'swap';
		font-style: normal;
		font-weight: 400;
		src: local(''), url('/fonts/dm-sans-v6-latin-regular.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/dm-sans-v6-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* dm-sans-italic - latin */
	@font-face {
		font-family: 'DM Sans';
		font-display: 'swap';
		font-style: italic;
		font-weight: 400;
		src: local(''), url('/fonts/dm-sans-v6-latin-italic.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/dm-sans-v6-latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* dm-sans-500 - latin */
	@font-face {
		font-family: 'DM Sans';
		font-display: 'swap';
		font-style: normal;
		font-weight: 500;
		src: local(''), url('/fonts/dm-sans-v6-latin-500.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/dm-sans-v6-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* dm-sans-500italic - latin */
	@font-face {
		font-family: 'DM Sans';
		font-display: 'swap';
		font-style: italic;
		font-weight: 500;
		src: local(''),
			url('/fonts/dm-sans-v6-latin-500italic.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/dm-sans-v6-latin-500italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* dm-sans-700 - latin */
	@font-face {
		font-family: 'DM Sans';
		font-display: 'swap';
		font-style: normal;
		font-weight: 700;
		src: local(''), url('/fonts/dm-sans-v6-latin-700.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/dm-sans-v6-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* dm-sans-700italic - latin */
	@font-face {
		font-family: 'DM Sans';
		font-display: 'swap';
		font-style: italic;
		font-weight: 700;
		src: local(''),
			url('/fonts/dm-sans-v6-latin-700italic.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/dm-sans-v6-latin-700italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
`;

export const typographyStyles = css`
	/* :root {
		${tw`md:text-xl xl:text-2xl 2xl:text-3xl`}
	} */

	html:lang(vi-VN) {
		font-family: 'san-serif';
	}

	body {
		${tw`text-body`}
	}

	${bodyFontFace}
`;
