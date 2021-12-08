import type { DISCOVER_DATA_ENPOINT_CONFIG } from '../types/discover-endpoits.type';
import type { IDiscoverEnvironmentConfig } from './idiscover-environment.interface';

export interface IDiscoverStarterCoreConfig<
	T extends IDiscoverEnvironmentConfig<K>,
	K = DISCOVER_DATA_ENPOINT_CONFIG,
> {
	environment: T;
}
