/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});
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

		// For linting in terminal
		if (dev) {
			config.plugins.push(new ESLintPlugin(eslintOptions));
		}

		return config;
	},
};

module.exports = withPlugins([bundleAnalyzer], nextConfig);
