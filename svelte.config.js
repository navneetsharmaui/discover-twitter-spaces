/* jshint esversion: 11 */

import vercel from '@sveltejs/adapter-vercel';

import preprocess from 'svelte-preprocess';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Custom __dirname as replacement for the __dirname from the commonJS in ES Module
const __dirname = dirname(fileURLToPath(import.meta.url)); // jshint ignore:line

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true,
			preserve: ['module', 'ld+json'],
		}),
	],

	kit: {
		adapter: vercel(),

		trailingSlash: 'always',

		prerender: {
			crawl: true,
			enabled: true,
			onError: 'fail',
			entries: ['*'],
			concurrency: 10,
		},
		csp: {
			mode: 'auto',
			directives: {
				'img-src': ['localhost:*', 'https:'],
				'script-src': ['localhost:*', 'self', 'strict-dynamic'],
				'font-src': ['localhost:*', 'https:', 'www.gstatic.com'],
				'style-src': ['localhost:*', 'self', 'strict-dynamic', 'unsafe-inline'],
				'connect-src': ['localhost:*', 'self'],
				'prefetch-src': ['localhost:*', 'self'],
				'base-uri': ['localhost:*', 'self'],
				'form-action': ['localhost:*', 'self'],
				'manifest-src': ['localhost:*', 'self'],
				'worker-src': ['localhost:*', 'self'],
			},
		},
		methodOverride: {
			parameter: '_method',
			allowed: ['PUT', 'PATCH', 'DELETE'],
		},
		version: {
			name: Date.now().toString(),
			pollInterval: 0,
		},
		vite: () => ({
			resolve: {
				alias: {
					$stores: resolve(__dirname, './src/stores'),
					$components: resolve(__dirname, './src/lib/shared/components'),
					$ui: resolve(__dirname, './src/lib/shared/ui'),
					$shared: resolve(__dirname, './src/lib/shared'),
					$models: resolve(__dirname, './src/lib/models'),
					$data: resolve(__dirname, './src/lib/data'),
					$core: resolve(__dirname, './src/lib/core'),
					$utils: resolve(__dirname, './src/lib/utils'),
					$environment: resolve(__dirname, './src/environments'),
				},
			},
			envPrefix: ['VITE_', 'DISCOVER_'],
			build: {
				minify: 'terser',
				brotliSize: true,
				terserOptions: {
					module: true,
				},
			},
			optimizeDeps: {
				include: [
					'reflect-metadata',
					'tsyringe',
					'ioredis',
					'isomorphic-fetch',
					'lz-string',
				],
				entries: [
					'reflect-metadata',
					'tsyringe',
					'ioredis',
					'isomorphic-fetch',
					'lz-string',
				],
			},
		}),
	},
};

export default config;
