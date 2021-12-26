/* jshint esversion: 11 */

module.exports = {
	'*.{js,ts,json,svelte}': ['pnpm run format', 'git add'],
	'./src/**/*.{svelte,ts}': ['pnpm run format', 'pnpm run lint:fix', 'git add'],
	'./.{ts,cjs,js}': ['pnpm run lint:fix', 'git add'],
};
