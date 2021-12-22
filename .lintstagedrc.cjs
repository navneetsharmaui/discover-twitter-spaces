/* jshint esversion: 11 */

module.exports = {
	'*.{js,ts,json,svelte}': ['yarn run format', 'git add'],
	'./src/**/*.{svelte,ts}': ['yarn run format', 'yarn run lint:fix', 'git add'],
	'./.{ts,cjs,js}': ['yarn run lint:fix', 'git add'],
};
