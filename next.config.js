/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});
const nextTranslate = require('next-translate');
const nextOptimizedImages = require('next-optimized-images');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

const eslintOptions = {
	extensions: ['js', 'jsx', 'tsx', 'ts'],
};

const nextConfig = {
	webpack: (config, { isServer, dev }) => {
		// Fixes packages that depend on fs/module module
		if (!isServer) {
			config.node = { fs: 'empty', module: 'empty' };
		}

		// for next-optimized-images
		config.resolve.alias.images = path.join(__dirname, '/images');

		// For linting in terminal
		if (dev) {
			config.plugins.push(new ESLintPlugin(eslintOptions));
		}

		return config;
	},
};

module.exports = withPlugins(
	[bundleAnalyzer, nextOptimizedImages],
	nextTranslate(nextConfig)
);
