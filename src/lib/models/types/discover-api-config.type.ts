import type { DiscoverApisType } from './discover-apis.type';

export type DiscoverApiConfig = {
	[key in DiscoverApisType]: string;
};
