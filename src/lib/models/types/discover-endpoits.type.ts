import type {
	DiscoverDataEndpointsDev,
	DiscoverSearchEndpointsDev,
} from '$models/enums/discover-endpoint.dev.enum';
import type {
	DiscoverDataEndpoints,
	DiscoverSearchEndpoints,
} from '$models/enums/discover-endpoint.enum';
import type {
	DiscoverDataEndpointsProd,
	DiscoverSearchEndpointsProd,
} from '$models/enums/discover-endpoint.prod.enum';
import type {
	DiscoverDataEndpointsQa,
	DiscoverSearchEndpointsQa,
} from '$models/enums/discover-endpoint.qa.enum';

export type DiscoverDataEnpointType = 'SERVICE';

export type DiscoverSearchEndpointType = 'SEARCH';

export type DiscoverEndpointType = DiscoverDataEnpointType | DiscoverSearchEndpointType;

export type DiscoverEndpoints = DiscoverDataEndpoints | DiscoverSearchEndpoints;

export type DiscoverDataEndpointConfig = Record<
	DiscoverDataEnpointType,
	| DiscoverDataEndpoints
	| DiscoverDataEndpointsProd
	| DiscoverDataEndpointsDev
	| DiscoverDataEndpointsQa
>;

export type DiscoverSearchEndpointConfig = Record<
	DiscoverSearchEndpointType,
	| DiscoverSearchEndpoints
	| DiscoverSearchEndpointsProd
	| DiscoverSearchEndpointsDev
	| DiscoverSearchEndpointsQa
>;

export type DiscoverEndpointConfig = DiscoverDataEndpointConfig & DiscoverSearchEndpointConfig;
