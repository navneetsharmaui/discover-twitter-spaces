/* jshint esversion: 11 */

const path = require('path');
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-svelte-csf',
		'@storybook/addon-cssresources',
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss'),
				},
			},
		},
	],
	framework: '@storybook/svelte',
	svelteOptions: {
		preprocess: [
			sveltePreprocess({
				postcss: true,
				preserve: ['module', 'ld+json'],
			}),
		],
	},

	webpackFinal: async (config, { configType }) => {
		config.resolve.alias = {
			...config.resolve.alias,
			$stores: path.resolve(__dirname, '../src/stores'),
			$components: path.resolve(__dirname, '../src/lib/shared/components'),
			$ui: path.resolve(__dirname, '../src/lib/shared/ui'),
			$shared: path.resolve(__dirname, '../src/lib/shared'),
			$models: path.resolve(__dirname, '../src/lib/models'),
			$data: path.resolve(__dirname, '../src/lib/data'),
			$core: path.resolve(__dirname, '../src/lib/core'),
			$utils: path.resolve(__dirname, '../src/lib/utils'),
			$environment: path.resolve(__dirname, '../src/environments'),
		};

		return config;
	},
};
