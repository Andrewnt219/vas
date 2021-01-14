import { css } from 'twin.macro';

const fontFace = css`
	/* lato-300 - latin */
	@font-face {
		font-family: 'Lato';
		font-style: normal;
		font-weight: 300;
		src: local(''), url('/fonts/Lato/lato-v17-latin-300.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Lato/lato-v17-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* lato-300italic - latin */
	@font-face {
		font-family: 'Lato';
		font-style: italic;
		font-weight: 300;
		src: local(''),
			url('/fonts/Lato/lato-v17-latin-300italic.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Lato/lato-v17-latin-300italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* lato-regular - latin */
	@font-face {
		font-family: 'Lato';
		font-style: normal;
		font-weight: 400;
		src: local(''),
			url('/fonts/Lato/lato-v17-latin-regular.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Lato/lato-v17-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* lato-italic - latin */
	@font-face {
		font-family: 'Lato';
		font-style: italic;
		font-weight: 400;
		src: local(''),
			url('/fonts/Lato/lato-v17-latin-italic.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Lato/lato-v17-latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* lato-700 - latin */
	@font-face {
		font-family: 'Lato';
		font-style: normal;
		font-weight: 700;
		src: local(''), url('/fonts/Lato/lato-v17-latin-700.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Lato/lato-v17-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* lato-700italic - latin */
	@font-face {
		font-family: 'Lato';
		font-style: italic;
		font-weight: 700;
		src: local(''),
			url('/fonts/Lato/lato-v17-latin-700italic.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Lato/lato-v17-latin-700italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* lato-900 - latin */
	@font-face {
		font-family: 'Lato';
		font-style: normal;
		font-weight: 900;
		src: local(''), url('/fonts/Lato/lato-v17-latin-900.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Lato/lato-v17-latin-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* lato-900italic - latin */
	@font-face {
		font-family: 'Lato';
		font-style: italic;
		font-weight: 900;
		src: local(''),
			url('/fonts/Lato/lato-v17-latin-900italic.woff2') format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Lato/lato-v17-latin-900italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
`;

export const _typography = css`
	:root {
		font-size: max(100%, 1.25vw);
		font-family: 'Lato', sans-serif;
		${fontFace}
	}

	body {
		color: hsla(var(--text-hsl));
	}
`;
