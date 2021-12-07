import type { EndpointOutput } from '@sveltejs/kit';

import isomorphicFetch from 'isomorphic-fetch';

export async function api(url: string, request?: RequestInit): Promise<EndpointOutput> {
	const response = request ? await isomorphicFetch(url, request) : await isomorphicFetch(url);

	return {
		status: response.status,
		body: await response.json(),
	};
}
