import { EnvironmentName } from '$models/enums/environment-name.enum';
import { EnvironmentType } from '$models/enums/environment-type.enum';
import type { DISCOVER_ENPOINT_CONFIG } from '$models/types/discover-endpoits.type';
import type { IDiscoverEnvironmentConfig } from '$models/interfaces/idiscover-environment.interface';

export const environment: IDiscoverEnvironmentConfig<DISCOVER_ENPOINT_CONFIG> = {
	name: EnvironmentName.QA,
	environmentType: EnvironmentType.QA,
	production: true,
	isDebugMode: false,
	launchURL: `${import.meta.env.DISCOVER_BASE_URL}`,
	twitterConfig: {
		TWITTER_BASE_API_URL: `${import.meta.env.DISCOVER_TWITTER_BASE_API_URL}`,
		TWITTER_PROFILE_URL: `${import.meta.env.DISCOVER_TWITTER_PROFILE_URL}`,
	},
	githubConfig: {
		GITHUB_REPO_URL: `${import.meta.env.DISCOVER_GITHUB_REPO_URL}`,
	},
};
