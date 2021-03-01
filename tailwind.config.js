/* eslint-disable @typescript-eslint/no-var-requires */

const { fontFamily, spacing } = require('tailwindcss/defaultTheme');

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
			spacing: {
				'2xs': '42.5%',
				xs: '56.25%',
				full: '100%',
				xl: '125%',
				'2xl': '150%',
				'3xl': '175%',
				'4xl': '200%',
			},
			fontSize: {
				body: ['0.875rem', { lineHeight: '1.46' }],
				subtitle: ['0.875rem', { lineHeight: '1.46' }],
				nav: '1.25rem',
				newsBody: '1.4375rem',
				title: '2.25rem',
				h3: '3rem',
				h1: '4rem',
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

	corePlugins: {
		float: false,
		container: false,
		clear: false,
		order: false,
	},
	plugins: [require('@tailwindcss/typography'), centers, grid, sizing],
};

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
