import { environment } from '$environment/environment';
import type { DiscoverEndpointConfig } from '$models/types/discover-endpoits.type';
import type { IDiscoverStarterCoreConfig } from '$models/interfaces/idiscover-core-config.interface';
import type { IDiscoverEnvironmentConfig } from '$models/interfaces/idiscover-environment.interface';

/**
 * A facacde class for the Environment properties.
 * This facade class will provide the access to the environment properties
 * with DI. As the envirnment properties are accessed through this class and envirnment files are
 * not accessed directly, it will reduce the number of files where the environment properties needs to be changed when
 * new properties are added or properties are changed.
 *
 * @public
 */
export class DiscoverEnvironmentFacade<
	T extends IDiscoverEnvironmentConfig<DiscoverEndpointConfig> = IDiscoverEnvironmentConfig<DiscoverEndpointConfig>,
> {
	constructor(private readonly coreConfig: IDiscoverStarterCoreConfig<T>) {}

	/**
	 * @returns Returns the launch url for the application configured in the environment.
	 * @public
	 */
	public get launchURL(): string {
		return this.coreConfig.environment.launchURL;
	}

	/**
	 * @returns Returns the true/false based on if environment is prod or not.
	 * @public
	 */
	public get isProd(): boolean {
		return this.coreConfig.environment.production;
	}

	/**
	 * @returns Returns the github url for the application configured in the environment.
	 * @public
	 */
	public get githubRepoUrl(): string {
		return this.coreConfig.environment.githubConfig.GITHUB_REPO_URL || '';
	}

	/**
	 * @returns Returns the twitter config for the application configured in the environment.
	 * @public
	 */
	public get twitterConfig() {
		return this.coreConfig.environment.twitterConfig;
	}
}

export const discoverEnvironmentFacade = new DiscoverEnvironmentFacade({
	environment,
});
