import type { SVELTEKIT_DATA_ENPOINT_CONFIG } from '../types';
import type { IEnvironmentConfig } from './ienvironment.interface';
import type { ITwitterConfig } from './itwitter-config.interface';

export interface ISveltekitStarterEnvironmentConfig<T = SVELTEKIT_DATA_ENPOINT_CONFIG> extends IEnvironmentConfig {
	twitterConfig: Partial<ITwitterConfig>;
}
