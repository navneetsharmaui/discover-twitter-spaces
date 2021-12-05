import { EnvironmentName } from '$models/enums/environment-name.enum';
import { EnvironmentType } from '$models/enums/environment-type.enum';
import type { SVELTEKIT_STARTER_ENPOINT_CONFIG } from '$models/types/sveltekit-endpoits.type';
import type { ISveltekitStarterEnvironmentConfig } from '$models/interfaces/isveltekit-strater-environment.interface';

export const environment: ISveltekitStarterEnvironmentConfig<SVELTEKIT_STARTER_ENPOINT_CONFIG> = {
	name: EnvironmentName.LOCAL,
	environmentType: EnvironmentType.LOCAL,
	production: false,
	isDebugMode: true,
	launchURL: `${import.meta.env.SVELTEKIT_BLOG_BASE_URL}`,
	twitterConfig: {
		TWITTER_TOKEN: `${import.meta.env.DISCOVER_TWITTER_TOKEN}`,
		TWITTER_BASE_API_URL: `${import.meta.env.DISCOVER_TWITTER_BASE_API_URL}`,
	},
};
