/* eslint-disable @typescript-eslint/no-var-requires */

const { fontFamily, spacing } = require('tailwindcss/defaultTheme');

module.exports = {
	purge: {
		content: ['./src/**/*.ts', './src/**/*.tsx'],
		fontFace: true,
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			primary: '#D73732',
			gray: {
				DEFAULT: '#F3F0EA',
			},
			black: {
				DEFAULT: '#000',
				half: '#00000080',
			},
			white: '#fff',
		},
		extend: {
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
	plugins: [require('@tailwindcss/typography'), centers],
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
