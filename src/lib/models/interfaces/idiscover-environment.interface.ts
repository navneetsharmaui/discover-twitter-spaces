import type { DiscoverDataEndpointConfig } from '../types/discover-endpoits.type';
import type { IDiscoverDBConfig } from './idiscover-db-config.interface';
import type { IEnvironmentConfig } from './ienvironment.interface';
import type { IGithubConfig } from './igithub-config.interface';
import type { ITwitterConfig } from './itwitter-config.interface';

export interface IDiscoverEnvironmentConfig<T = DiscoverDataEndpointConfig>
	extends IEnvironmentConfig {
	twitterConfig: Partial<ITwitterConfig>;
	githubConfig: Partial<IGithubConfig>;
	apiConfig?: Partial<IDiscoverDBConfig<T>>;
}
