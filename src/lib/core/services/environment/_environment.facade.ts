import { environment } from '$environment/environment';
import type { DISCOVER_ENPOINT_CONFIG } from '$models/types/discover-endpoits.type';
import type { IDiscoverStarterCoreConfig } from '$models/interfaces/idiscover-core-config.interface';
import type { IDiscoverEnvironmentConfig } from '$models/interfaces/idiscover-environment.interface';

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

	public get launchURL(): string {
		return this.coreConfig.environment.launchURL;
	}

	public get isProd(): boolean {
		return this.coreConfig.environment.production;
	}

	public get githubRepoUrl(): string {
		return this.coreConfig.environment.githubConfig.GITHUB_REPO_URL;
	}

	public get twitterConfig() {
		return this.coreConfig.environment.twitterConfig;
	}
}

export const discoverEnvironmentFacade = new DiscoverEnvironmentFacade({
	environment: environment,
});
