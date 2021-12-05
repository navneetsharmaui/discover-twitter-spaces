import type { EndpointOutput } from '@sveltejs/kit';

import isomorphicFetch from 'isomorphic-fetch';

export async function api(url: string, request: RequestInit): Promise<EndpointOutput> {
	const response = await isomorphicFetch(url, request);

	return {
		status: response.status,
		body: await response.json(),
	};
}
