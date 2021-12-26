/* jshint esversion: 11 */

module.exports = {
	plugins: [require('prettier-plugin-svelte')],
	useTabs: true,
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 100,
	tabWidth: 4,
	arrowParens: 'always',
	bracketSpacing: true,
	svelteStrictMode: true,
	svelteSortOrder: 'options-styles-scripts-markup',
	svelteAllowShorthand: false,
	svelteIndentScriptAndStyle: true,
	htmlWhitespaceSensitivity: 'strict',
	semi: true,
	jsxSingleQuote: true,
	overrides: [
		{
			files: '*.ts',
			options: {
				parser: 'typescript',
			},
		},
		{
			files: '*.svelte',
			options: {
				svelteStrictMode: true,
				parser: 'svelte',
			},
		},
	],
};
