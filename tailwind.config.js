/* eslint-disable @typescript-eslint/no-var-requires */

const { fontFamily, transitionProperty } = require('tailwindcss/defaultTheme');
const _ = require('lodash');
const { spacing } = require('tailwindcss/defaultTheme');

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
        300: '#7A7A7A',
        400: '#EEE',
      },
      black: '#000',
      white: '#fff',
      transparent: 'transparent',
      current: 'currentColor',
    },
    extend: {
      borderRadius: {
        '4xl': '3.125rem',
      },
      textColor: {
        skin: {
          base: '#424851',
          muted: '#6B7280',
        },
      },
      backgroundColor: {
        skin: {
          light: '#F2F3F3',
          dark: '#424851',
        },
      },
      borderColor: {
        skin: {
          light: '#424851',
        },
      },
      transitionProperty: {
        colors: transitionProperty.colors + ', text-decoration-color',
      },
      margin: {
        sm: spacing[4],
        md: spacing[7],
        lg: spacing[12],
      },
      padding: {
        '2xs': '42.5%',
        xs: '56.25%',
        sm: '75%',
        full: '100%',
        xl: '125%',
        '2xl': '150%',
        '3xl': '175%',
        '4xl': '200%',
      },
      width: {
        larger: '150%',
      },
      fontSize: {
        body: ['0.875rem', { lineHeight: '1.43' }],
        subtitle: ['0.875rem', { lineHeight: '1.46' }],
        nav: ['1.25rem', { lineHeight: '1.3' }],
        newsBody: ['1.4375rem', { lineHeight: '1.3' }],
        title: ['2.25rem', { lineHeight: '1.3' }],
      },

      fontFamily: {
        sans: ['Nunito Sans', ...fontFamily.sans],
        viSans: ['Inter', ...fontFamily.sans],
      },
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
  plugins: [centers, grid, sizing, commons, decorator, fonts],
};

function commons({ addComponents }) {
  addComponents({
    '.content': {
      content: '""',
    },
  });
}

function fonts({ addComponents, theme }) {
  addComponents({
    '.font-inherit': {
      font: 'inherit',
    },
    '.text-smaller': {
      fontSize: 'smaller',
    },
    '.text-larger': {
      fontSize: 'larger',
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

function sizing({ addComponents, theme }) {
  addComponents({
    '.absolute-cover': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    '.img-absolute': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',
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
