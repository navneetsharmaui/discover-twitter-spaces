import { EnvironmentName } from '$models/enums/environment-name.enum';
import { EnvironmentType } from '$models/enums/environment-type.enum';
import type { DiscoverEndpointConfig } from '$models/types/discover-endpoits.type';
import type { IDiscoverEnvironmentConfig } from '$models/interfaces/idiscover-environment.interface';

export const environment: IDiscoverEnvironmentConfig<DiscoverEndpointConfig> = {
	name: EnvironmentName.DEVELOPMENT,
	environmentType: EnvironmentType.DEV,
	production: true,
	isDebugMode: false,
	launchURL: `${import.meta.env.DISCOVER_BASE_URL}`,
	twitterConfig: {
		TWITTER_PROFILE_URL: `${import.meta.env.DISCOVER_TWITTER_PROFILE_URL}`,
	},
	githubConfig: {
		GITHUB_REPO_URL: `${import.meta.env.DISCOVER_GITHUB_REPO_URL}`,
	},
};
