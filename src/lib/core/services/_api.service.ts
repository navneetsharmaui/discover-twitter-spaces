import isomorphicFetch from 'isomorphic-fetch';

import type { IResponseEndpointOutput } from '$models/interfaces/iresponse-endpoint.interface';

export async function api<T>(
	url: string,
	request?: RequestInit,
): Promise<IResponseEndpointOutput<T>> {
	const response = request ? await isomorphicFetch(url, request) : await isomorphicFetch(url);

	return {
		status: response.status,
		body: (await response.json()) as unknown as T,
	};
}
