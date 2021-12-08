import { environment } from '$environment/environment';
import type { DISCOVER_ENPOINT_CONFIG } from '$lib/models/types/discover-endpoits.type';
import type { IDiscoverStarterCoreConfig } from '$lib/models/interfaces/idiscover-core-config.interface';
import type { IDiscoverEnvironmentConfig } from '$lib/models/interfaces/idiscover-environment.interface';

/**
 * A facacde class for the Environment properties.
 *
 * @remarks
 * This facade class will provide the access to the environment properties
 * with DI. As the envirnment properties are accessed through this class and envirnment files are
 * not accessed directly, it will reduce the number of files where the environment properties needs to be changed when
 * new properties are added or properties are changed.
 *
 * @alpha
 * @public
 */
class DiscoverEnvironmentFacade<
	T extends IDiscoverEnvironmentConfig<DISCOVER_ENPOINT_CONFIG> = IDiscoverEnvironmentConfig<DISCOVER_ENPOINT_CONFIG>,
> {
	constructor(private readonly coreConfig: IDiscoverStarterCoreConfig<T>) {}

	public get environmentName(): string {
		return this.coreConfig.environment.name;
	}

	public get launchURL(): string {
		return this.coreConfig.environment.launchURL;
	}

	public get isProd(): boolean {
		return this.coreConfig.environment.production;
	}

	public get twitterToken(): string {
		return this.coreConfig.environment.twitterConfig.TWITTER_TOKEN;
	}

	public get twitterAPIUrl(): string {
		return this.coreConfig.environment.twitterConfig.TWITTER_BASE_API_URL;
	}

	public get twitterProfileUrl(): string {
		return this.coreConfig.environment.twitterConfig.TWITTER_PROFILE_URL;
	}

	public get githubRepoUrl(): string {
		return this.coreConfig.environment.githubConfig.GITHUB_REPO_URL;
	}
}

export const discoverEnvironmentFacade = new DiscoverEnvironmentFacade({
	environment: environment,
});
