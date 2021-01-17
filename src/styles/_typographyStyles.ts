import { css, theme } from 'twin.macro';

const fontFace = css`
	/* roboto-regular - vietnamese_latin */
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		src: local(''),
			url('/fonts/Roboto/roboto-v20-vietnamese_latin-regular.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Roboto/roboto-v20-vietnamese_latin-regular.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-italic - vietnamese_latin */
	@font-face {
		font-family: 'Roboto';
		font-style: italic;
		font-weight: 400;
		src: local(''),
			url('/fonts/Roboto/roboto-v20-vietnamese_latin-italic.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Roboto/roboto-v20-vietnamese_latin-italic.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-500 - vietnamese_latin */
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		src: local(''),
			url('/fonts/Roboto/roboto-v20-vietnamese_latin-500.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Roboto/roboto-v20-vietnamese_latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-500italic - vietnamese_latin */
	@font-face {
		font-family: 'Roboto';
		font-style: italic;
		font-weight: 500;
		src: local(''),
			url('/fonts/Roboto/roboto-v20-vietnamese_latin-500italic.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Roboto/roboto-v20-vietnamese_latin-500italic.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-700 - vietnamese_latin */
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 700;
		src: local(''),
			url('/fonts/Roboto/roboto-v20-vietnamese_latin-700.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Roboto/roboto-v20-vietnamese_latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-700italic - vietnamese_latin */
	@font-face {
		font-family: 'Roboto';
		font-style: italic;
		font-weight: 700;
		src: local(''),
			url('/fonts/Roboto/roboto-v20-vietnamese_latin-700italic.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Roboto/roboto-v20-vietnamese_latin-700italic.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-900 - vietnamese_latin */
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 900;
		src: local(''),
			url('/fonts/Roboto/roboto-v20-vietnamese_latin-900.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Roboto/roboto-v20-vietnamese_latin-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-900italic - vietnamese_latin */
	@font-face {
		font-family: 'Roboto';
		font-style: italic;
		font-weight: 900;
		src: local(''),
			url('/fonts/Roboto/roboto-v20-vietnamese_latin-900italic.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Roboto/roboto-v20-vietnamese_latin-900italic.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
`;

export const _typography = css`
	:root {
		font-size: 62.5%;
		font-family: 'Roboto', sans-serif;
		${fontFace}

		@media screen and (min-width: ${theme`screens.xs`}) {
			font-size: 75%;
		}

		@media screen and (min-width: ${theme`screens.sm`}) {
			font-size: 75%;
		}

		@media screen and (min-width: ${theme`screens.md`}) {
			font-size: 81.25%;
		}

		@media screen and (min-width: ${theme`screens.lg`}) {
			font-size: 100%;
		}

		@media screen and (min-width: ${theme`screens.xl`}) {
			font-size: 125%;
		}

		@media screen and (min-width: ${theme`screens.2xl`}) {
			font-size: 150%;
		}

		@media screen and (min-width: ${theme`screens.3xl`}) {
			font-size: 150%;
		}

		@media screen and (min-width: ${theme`screens.wqhd`}) {
			font-size: 200%;
		}

		@media screen and (min-width: ${theme`screens.4k`}) {
			font-size: 300%;
		}

		@media screen and (min-width: ${theme`screens.8k`}) {
			font-size: 600%;
		}
	}

	html,
	body {
		color: hsla(var(--text-hsl));
	}
`;
