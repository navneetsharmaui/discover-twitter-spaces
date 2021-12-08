import { EnvironmentName } from '$models/enums/environment-name.enum';
import { EnvironmentType } from '$models/enums/environment-type.enum';
import type { DISCOVER_ENPOINT_CONFIG } from '$lib/models/types/discover-endpoits.type';
import type { IDiscoverEnvironmentConfig } from '$lib/models/interfaces/idiscover-environment.interface';

export const environment: IDiscoverEnvironmentConfig<DISCOVER_ENPOINT_CONFIG> = {
	name: EnvironmentName.DEVELOPMENT,
	environmentType: EnvironmentType.DEV,
	production: true,
	isDebugMode: false,
	launchURL: `${import.meta.env.DISCOVER_BLOG_BASE_URL}`,
	twitterConfig: {
		TWITTER_TOKEN: `${import.meta.env.DISCOVER_TWITTER_TOKEN}`,
		TWITTER_BASE_API_URL: `${import.meta.env.DISCOVER_TWITTER_BASE_API_URL}`,
		TWITTER_PROFILE_URL: `${import.meta.env.DISCOVER_TWITTER_PROFILE_URL}`,
	},
	githubConfig: {
		GITHUB_REPO_URL: `${import.meta.env.DISCOVER_GITHUB_REPO_URL}`,
	},
};
