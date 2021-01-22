/* eslint-disable @typescript-eslint/no-var-requires */

const { fontFamily, spacing } = require('tailwindcss/defaultTheme');

module.exports = {
	purge: {
		content: ['./src/**/*.ts', './src/**/*.tsx'],
		fontFace: true,
	},
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans],
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
				dark: {
					css: {
						color: theme('colors.gray.300'),
						a: {
							color: theme('colors.blue.400'),
							'&:hover': {
								color: theme('colors.blue.600'),
							},
							code: { color: theme('colors.blue.400') },
						},
						blockquote: {
							borderLeftColor: theme('colors.gray.700'),
							color: theme('colors.gray.300'),
						},
						'h2,h3,h4': {
							color: theme('colors.gray.100'),
							'scroll-margin-top': spacing[32],
						},
						hr: { borderColor: theme('colors.gray.700') },
						ol: {
							li: {
								'&:before': { color: theme('colors.gray.500') },
							},
						},
						ul: {
							li: {
								'&:before': { backgroundColor: theme('colors.gray.500') },
							},
						},
						strong: { color: theme('colors.gray.300') },
						thead: {
							color: theme('colors.gray.100'),
						},
						tbody: {
							tr: {
								borderBottomColor: theme('colors.gray.700'),
							},
						},
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
