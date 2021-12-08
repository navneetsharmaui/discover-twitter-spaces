import type { DISCOVER_STARTER_APIS_TYPE } from './discover-apis.type';

export type DISCOVER_API_CONFIG = {
	[key in DISCOVER_STARTER_APIS_TYPE]: string;
};
