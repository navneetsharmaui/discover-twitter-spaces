/* jshint esversion: 11 */

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command: 'yarn run preview',
		port: 3000,
	},
};

export default config;
