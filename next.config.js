/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
	webpack: (config, { isServer }) => {
		// Fixes packages that depend on fs/module module
		if (!isServer) {
			config.node = { fs: 'empty', module: 'empty' };
		}

		return config;
	},
};

module.exports = withPlugins([bundleAnalyzer], nextConfig);
