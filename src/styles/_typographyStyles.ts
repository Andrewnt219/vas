import { css } from 'twin.macro';

const fontFace = css`
	/* montserrat-300 - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 300;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-300.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-300.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-300italic - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: italic;
		font-weight: 300;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-300italic.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-300italic.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-regular - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-regular.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-regular.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-italic - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: italic;
		font-weight: 400;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-italic.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-italic.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-500 - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 500;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-500.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-500.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-500italic - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: italic;
		font-weight: 500;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-500italic.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-500italic.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-600 - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-600.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-600.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-600italic - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: italic;
		font-weight: 600;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-600italic.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-600italic.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-700 - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 700;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-700.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-700.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-700italic - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: italic;
		font-weight: 700;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-700italic.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-700italic.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-800 - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 800;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-800.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-800.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-800italic - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: italic;
		font-weight: 800;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-800italic.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-800italic.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-900 - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 900;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-900.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-900.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* montserrat-900italic - vietnamese_latin */
	@font-face {
		font-family: 'Montserrat';
		font-style: italic;
		font-weight: 900;
		src: local(''),
			url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-900italic.woff2')
				format('woff2'),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url('/fonts/Montserrat/montserrat-v15-vietnamese_latin-900italic.woff')
				format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
`;

export const _typography = css`
	:root {
		font-size: max(100%, 1.25vw);
		font-family: 'Montserrat', sans-serif;
		${fontFace}
	}

	body {
		color: hsla(var(--text-hsl));
	}
`;
