/* jshint esversion: 11 */

const { withInfo } = require('@storybook/addon-info');
// import '!style-loader!css-loader!sass-loader!./scss-loader.scss';

// Global CSS Imports
import '../src/styles/tailwind.css';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	decorators: [withInfo],
};
