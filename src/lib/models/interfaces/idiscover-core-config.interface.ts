import type { DiscoverDataEndpointConfig } from '../types/discover-endpoits.type';
import type { IDiscoverEnvironmentConfig } from './idiscover-environment.interface';

export interface IDiscoverStarterCoreConfig<
	T extends IDiscoverEnvironmentConfig<K>,
	K = DiscoverDataEndpointConfig,
> {
	environment: T;
}
