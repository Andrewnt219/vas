/* eslint-disable @typescript-eslint/no-var-requires */

const {
	fontFamily,
	spacing,
	transitionProperty,
} = require('tailwindcss/defaultTheme');
const _ = require('lodash');

module.exports = {
	purge: {
		content: ['./src/**/*.ts', './src/**/*.tsx'],
		fontFace: true,
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		boxShadow: {
			card: '10px 10px 50px 3px rgba(39, 92, 141, 0.1)',
		},
		colors: {
			primary: '#D73732',

			gray: {
				DEFAULT: '#F3F0EA',
				100: '#F6F6F6',
				200: '#6B7280',
				300: '#7A7A7A',
			},
			black: {
				DEFAULT: '#000',
				half: '#00000080',
			},
			white: '#fff',
			transparent: 'transparent',
			current: 'currentColor',
		},
		extend: {
			maxWidth: {
				'8xl': '105rem',
			},
			transitionProperty: {
				colors: transitionProperty.colors + ', text-decoration-color',
			},
			spacing: {
				'2xs': '42.5%',
				xs: '56.25%',
				sm: '75%',
				full: '100%',
				xl: '125%',
				'2xl': '150%',
				'3xl': '175%',
				'4xl': '200%',
			},
			fontSize: {
				body: ['0.875rem', { lineHeight: '1.43' }],
				subtitle: ['0.875rem', { lineHeight: '1.46' }],
				nav: ['1.25rem', { lineHeight: '1.3' }],
				newsBody: ['1.4375rem', { lineHeight: '1.3' }],
				title: ['2.25rem', { lineHeight: '1.3' }],
				h3: ['3rem', { lineHeight: '1.3' }],
				h1: ['4rem', { lineHeight: '1.3' }],
			},

			fontFamily: {
				sans: ['DM Sans', ...fontFamily.sans],
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.gray.700'),
						a: {
							color: theme('colors.blue.500'),
							'&:hover': {
								color: theme('colors.blue.700'),
							},
							code: { color: theme('colors.blue.400') },
						},
						'h2,h3,h4': {
							'scroll-margin-top': spacing[32],
						},
						code: { color: theme('colors.pink.500') },
						'blockquote p:first-of-type::before': false,
						'blockquote p:last-of-type::after': false,
					},
				},
			}),
		},
	},
	variants: {
		extend: {
			alignSelf: ['even'],
			backgroundColor: ['active'],
			backgroundOpacity: ['active'],
		},
	},
	corePlugins: {
		float: false,
		container: false,
		clear: false,
		order: false,
	},
	plugins: [
		require('@tailwindcss/typography'),
		centers,
		grid,
		sizing,
		commons,
		decorator,
	],
};

function commons({ addUtilities }) {
	addUtilities({
		'.content': {
			content: '""',
		},
	});
}

function centers({ addComponents }) {
	addComponents({
		'.position-center': {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		},
		'.flex-center': {
			display: 'flex',
			'justify-content': 'center',
			'align-items': 'center',
		},
	});
}

function grid({ addComponents }) {
	addComponents({
		'.grid-p-sm': {
			'grid-column': '2/12',
		},
		'.grid-p-md': {
			'grid-column': '4/10',
		},
		'.grid-p-lg': {
			'grid-column': '6/8',
		},
	});
}

function sizing({ addComponents }) {
	addComponents({
		'.absolute-cover': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
		},
	});
}

function decorator({ addUtilities, e, theme, variants }) {
	const colors = theme('colors', {});
	const decorationVariants = variants('textDecoration', []);

	const textDecorationColorUtility = _.map(colors, (color, name) => ({
		[`.decorator-${e(name)}`]: {
			textDecorationColor: `${color}`,
		},
	}));

	addUtilities(textDecorationColorUtility, decorationVariants);
}
