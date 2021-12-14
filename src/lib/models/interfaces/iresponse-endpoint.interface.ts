import type { ResponseHeaders } from '@sveltejs/kit/types/helper';

export interface IResponseEndpointOutput<T> {
	status?: number;
	headers?: ResponseHeaders;
	body?: T;
}
