/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextTranslate = require('next-translate');
const nextOptimizedImages = require('next-optimized-images');
const nextPwa = require('next-pwa');

const eslintOptions = {
  extensions: ['js', 'jsx', 'tsx', 'ts'],
};

const pwaConfig = {
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    publicExcludes: ['!*.jpg', '!*.png', '!*.svg', '!svg', '!images'],
    buildExcludes: [/chunks\/images\/.*$/, /static\/images\/.*$/],
  },
};

const nextConfig = {
  future: {
    webpack5: true,
  },
};

module.exports = withPlugins(
  [bundleAnalyzer, nextOptimizedImages, [nextPwa, pwaConfig]],
  nextTranslate(nextConfig)
);
